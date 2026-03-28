import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../services/user.service";
import '../styles/orders.style.scss';

function MyOrders() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myOrders"],
    queryFn: getMyOrders,
    staleTime: 1000 * 60 * 2,
  });

  const orders = data?.orders || [];

  if (isLoading) return <div className="orders-loading">Loading your orders...</div>;
  if (isError) return <div className="orders-error">Failed to load orders.</div>;

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>My <span className="highlight">Orders</span></h2>
        <p className="subtitle">All your successful purchases in one place.</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <div className="empty-icon">🛍️</div>
          <h3>No Orders Yet</h3>
          <p>You haven't purchased anything. Head to the marketplace!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-icon">🧾</div>
              <div className="order-details">
                <div className="order-top">
                  <span className="order-amount">-{order.amount} GC</span>
                  <span className={`order-status ${order.status}`}>{order.status}</span>
                </div>
                <div className="order-meta">
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                  {order.txHash && (
                    <a 
                      href={`https://amoy.polygonscan.com/tx/${order.txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="tx-link"
                    >
                      View on Explorer ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
