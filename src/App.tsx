
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import AboutPage from "./pages/AboutPage"; 
import ContactPage from "./pages/ContactPage";
import ShippingPage from "./pages/ShippingPage";
import ProductsPage from "./pages/ProductsPage";
import AccountPage from "./pages/AccountPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import ConfirmOrderPage from "./pages/checkout/ConfirmOrderPage";
import OrderSuccessPage from "./pages/checkout/OrderSuccessPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/account" element={<AccountPage />} />
            
            {/* Checkout Flow */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/confirm" element={<ConfirmOrderPage />} />
            <Route path="/checkout/success" element={<OrderSuccessPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
