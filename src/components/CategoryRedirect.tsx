import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CategoryRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    if (['men', 'women', 'kids'].includes(path)) {
      navigate(`/products?category=${path}`, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

export default CategoryRedirect;