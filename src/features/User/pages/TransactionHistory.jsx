import { useQuery } from "@tanstack/react-query";
import { getMyTransactions } from "../services/user.service";
import '../styles/orders.style.scss';

function TransactionHistory() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myTransactions"],
    queryFn: getMyTransactions,
    staleTime: 1000 * 60 * 2,
  });

  const transactions = data?.transactions || [];

  if (isLoading) return <div className="orders-loading">Loading transactions...</div>;
  if (isError) return <div className="orders-error">Failed to load transaction history.</div>;

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>Transaction <span className="highlight">History</span></h2>
        <p className="subtitle">A record of all GC tokens you have spent.</p>
      </div>

      {transactions.length === 0 ? (
        <div className="orders-empty">
          <div className="empty-icon">📭</div>
          <h3>No Transactions</h3>
          <p>You haven't spent any GC tokens yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {transactions.map((tx) => (
            <div className={`order-card ${tx.status === 'failed' ? 'failed' : ''}`} key={tx._id}>
              <div className="order-icon">{tx.status === 'failed' ? '❌' : '✅'}</div>
              <div className="order-details">
                <div className="order-top">
                  <span className="order-amount" style={{ color: tx.status === 'failed' ? '#e53935' : undefined }}>
                    -{tx.amount} GC
                  </span>
                  <span className={`order-status ${tx.status}`}>{tx.status}</span>
                </div>
                <div className="order-meta">
                  <span className="order-date">
                    {new Date(tx.createdAt).toLocaleString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                  {tx.txHash && tx.txHash !== "" && (
                    <a 
                      href={`https://amoy.polygonscan.com/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="tx-link"
                    >
                      View on Explorer ↗
                    </a>
                  )}
                  {tx.error && (
                    <span className="tx-error">{tx.error}</span>
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

export default TransactionHistory;
