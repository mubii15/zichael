import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const API_URL = 'https://zichael.com/api/cart.php';

  // Fetch cart items when user changes
  useEffect(() => {
    if (currentUser) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [currentUser]);

  const fetchCart = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}?user_id=${currentUser.id}`);
      if (res.data && res.data.success) {
        setItems(res.data.cart || []);
      }
    } catch (err) {
      console.error("fetchCart error:", err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    if (!currentUser) {
      toast.error("Please login to add items to cart");
      navigate('/login');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}?action=add`, {
        user_id: currentUser.id,
        product_id: product.id,
        quantity: quantity
      });

      if (res.data && res.data.success) {
        await fetchCart(); // Refresh cart
        toast.success("Item added to cart");
      } else {
        toast.error(res.data.error || "Failed to add item");
      }
    } catch (err) {
      console.error("addItem error:", err);
      toast.error(err.response?.data?.error || "Failed to add item");
    }
  };

  const removeItem = async (id: string) => {
    if (!currentUser) return;

    try {
      const res = await axios.post(`${API_URL}?action=remove`, {
        user_id: currentUser.id,
        product_id: id
      });

      if (res.data && res.data.success) {
        await fetchCart(); // Refresh cart
        toast.success("Item removed from cart");
      } else {
        toast.error(res.data.error || "Failed to remove item");
      }
    } catch (err) {
      console.error("removeItem error:", err);
      toast.error(err.response?.data?.error || "Failed to remove item");
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!currentUser) return;

    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}?action=update`, {
        user_id: currentUser.id,
        product_id: id,
        quantity: quantity
      });

      if (res.data && res.data.success) {
        await fetchCart(); // Refresh cart
      } else {
        toast.error(res.data.error || "Failed to update quantity");
      }
    } catch (err) {
      console.error("updateQuantity error:", err);
      toast.error(err.response?.data?.error || "Failed to update quantity");
    }
  };

  const clearCart = async () => {
    if (!currentUser) return;

    try {
      const res = await axios.post(`${API_URL}?action=clear`, {
        user_id: currentUser.id
      });

      if (res.data && res.data.success) {
        setItems([]);
        toast.success("Cart cleared");
      } else {
        toast.error(res.data.error || "Failed to clear cart");
      }
    } catch (err) {
      console.error("clearCart error:", err);
      toast.error(err.response?.data?.error || "Failed to clear cart");
    }
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart, 
        totalItems,
        totalPrice,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};