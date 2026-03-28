import { useState } from 'react'
import { createDustbin } from '../services/admin.service';

function useCreateDustbin() {
  const [loading, setLoading] = useState(false);
  async function handleCreateDustbin(name, capacity, wasteType) {
    setLoading(true);
    try {
      await createDustbin(name, capacity, wasteType);
    } catch (error) {
      console.error("Error creating dustbin:", error);
    } finally {
      setLoading(false);
    }
  }
  return { loading, handleCreateDustbin };
}

export default useCreateDustbin