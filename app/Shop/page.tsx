'use client'
import React, { useEffect, useState } from "react";
import ProductList from "../Components/ProductList";

// Define Product Type
interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
  image: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Fetch all products

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        setProducts(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error occurred";
        console.error("Error loading products:", message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center my-6">Shop All Products</h1>

      {loading && <p className="text-center text-gray-500">Loading products...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500">No products available.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductList products={products} /> // ✅ Show all products
      )}
    </div>
  );
};

export default Shop;
