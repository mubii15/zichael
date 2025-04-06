
import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Edit, Trash } from 'lucide-react';
import ProductModal, { ProductData } from '../../components/admin/ProductModal';
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

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Classic Tailored Suit',
    description: 'A premium tailored suit for the modern gentleman.',
    category: 'men',
    type: 'bespoke',
    price: 499.99,
    inventory: 0,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      { url: 'https://images.unsplash.com/photo-1555069519-127aadedf1ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80' }
    ],
  },
  {
    id: '2',
    name: 'Designer Evening Gown',
    description: 'An elegant evening gown for special occasions.',
    category: 'women',
    type: 'bespoke',
    price: 899.99,
    inventory: 0,
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      { url: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80' }
    ],
  },
  {
    id: '3',
    name: 'Cotton Oxford Shirt',
    description: 'A comfortable and stylish shirt for everyday wear.',
    category: 'men',
    type: 'ready-to-wear',
    price: 89.99,
    inventory: 42,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      { url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80' }
    ],
  },
  {
    id: '4',
    name: 'Silk Blouse',
    description: 'A luxurious silk blouse for a sophisticated look.',
    category: 'women',
    type: 'ready-to-wear',
    price: 129.99,
    inventory: 28,
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      { url: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80' }
    ],
  },
  {
    id: '5',
    name: 'Kids Dress Set',
    description: 'An adorable dress set for special occasions.',
    category: 'kids',
    type: 'ready-to-wear',
    price: 79.99,
    inventory: 15,
    sizes: ['2T', '3T', '4T', '5T'],
    images: [
      { url: 'https://images.unsplash.com/photo-1543370566-12bdf5fac361?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80' }
    ],
  },
  {
    id: '6',
    name: 'Kids Custom Suit',
    description: 'A bespoke suit for special events.',
    category: 'kids',
    type: 'bespoke',
    price: 299.99,
    inventory: 0,
    sizes: ['3T', '4T', '5T', '6T'],
    images: [
      { url: 'https://images.unsplash.com/photo-1519238359922-989348752efb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80' }
    ],
  }
];

const AdminProducts = () => {
  const [products, setProducts] = useState<ProductData[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductData | undefined>(undefined);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesType = typeFilter === 'all' || product.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleOpenModal = (product?: ProductData) => {
    setCurrentProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentProduct(undefined);
  };

  const handleSaveProduct = (productData: ProductData) => {
    if (productData.id) {
      // Update existing product
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productData.id ? productData : product
        )
      );
      toast({
        title: "Product Updated",
        description: `${productData.name} has been updated.`,
      });
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: `${products.length + 1}`,  // Generate a new ID (in a real app, this would come from the backend)
      };
      setProducts(prevProducts => [...prevProducts, newProduct]);
      toast({
        title: "Product Added",
        description: `${productData.name} has been added to the catalog.`,
      });
    }
    handleCloseModal();
  };

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productToDelete));
      toast({
        title: "Product Deleted",
        description: "The product has been removed from the catalog.",
        variant: "destructive",
      });
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
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                
                <div>
                  <h2 className="text-lg font-medium mb-3">Category</h2>
                  <div className="space-y-2">
                    {['all', 'men', 'women', 'kids'].map(category => (
                      <div key={category} className="flex items-center">
                        <button
                          className={`text-sm ${categoryFilter === category ? 'font-semibold' : 'text-gray-600'}`}
                          onClick={() => setCategoryFilter(category)}
                        >
                          {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium mb-3">Product Type</h2>
                  <div className="space-y-2">
                    {['all', 'ready-to-wear', 'bespoke'].map(type => (
                      <div key={type} className="flex items-center">
                        <button
                          className={`text-sm ${typeFilter === type ? 'font-semibold' : 'text-gray-600'}`}
                          onClick={() => setTypeFilter(type)}
                        >
                          {type === 'all' ? 'All Types' : type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 mr-3 flex-shrink-0">
                              <img 
                                src={product.images[0]?.url} 
                                alt={product.name}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="font-medium">{product.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                          {product.type.replace(/-/g, ' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {product.type === 'bespoke' ? (
                            <span className="text-gray-500">N/A</span>
                          ) : (
                            product.inventory
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button 
                            className="inline-flex items-center text-blue-600 hover:text-blue-900 mr-3"
                            onClick={() => handleOpenModal(product)}
                          >
                            <Edit size={16} className="mr-1" /> Edit
                          </button>
                          <button 
                            className="inline-flex items-center text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteClick(product.id!)}
                          >
                            <Trash size={16} className="mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-8 bg-white border border-gray-200 rounded-lg">
                    <p className="text-gray-500">No products found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Add/Edit Modal */}
      <ProductModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={currentProduct}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default AdminProducts;
