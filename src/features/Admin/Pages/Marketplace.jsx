import React, { useState, useRef } from 'react';
import useAdmin from '../hooks/useAdmin';
import useCreateProduct from '../hooks/useCreateProduct';
import { Plus, Image as ImageIcon, Loader2, DollarSign } from 'lucide-react';
import '../styles/marketplace.style.scss';

function Marketplace() {
  const { marketProducts, isLoading: isAdminLoading, refetch } = useAdmin();
  const { handleCreateProduct, loading: isCreating } = useCreateProduct();
  const [form, setForm] = useState({ name: '', price: '' });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !imageFile) {
      alert("Please fill all fields and select an image.");
      return;
    }

    try {
      await handleCreateProduct(form.name, Number(form.price), imageFile);
      setForm({ name: '', price: '' });
      setImageFile(null);
      setPreviewUrl('');
      // Force refreshing admin data to show the new product
      if (refetch) refetch();
    } catch (err) {
      console.error(err);
      alert("Failed to create product!");
    }
  };

  if (isAdminLoading) {
    return <div className="loading-state">Loading Marketplace...</div>;
  }

  return (
    <div className='marketplace-page'>
      <div className="marketplace-header">
        <div className="title-section">
          <h2>Green Coin</h2>
          <h2 className="highlight">Marketplace.</h2>
        </div>
        <p className="subtitle">Manage products available for token redemption.</p>
      </div>

      <div className="marketplace-layout">
        {/* ADD PRODUCT FORM */}
        <div className="add-product-section top-card modern-card">
          <div className="form-header">
            <h3>Add New Product</h3>
            <p>List an item available for the community.</p>
          </div>

          <form onSubmit={handleSubmit} className="product-form">
            <div className="input-group">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g., Chips, Ice-cream, Cold-drink"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="price">Price (Tokens)</label>
              <div className="price-input-wrapper">
                <span className='icon'>GC</span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="e.g., 150"
                  value={form.price}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Product Image</label>
              <div
                className={`image-upload-area ${previewUrl ? 'has-image' : ''}`}
                onClick={handleTriggerUpload}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="image-preview" />
                ) : (
                  <div className="upload-prompt">
                    <ImageIcon size={32} className="upload-icon" />
                    <p>Click to upload image</p>
                    <span className="upload-subtext">JPG, PNG, WebP</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            <button disabled={isCreating} className="submit-btn" type="submit">
              {isCreating ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add to Marketplace
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ALL PRODUCTS GRID */}
      <div className="all-products-section">
        <div className="section-header">
          <h3>All Products</h3>
          <span className="badge">{marketProducts?.length || 0} Items</span>
        </div>

        <div className="products-grid">
          {marketProducts && marketProducts.length > 0 ? (
            marketProducts.map((product) => (
              <div className="product-card" key={product._id || product.id}>
                <div className="product-image-container">
                  <img
                    src={product.imageUrl || product.image || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.name}
                    className="product-img"
                  />
                  <div className="price-tag">
                    {product.price} GC
                  </div>
                </div>
                <div className="product-details">
                  <h4 className="product-name">{product.name}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No products added yet. Be the first to add one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
