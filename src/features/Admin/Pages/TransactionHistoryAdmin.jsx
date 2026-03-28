import React, { useMemo } from "react";
import { RefreshCw, ArrowUpRight, ShoppingCart, Leaf, XCircle } from "lucide-react";
import useTransactions from "../hooks/useTransactions";
import "../styles/transactionHistory.style.scss";

/* ── helpers ───────────────────────────────────────────── */
const truncate = (str, start = 6, end = 4) => {
  if (!str || str.length <= start + end) return str;
  return `${str.slice(0, start)}…${str.slice(-end)}`;
};

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* ── Stat Card ─────────────────────────────────────────── */
const StatCard = ({ label, value, variant }) => (
  <div className={`tx-stat-card ${variant}`}>
    <p className="stat-label">{label}</p>
    <h3 className="stat-value">{value}</h3>
  </div>
);

/* ── Loading Skeleton ──────────────────────────────────── */
const SkeletonRows = () => (
  <div className="tx-skeleton">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="skeleton-row" />
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   Main Page
═══════════════════════════════════════════════════════════ */
const TransactionHistoryAdmin = () => {
  const {
    transactions,
    count,
    isLoading,
    isError,
    filters,
    updateFilter,
    clearFilters,
    refetch,
  } = useTransactions();

  /* derived stats */
  const stats = useMemo(() => {
    const reward = transactions.filter((t) => t.type === "reward").length;
    const purchase = transactions.filter((t) => t.type === "purchase").length;
    const failed = transactions.filter((t) => t.status === "failed").length;
    return { total: transactions.length, reward, purchase, failed };
  }, [transactions]);

  const hasFilters =
    filters.uid || filters.status || filters.type || filters.date;

  return (
    <div className="tx-page">
      {/* ── Page Header ── */}
      <div className="tx-header">
        <div className="tx-title-group">
          <h2>Transaction History</h2>
          <p>Full audit log of all reward & purchase transactions</p>
        </div>
        <button className="tx-refresh-btn" onClick={() => refetch()}>
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div className="tx-summary">
        <StatCard label="Total Transactions" value={stats.total} variant="total" />
        <StatCard label="Rewards" value={stats.reward} variant="reward" />
        <StatCard label="Purchases" value={stats.purchase} variant="purchase" />
        <StatCard label="Failed" value={stats.failed} variant="failed" />
      </div>

      {/* ── Filters ── */}
      <div className="tx-filters">
        {/* UID search */}
        <div className="filter-group">
          <label>UID</label>
          <input
            type="text"
            placeholder="e.g. 61cf2417"
            value={filters.uid}
            onChange={(e) => updateFilter("uid", e.target.value)}
          />
        </div>

        {/* Type filter */}
        <div className="filter-group">
          <label>Type</label>
          <select
            value={filters.type}
            onChange={(e) => updateFilter("type", e.target.value)}
          >
            <option value="">All Types</option>
            <option value="reward">Reward</option>
            <option value="purchase">Purchase</option>
          </select>
        </div>

        {/* Status filter */}
        <div className="filter-group">
          <label>Status</label>
          <select
            value={filters.status}
            onChange={(e) => updateFilter("status", e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Date filter */}
        <div className="filter-group">
          <label>Date</label>
          <select
            value={filters.date}
            onChange={(e) => updateFilter("date", e.target.value)}
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
          </select>
        </div>

        {/* Clear button */}
        {hasFilters && (
          <button className="filter-clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      {/* ── Table Panel ── */}
      <div className="tx-table-panel">
        <div className="tx-table-header">
          <span>Transactions</span>
          <span className="tx-count-badge">{count} records</span>
        </div>

        {/* Loading */}
        {isLoading && <SkeletonRows />}

        {/* Error */}
        {isError && (
          <div className="tx-empty">
            <div className="tx-empty-icon">⚠️</div>
            <p>Failed to load transactions. Please refresh.</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !isError && (
          <div className="tx-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>UID</th>
                  <th>Wallet Address</th>
                  <th>Amount (GC)</th>
                  <th>Points Used</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Tx Hash</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={9}>
                      <div className="tx-empty">
                        <div className="tx-empty-icon">📭</div>
                        <p>No transactions found for the selected filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx, idx) => (
                    <tr key={tx._id}>
                      <td>{idx + 1}</td>

                      {/* UID */}
                      <td>
                        <span className="uid-chip">{tx.uid}</span>
                      </td>

                      {/* Wallet */}
                      <td>
                        <span
                          className="wallet-addr"
                          title={tx.walletAddress}
                        >
                          {truncate(tx.walletAddress, 8, 6)}
                        </span>
                      </td>

                      {/* Amount */}
                      <td>
                        <span className="amount-cell">{tx.amount} GC</span>
                      </td>

                      {/* Points used */}
                      <td>{tx.pointsUsed}</td>

                      {/* Type badge */}
                      <td>
                        <span className={`type-badge ${tx.type}`}>
                          {tx.type === "reward" ? (
                            <Leaf size={11} />
                          ) : (
                            <ShoppingCart size={11} />
                          )}
                          {tx.type}
                        </span>
                      </td>

                      {/* Status badge */}
                      <td>
                        <span className={`status-badge ${tx.status}`}>
                          <span className="dot" />
                          {tx.status}
                        </span>
                      </td>

                      {/* Tx Hash */}
                      <td>
                        {tx.txHash ? (
                          <a
                            className="tx-hash-link"
                            href={`https://amoy.polygonscan.com/tx/${tx.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={tx.txHash}
                          >
                            {truncate(tx.txHash, 8, 6)}{" "}
                            <ArrowUpRight size={10} />
                          </a>
                        ) : (
                          <span className="no-hash">—</span>
                        )}
                      </td>

                      {/* Date */}
                      <td>{formatDate(tx.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryAdmin;
