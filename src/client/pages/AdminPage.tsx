import React, { useState, useEffect } from 'react';
import {
  Lock,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
  ExternalLink,
  RefreshCw,
  LogOut,
  X,
} from 'lucide-react';
import type { Order, AdminStats } from '../../shared/types';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data
  const [stats, setStats] = useState<AdminStats>({
    pendingOrders: 0,
    approvedOrders: 0,
    rejectedOrders: 0,
    totalRevenue: 0,
    ordersToday: 0,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Proof Modal
  const [previewOrderId, setPreviewOrderId] = useState<string | null>(null);

  // Action status feedback
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Check existing session
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/me');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchDashboardData();
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid password');
      }

      setIsAuthenticated(true);
      fetchDashboardData();
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to load admin orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [statusFilter]);

  const handleApprove = async (orderId: string) => {
    if (!confirm(`Are you sure you want to approve Order ${orderId}? This unlocks the customer download link.`)) return;

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/approve`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to approve');
        return;
      }

      setActionSuccess(`Order ${orderId} approved!`);
      setTimeout(() => setActionSuccess(null), 4000);
      fetchDashboardData();
    } catch (err: any) {
      alert(err.message || 'Approval error');
    }
  };

  const handleReject = async (orderId: string) => {
    if (!confirm(`Are you sure you want to reject Order ${orderId}?`)) return;

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/reject`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to reject');
        return;
      }

      setActionSuccess(`Order ${orderId} marked as rejected.`);
      setTimeout(() => setActionSuccess(null), 4000);
      fetchDashboardData();
    } catch (err: any) {
      alert(err.message || 'Reject error');
    }
  };

  // Login Screen
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="glass-card max-w-sm w-full p-8 rounded-2xl border-white/10 shadow-2xl text-center">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Novyra Admin Login</h1>
          <p className="text-xs text-slate-400 mb-6">Enter the administrator password to manage orders and verifications.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-base focus:border-cyan-400"
              />
            </div>

            {loginError && (
              <div className="text-xs text-rose-400 font-semibold">{loginError}</div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500"
            >
              {isLoggingIn ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B17] text-white">
      {/* Top Admin Header */}
      <header className="border-b border-white/10 bg-slate-950/80 sticky top-0 z-30 px-4 sm:px-8 py-4 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="Novyra Admin"
            className="h-8 w-auto object-contain"
          />
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[10px] uppercase tracking-wider">
            Verification Portal
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <span>View Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Action success toast */}
        {actionSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* 5 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Pending Orders</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{stats.pendingOrders}</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Approved Orders</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{stats.approvedOrders}</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-rose-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Rejected Orders</span>
              <XCircle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">{stats.rejectedOrders}</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Total Revenue</span>
              <DollarSign className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">৳{stats.totalRevenue}</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/20 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Orders Today</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">{stats.ordersToday}</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchDashboardData();
            }}
            className="flex-1 w-full flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Order ID, Phone, TxnID, Name, Email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm shrink-0"
            >
              Search
            </button>
          </form>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['all', 'pending', 'paid', 'rejected'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                  statusFilter === st
                    ? 'bg-cyan-500 text-black'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st === 'paid' ? 'Approved' : st}
              </button>
            ))}
            <button
              onClick={fetchDashboardData}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Method & Sender</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Proof</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-500 text-sm">
                      {loading ? 'Loading orders...' : 'No orders found.'}
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-cyan-400">
                        <a href={`/order/${o.order_id}`} target="_blank" className="hover:underline flex items-center gap-1">
                          {o.order_id}
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                        </a>
                        <span className="text-[10px] text-slate-500 block font-normal">
                          {new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-white">{o.name}</div>
                        <div className="text-slate-400 text-[11px]">{o.email}</div>
                      </td>
                      <td className="p-4 font-mono">
                        <div>{o.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.payment_method === 'Rocket' ? 'bg-purple-500/20 text-purple-300' : 'bg-pink-500/20 text-pink-300'
                        }`}>
                          {o.payment_method || 'bKash'}
                        </span>
                        <div className="font-mono text-[11px] text-slate-400 mt-0.5">
                          {o.payer_number || '—'}
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-white">
                        {o.transaction_id || <span className="text-slate-500 font-normal">Pending submission</span>}
                      </td>
                      <td className="p-4 font-semibold text-white">
                        ৳{o.amount}
                      </td>
                      <td className="p-4">
                        {o.payment_proof_key ? (
                          <button
                            onClick={() => setPreviewOrderId(o.order_id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-[11px] font-semibold transition-colors"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        ) : (
                          <span className="text-slate-500">None</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                          o.status === 'paid'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : o.status === 'rejected'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                        }`}>
                          {o.status === 'paid' ? 'Approved' : o.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {o.status !== 'paid' && (
                            <button
                              onClick={() => handleApprove(o.order_id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-colors"
                              title="Verify payment and unlock download"
                            >
                              Approve
                            </button>
                          )}
                          {o.status !== 'rejected' && (
                            <button
                              onClick={() => handleReject(o.order_id)}
                              className="px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-semibold transition-colors"
                              title="Reject invalid transaction"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Screenshot Preview Modal */}
      {previewOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel max-w-xl w-full p-6 rounded-2xl border-white/10 relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Payment Screenshot — {previewOrderId}</h3>
              <button
                onClick={() => setPreviewOrderId(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-auto rounded-xl bg-black flex items-center justify-center p-2">
              <img
                src={`/api/admin/proof/${previewOrderId}`}
                alt="Payment receipt proof"
                className="max-w-full max-h-[65vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
