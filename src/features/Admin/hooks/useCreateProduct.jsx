import { useState } from 'react'
import { createProduct } from '../services/admin.service';

function useCreateProduct() {
  const [loading, setLoading] = useState(false);

  async function handleCreateProduct(name, price, image) {
    setLoading(true);
    try {
      await createProduct(name, price, image);
    } catch (error) {
      console.error("Error creating product:", error);
      throw error; // Rethrow to allow component to handle errors if needed
    } finally {
      setLoading(false);
    }
  }

  return { loading, handleCreateProduct };
}

export default useCreateProduct
