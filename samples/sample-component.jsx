// DragPunk Theme Syntax Highlighting Demo (MERN Developer Edition)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// 1. Custom React Components (Highlight in Electric Teal)
import HeaderNavbar from './HeaderNavbar';
import LoadingSpinner from './LoadingSpinner';
import ProductCard from './ProductCard';

export const ProductShowcase = ({ categoryId, limit = 10 }) => {
  // 2. Variables & Hooks
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Async/Await and Control Flow (Highlight in Bold Neon Magenta)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Express endpoint mockup: Axios call
        const response = await axios.get(`/api/products/category/${categoryId}`, {
          params: { limit }
        });
        
        // MongoDB Document Sample (Keys highlighted in Neon Cyan)
        const sampleDocument = {
          _id: "60d5ec4b1f8e2c3a50d2b291",
          name: "Premium Wireless Headset",
          price: 199.99,
          inStock: true,
          tags: ["electronics", "audio", "wireless"]
        };
        
        console.log("Connected to MongoDB, sample doc: ", sampleDocument._id);
        
        setProducts(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load products');
        toast.error('Error fetching database products!');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, limit]);

  if (loading) {
    return <LoadingSpinner size="large" color="neon-teal" />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Something went wrong</h2>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  // 4. HTML Tags (Coral-Red) vs Custom Components (Electric Teal)
  return (
    <main className="showcase-layout">
      <HeaderNavbar title="DragPunk Tech Store" activeTheme="cyberpunk" />
      
      <section className="product-grid-container">
        <h1 className="section-title">Featured Products</h1>
        <div className="grid">
          {products.map((product) => (
            <ProductCard 
              key={product._id} 
              productName={product.name} 
              price={product.price}
              onAddToCart={() => toast.success(`${product.name} added to cart!`)}
            />
          ))}
        </div>
      </section>
      
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </main>
  );
};

export default ProductShowcase;
