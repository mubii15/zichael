import React, { useState, useEffect, useRef } from 'react';
import { XCircle, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export interface ProductImage {
  url: string;
  file?: File;
}

export interface ProductData {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  type: string;
  images: ProductImage[];
  sizes: string[];
  colors?: string[];
  inventory?: number;
}

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (productData: ProductData) => void;
  product?: ProductData;
  saving?: boolean;
  maxImages?: number;
}

const DEFAULT_PRODUCT: ProductData = {
  name: '',
  description: '',
  price: 0,
  category: '',
  type: 'ready-to-wear',
  images: [],
  sizes: [],
};

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductModal = ({ open, onClose, onSave, product, saving }: ProductModalProps) => {
  const [formData, setFormData] = useState<ProductData>(DEFAULT_PRODUCT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const imagesRef = useRef<ProductImage[]>([]);

  useEffect(() => {
    imagesRef.current = formData.images;
  }, [formData.images]);

  // Clean up blob URLs when component unmounts or modal closes
  useEffect(() => {
    return () => {
      imagesRef.current.forEach(image => {
        if (image.url.startsWith('blob:') && image.file) {
          URL.revokeObjectURL(image.url);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(DEFAULT_PRODUCT);
    }
    setErrors({});
  }, [product, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'inventory' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSelectChange = (field: keyof ProductData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSizeToggle = (size: string) => {
    setFormData(prev => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const filesArray = Array.from(e.target.files);
    
    if (formData.images.length + filesArray.length > 5) {
      setErrors({...errors, images: 'Maximum 5 images allowed'});
      return;
    }
    
    const newImages = filesArray.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    
    // Clear the file input
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const imageToRemove = formData.images[index];
    
    // Revoke blob URL if it's a blob
    if (imageToRemove.url.startsWith('blob:') && imageToRemove.file) {
      URL.revokeObjectURL(imageToRemove.url);
    }
    
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.type) newErrors.type = 'Product type is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    if (formData.sizes.length === 0 && formData.type === 'ready-to-wear') newErrors.sizes = 'At least one size option is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    // Clean up any blob URLs before closing
    formData.images.forEach(image => {
      if (image.url.startsWith('blob:') && image.file) {
        URL.revokeObjectURL(image.url);
      }
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {product?.id ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className={errors.description ? 'border-red-500' : ''}
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="price">Price (₦)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={errors.price ? 'border-red-500' : ''}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="kids">Kids</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label>Product Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ready-to-wear">Ready to Wear</SelectItem>
                  <SelectItem value="bespoke">Bespoke</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
            </div>
          </div>
          
          {formData.type === 'ready-to-wear' && (
            <div className="grid gap-2">
              <Label htmlFor="inventory">Inventory</Label>
              <Input
                id="inventory"
                name="inventory"
                type="number"
                value={formData.inventory || 0}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>
          )}
          
          {formData.type === 'ready-to-wear' && (
            <div className="grid gap-2">
              <Label>Available Sizes</Label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-3 py-1 border rounded ${
                      formData.sizes.includes(size)
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-300'
                    } transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {errors.sizes && <p className="text-red-500 text-sm">{errors.sizes}</p>}
            </div>
          )}
          
          <div className="grid gap-2">
            <Label>Product Images</Label>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={formData.images.length >= 5}
              />
              <label 
                htmlFor="images" 
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-10 w-10 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  {formData.images.length === 0 
                    ? 'Upload Image' 
                    : `${formData.images.length}/5 images uploaded`}
                </span>
              </label>
            </div>
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
            
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative w-20 h-20 rounded overflow-hidden">
                    <img
                      src={image.url}
                      alt={`Product preview ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/600x400';
                      }}
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
      <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving 
              ? (product?.id ? 'Updating...' : 'Saving...') 
              : (product?.id ? 'Update Product' : 'Add Product')}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;