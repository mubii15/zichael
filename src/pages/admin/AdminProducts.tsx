import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash } from 'lucide-react';
import ProductModal, { ProductData, ProductImage } from '../../components/admin/ProductModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import imageCompression from "browser-image-compression";

const API_URL = 'https://zichael.com/api/products.php';

// Simple placeholder image as data URL to avoid external requests
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjQwIiB5PSI0MCIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjE2MTYxIj5JbWFnZSBFcnJvcjwvdGV4dD4KPC9zdmc+';

const AdminProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductData | undefined>(undefined);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to safely get image URL
  const getImageUrl = (url: string) => {
    if (!url) return placeholderImage;
    
    // If it's already a full URL, use it as-is
    if (url.startsWith('http')) return url;
    
    // If it's a relative path, prepend the domain
    return `https://zichael.com${url}`;
  };

  // Fetch list
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}?action=list`);
      if (res.data && res.data.success) {
        // Parse JSON strings from database
        const normalized = (res.data.products || []).map((p: any) => {
          // Parse images from JSON string to array of objects
          let images: ProductImage[] = [];
          try {
            if (typeof p.images === 'string') {
              const imageUrls = JSON.parse(p.images);
              images = Array.isArray(imageUrls) 
                ? imageUrls.map((url: string) => ({ url }))
                : [];
            } else if (Array.isArray(p.images)) {
              images = p.images.map((url: string) => ({ url }));
            }
          } catch (e) {
            console.error("Error parsing images:", e);
            images = [];
          }

          return {
            ...p,
            images,
            sizes: Array.isArray(p.sizes) ? p.sizes : JSON.parse(p.sizes || '[]'),
            colors: Array.isArray(p.colors) ? p.colors : JSON.parse(p.colors || '[]'),
          };
        });
        setProducts(normalized);
      } else {
        toast({ title: "Error", description: res.data?.error || res.data?.message || "Failed to load products", variant: "destructive" });
      }
    } catch (err: any) {
      console.error("fetchProducts error:", err);
      const msg = err?.response?.data?.error || err?.message || 'Failed to load products';
      toast({ title: "Error", description: String(msg), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = (product.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesType = typeFilter === 'all' || product.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleOpenModal = (product?: ProductData) => {
    if (product) {
      setCurrentProduct(product);
    } else {
      setCurrentProduct(undefined);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentProduct(undefined);
  };

  // Save product (create or update) - Multiple images version
  const handleSaveProduct = async (productData: ProductData) => {
  try {
    setSaving(true);

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    
    // Handle price for both ready-to-wear and bespoke products
    if (productData.type === 'bespoke') {
      // For bespoke products, send empty string for price
      formData.append('price', '');
    } else {
      // For ready-to-wear products, send the actual price
      formData.append('price', productData.price?.toString() || '0');
    }
    
    formData.append('category', productData.category);
    formData.append('type', productData.type);
    formData.append('inventory', (productData.inventory || 0).toString());
    formData.append('sizes', JSON.stringify(productData.sizes || []));
    formData.append('colors', JSON.stringify(productData.colors || []));

    // Handle multiple images
    const existingImages = productData.images
      .filter(img => !img.url.startsWith("blob:"))
      .map(img => img.url);
    
    formData.append('existing_images', JSON.stringify(existingImages));

    // Add new images - process them sequentially
    const newImages = productData.images.filter(img => img.url.startsWith("blob:"));
    
    for (let i = 0; i < newImages.length; i++) {
      const image = newImages[i];
      
      try {
        // Convert blob URL to file
        const response = await fetch(image.url);
        const blob = await response.blob();
        
        // Create a file from the blob
        const file = new File([blob], `product-image-${Date.now()}-${i}`, {
          type: blob.type,
          lastModified: Date.now()
        });

        formData.append('images[]', file);
      } catch (error) {
        console.error("Failed to process image, skipping:", error);
        // Continue with other images even if one fails
        continue;
      }
    }

    if (productData.id) formData.append('id', productData.id);

    const action = productData.id ? 'update' : 'create';
    const res = await axios.post(`${API_URL}?action=${action}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.data?.success) {
      toast({
        title: `Product ${productData.id ? 'Updated' : 'Added'}`,
        description: `${productData.name} successfully saved.`,
      });
      fetchProducts();
      handleCloseModal();
    } else {
      toast({ 
        title: "Error", 
        description: res.data?.error || res.data?.message || "Failed to save product", 
        variant: "destructive" 
      });
    }
  } catch (err: any) {
    console.error("handleSaveProduct error:", err);
    toast({ 
      title: "Error", 
      description: err?.response?.data?.error || err.message || "Failed to save product", 
      variant: "destructive" 
    });
  } finally {
    setSaving(false);
  }
};

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setDeleteModalOpen(true);
  };

  // Delete product
  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      const res = await axios.get(`${API_URL}?action=delete&id=${encodeURIComponent(productToDelete)}`);
      if (res.data && res.data.success) {
        setProducts(prev => prev.filter(p => p.id !== productToDelete));
        toast({ title: "Deleted", description: "Product removed." });
      } else {
        toast({ title: "Error", description: res.data?.error || res.data?.message || "Failed to delete", variant: "destructive" });
      }
    } catch (err: any) {
      console.error("confirmDelete error:", err);
      toast({ title: "Error", description: err?.response?.data?.error || err.message || "Failed to delete", variant: "destructive" });
    } finally {
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-8">
            <Link to="/admin" className="inline-flex items-center text-sm font-medium hover:underline">
              <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 md:mb-0">Manage Products</h1>
            <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
              <Plus size={18} /> Add New Product
            </Button>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Types</option>
              <option value="ready-to-wear">Ready-to-Wear</option>
              <option value="bespoke">Bespoke</option>
            </select>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inventory</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 flex items-center">
                        {product.images && product.images.length > 0 && product.images[0].url && (
                          <img 
                            src={getImageUrl(product.images[0].url)} 
                            alt={product.name} 
                            className="w-10 h-10 mr-3 rounded object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = placeholderImage;
                            }}
                          />
                        )}
                        {product.name}
                      </td>
                      <td className="px-6 py-4 capitalize">{product.category}</td>
                      <td className="px-6 py-4 capitalize">{product.type}</td>
                      <td className="px-6 py-4">₦{Number(product.price).toFixed(2)}</td>
                      <td className="px-6 py-4">{product.type === "bespoke" ? "N/A" : product.inventory}</td>
                      <td className="px-6 py-4">
                        <div className="flex -space-x-2">
                          {product.images.slice(0, 3).map((img, index) => (
                            <img 
                              key={index}
                              src={getImageUrl(img.url)} 
                              alt={`${product.name} ${index + 1}`}
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = placeholderImage;
                              }}
                            />
                          ))}
                          {product.images.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                              +{product.images.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenModal(product)}>
                          <Edit size={16} className="mr-1" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(product.id!)}>
                          <Trash size={16} className="mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && <p className="text-center py-8">No products found.</p>}
            </div>
          )}
        </div>
      </div>

      <ProductModal 
        open={modalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveProduct} 
        product={currentProduct} 
        saving={saving}
        maxImages={5} // Pass the max images limit to the modal
      />

      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>Are you sure? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default AdminProducts;