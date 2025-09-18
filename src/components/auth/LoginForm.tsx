import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const API_URL = 'https://zichael.com/api/users.php';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}?action=login`, {
        username,
        password
      });

      if (response.data && response.data.success) {
        toast({
          title: "Success!",
          description: "You have successfully logged in.",
        });
        
        // Save user data to context and localStorage
        login(response.data.user);
        
        // Redirect to home page
        navigate('/');
      } else {
        toast({
          title: "Error",
          description: response.data?.error || "Login failed",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Login failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Enter your credentials to access your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-input bg-background"
            placeholder="Enter your username"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Link to="/forgot-password" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-input bg-background"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full btn-primary py-3"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4 hover:text-primary">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;