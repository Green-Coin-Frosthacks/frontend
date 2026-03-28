import React, { useState } from 'react'
import useCreateDustbin from '../hooks/useCreateDustbin';
import { Plus, Loader2 } from 'lucide-react';

function CreateBinForm() {
  const { loading, handleCreateDustbin } = useCreateDustbin();
  const [form, setForm] = useState({
    name: "",
    capacity: "",
    wasteType: "dry"
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCreateDustbin(form.name, Number(form.capacity), form.wasteType);
    setForm({ name: "", capacity: "", wasteType: "dry" }); // Reset form
  }

  return (
    <div className='create-bin'>
      <div className="form-header">
        <h3>Add New Bin</h3>
        <p>Register a new smart dustbin to the network</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Location / Bin Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="e.g., Campus South Gate"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="capacity">Capacity Container (gms)</label>
          <input
            id="capacity"
            type="number"
            name="capacity"
            placeholder="e.g., 50"
            value={form.capacity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="input-group">
          <label htmlFor="wasteType">Waste Type</label>
          <select
            id="wasteType"
            name="wasteType"
            value={form.wasteType}
            onChange={handleChange}
            required
          >
            <option value="dry">♻️ Dry Waste (Plastic, Paper, Metal…)</option>
            <option value="wet">🌿 Wet Waste (Food, Organic…)</option>
          </select>
        </div>

        <button disabled={loading} className='submit-btn' type="submit">
          {loading ? (
            <>
              <Loader2 size={18} className="spinner" />
              Creating...
            </>
          ) : (
            <>
              <Plus size={18} />
              Register Bin
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default CreateBinForm
