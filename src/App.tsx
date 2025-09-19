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
import { AuthProvider } from "./context/AuthContext";
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
import ProtectedRoute from "./components/ProtectedRoute";
import CategoryRedirect from "./components/CategoryRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/men" element={<CategoryRedirect />} />
              <Route path="/women" element={<CategoryRedirect />} />
              <Route path="/kids" element={<CategoryRedirect />} />
              
              {/* Protected Routes */}
              <Route path="/cart" element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } />
              <Route path="/account" element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              } />
              
              {/* Checkout Flow - Also Protected */}
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/checkout/confirm" element={
                <ProtectedRoute>
                  <ConfirmOrderPage />
                </ProtectedRoute>
              } />
              <Route path="/checkout/success" element={
                <ProtectedRoute>
                  <OrderSuccessPage />
                </ProtectedRoute>
              } />
              
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              
              {/* Admin Routes - Also Protected */}
              <Route path="/admin" element={
               
                  <AdminDashboard />
                
              } />
              <Route path="/admin/users" element={
               
                  <AdminUsers />
              
              } />
              <Route path="/admin/products" element={
               
                  <AdminProducts />
               
              } />
              <Route path="/admin/orders" element={
                
                  <AdminOrders />
                
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;