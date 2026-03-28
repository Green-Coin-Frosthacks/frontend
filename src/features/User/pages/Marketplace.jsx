import React, { useState } from 'react';
import useAdmin from '../../Admin/hooks/useAdmin';
import useUser from '../hooks/useUser';
import useVendorPurchase from '../hooks/useVendorPurchase';
import '../../Admin/styles/marketplace.style.scss';
import '../styles/marketplace.user.style.scss';

function Marketplace() {
  const { marketProducts, isLoading: isAdminLoading } = useAdmin();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [successOrder, setSuccessOrder] = useState(null); // holds product info on success
  const { queries } = useUser(selectedProductId);
  
  const isProductLoading = queries.product.isLoading;
  const product = queries.product.data?.product;

  const handleProductClick = (id) => {
    setSelectedProductId(id);
  };

  const closePopup = () => {
    setSelectedProductId(null);
  };

  const closeSuccessModal = () => {
    setSuccessOrder(null);
  };

  const purchaseMutation = useVendorPurchase(() => {
    setSuccessOrder(product); // save product info to display in success modal
    closePopup();
  });

  const handleBuy = async () => {
    try {
      purchaseMutation.mutate({
        amount: product.price,
        productId: product._id || product.id
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='marketplace-page'>
      <div className="marketplace-header">
        <div className="title-section">
          <h2>Green Coin</h2>
          <h2 className="highlight">Marketplace.</h2>
        </div>
        <p className="subtitle">Redeem your tokens for available products.</p>
      </div>

      {/* ALL PRODUCTS GRID */}
      <div className="all-products-section" style={{ marginTop: '0' }}>
        <div className="section-header">
          <h3>Available Products</h3>
          <span className="badge">{marketProducts?.length || 0} Items</span>
        </div>

        <div className="products-grid">
          {marketProducts && marketProducts.length > 0 ? (
            marketProducts.map((prod) => (
              <div 
                className="product-card" 
                key={prod._id || prod.id}
                onClick={() => handleProductClick(prod._id || prod.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-image-container">
                  <img
                    src={prod.imageUrl || prod.image || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={prod.name}
                    className="product-img"
                  />
                  <div className="price-tag">
                    {prod.price} GC
                  </div>
                </div>
                <div className="product-details">
                  <h4 className="product-name">{prod.name}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No products available right now. Check back later!</p>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT POPUP MODAL */}
      {selectedProductId && (
        <div className="product-popup-overlay" onClick={closePopup}>
          <div className="product-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>&times;</button>
            {isProductLoading ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Loading product details...</p>
              </div>
            ) : product ? (
              <div className="popup-details">
                <img 
                  src={product.imageUrl || product.image || 'https://via.placeholder.com/300?text=No+Image'} 
                  alt={product.name} 
                />
                <h3>{product.name}</h3>
                <p className="price">{product.price} GC</p>
                <p className="description">{product.description || "A wonderful premium product to redeem with your Green Coins!"}</p>
                <button 
                  className="btn-buy-now" 
                  onClick={handleBuy} 
                  disabled={purchaseMutation.isPending}
                >
                  {purchaseMutation.isPending ? "Purchasing..." : "BUY NOW"}
                </button>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Failed to load product details.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ✅ CUSTOM SUCCESS MODAL */}
      {successOrder && (
        <div className="success-overlay" onClick={closeSuccessModal}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">🎉</div>
            <h2 className="success-title">Order Successful!</h2>
            <p className="success-subtitle">Your purchase was completed successfully.</p>
            <div className="success-product-info">
              <img
                src={successOrder.imageUrl || successOrder.image || 'https://via.placeholder.com/80?text=GC'}
                alt={successOrder.name}
                className="success-product-img"
              />
              <div>
                <p className="success-product-name">{successOrder.name}</p>
                <p className="success-product-price">- {successOrder.price} GC deducted</p>
              </div>
            </div>
            <button className="success-close-btn" onClick={closeSuccessModal}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Marketplace;
