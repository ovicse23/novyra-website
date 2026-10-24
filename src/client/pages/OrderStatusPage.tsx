import React, { useState, useEffect } from 'react';
import {
  Clock,
  Download,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Search,
  ArrowLeft,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { trackPurchase, trackFileDownload } from '../lib/analytics';

export const OrderStatusPage: React.FC = () => {
  // Extract order ID from path if present (e.g., /order/NV-10482)
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const initialOrderId = pathParts.length > 1 && pathParts[0] === 'order' ? pathParts[1].toUpperCase() : '';

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [verifyInput, setVerifyInput] = useState('');
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(!!initialOrderId);
  const [error, setError] = useState<string>('');

  const fetchOrderStatus = async (id: string, verify?: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError('');

    try {
      let url = `/api/orders/${id.trim().toUpperCase()}`;
      if (verify && verify.trim()) {
        url += `?verify=${encodeURIComponent(verify.trim())}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Order not found. Please verify your Order ID.');
      }

      setOrder(data.order);

      // If approved/paid, fire Purchase event once!
      if (data.order.status === 'paid') {
        trackPurchase(data.order.order_id, data.order.amount);
      }
    } catch (err: any) {
      setError(err.message || 'Unable to fetch order status.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      fetchOrderStatus(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrderStatus(orderIdInput, verifyInput);
  };

  const handleDownloadClick = (orderId: string) => {
    trackFileDownload(orderId);
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col justify-between">
      {/* Top Simple Header */}
      <header className="border-b border-white/10 glass-panel py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img
              src="/assets/logo.png?v=3"
              alt="Novyra"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </a>

          <a
            href="/"
            className="text-xs font-semibold text-slate-300 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-4 py-12 flex-1 w-full">
        {/* Lookup Box if no order loaded yet */}
        {!order && (
          <div className="glass-card p-6 sm:p-8 rounded-2xl border-white/10 shadow-2xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Check Your Order Status</h1>
                <p className="text-xs text-slate-400">Enter your Order ID (e.g. NV-XXXXX) to view verification and download status.</p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Order ID <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="NV-10482"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 font-mono text-base focus:border-cyan-400 uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Mobile Number or Email (Optional Verification)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 01712345678 or your@email.com"
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-base focus:border-cyan-400"
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Check Order Status</span>
              </button>
            </form>
          </div>
        )}

        {/* Loaded Order Display */}
        {order && (
          <div className="space-y-6">
            {/* STATUS: APPROVED / PAID */}
            {order.status === 'paid' && (
              <div className="glass-card p-6 sm:p-8 rounded-2xl border-emerald-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full" />
                <div className="flex items-center gap-3 text-emerald-400 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                      Payment Verified ✓
                    </span>
                    <h2 className="text-2xl font-black text-white">
                      {order.product_id === 'gemini-pro-18m' || order.product_id === 'gemini-pro'
                        ? 'Your Subscription Is Approved!'
                        : 'Your Toolkit Is Ready'}
                    </h2>
                  </div>
                </div>

                {order.product_id === 'gemini-pro-18m' || order.product_id === 'gemini-pro' ? (
                  /* Gemini Pro 18M Activation View */
                  <div className="space-y-5">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Congratulations! Your payment for <strong>Gemini Pro 18 Months Personal (5TB Cloud Storage)</strong> has been verified and processed.
                    </p>

                    <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">✨</span>
                        <div>
                          <div className="text-sm font-bold text-white">Google One &amp; Gemini Pro 18 Months Activation</div>
                          <div className="text-xs text-cyan-400">Official Google One Family Invitation Delivered</div>
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                          <span>Check your registered Gmail inbox (also check Promotions or Spam folder) for the Google One invitation email.</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                          <span>Click <strong>&quot;Accept Invitation&quot;</strong> to link the 5TB cloud storage to your personal Google account.</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                          <span>Go to <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-semibold">gemini.google.com</a> to unlock Gemini 3.1 Pro &amp; 4 Argon, Veo AI, Flow, and NotebookLM Pro.</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="text-slate-400">Need immediate help with activation?</span>
                        <a
                          href={`https://wa.me/8801638002708?text=Hello%20Novyra%20Support,%20my%20Order%20ID%20is%20${order.order_id}%20for%20Gemini%20Pro%2018M.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors font-bold"
                        >
                          <span>WhatsApp Support (01638002708)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard PDF Download View */
                  <>
                    <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                      Congratulations! Your transaction has been verified. You can now download your digital copy of <strong>{order.product_name}</strong> below.
                    </p>

                    {/* Primary Download Buttons */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 mb-6">
                      {order.download_files && order.download_files.length > 0 ? (
                        <div className="space-y-3">
                          {order.download_files.map((file: any) => (
                            <div
                              key={file.id}
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors"
                            >
                              <div>
                                <div className="text-sm font-bold text-white">
                                  {file.title}
                                </div>
                                <div className="text-xs text-slate-400 mt-0.5">
                                  {file.pages} Pages • High Resolution Digital PDF
                                </div>
                              </div>

                              <a
                                href={file.download_url}
                                onClick={() => handleDownloadClick(order.order_id)}
                                className="inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all shrink-0"
                              >
                                <Download className="w-4 h-4" />
                                <span>Download PDF ({file.pages} Pgs)</span>
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="text-sm font-bold text-white">
                              {order.product_name}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              High Resolution Digital PDF Manual
                            </div>
                          </div>

                          <a
                            href={order.download_url || `/api/orders/${order.order_id}/download-access`}
                            onClick={() => handleDownloadClick(order.order_id)}
                            className="inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all shrink-0"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download PDF</span>
                          </a>
                        </div>
                      )}

                      {/* Security / Expiry Notice */}
                      <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-amber-300">
                          <Clock className="w-3.5 h-3.5" />
                          Link expires in 72 hours
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          Downloads used: {order.download_count || 0} / {order.max_downloads || 5}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* License Note */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                  🔒 <strong>Personal License:</strong> This PDF is registered to <strong>{order.name}</strong> ({order.email}). Resale, public posting, or group distribution is strictly prohibited.
                </div>
              </div>
            )}

            {/* STATUS: PENDING VERIFICATION */}
            {order.status === 'pending' && (
              <div className="glass-card p-6 sm:p-8 rounded-2xl border-amber-500/30 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-3 text-amber-400 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      Verification in Progress
                    </span>
                    <h2 className="text-2xl font-black text-white">Pending Verification</h2>
                  </div>
                </div>

                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  We have received your payment details. Our admin team will verify your transaction against our bKash/Rocket statement and approve your download link.
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs text-slate-300 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Order ID:</span>
                    <span className="font-mono font-bold text-cyan-400">{order.order_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Customer Name:</span>
                    <span className="font-medium text-white">{order.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Product:</span>
                    <span className="font-medium text-white">{order.product_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amount:</span>
                    <span className="font-bold text-cyan-400">৳{order.amount} BDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Method:</span>
                    <span className="font-medium text-white">{order.payment_method || 'bKash'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transaction ID:</span>
                    <span className="font-mono text-white">{order.transaction_id || 'Submitted'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Verification:</span>
                    <span className="text-emerald-400 font-semibold">Normally 5–30 minutes</span>
                  </div>
                </div>

                <button
                  onClick={() => fetchOrderStatus(order.order_id)}
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh Status</span>
                </button>
              </div>
            )}

            {/* STATUS: REJECTED */}
            {order.status === 'rejected' && (
              <div className="glass-card p-6 sm:p-8 rounded-2xl border-rose-500/30 shadow-2xl">
                <div className="flex items-center gap-3 text-rose-400 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                      Payment Verification Issue
                    </span>
                    <h2 className="text-2xl font-black text-white">Order Not Approved</h2>
                  </div>
                </div>

                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  We could not match your Transaction ID with incoming bKash/Rocket payments. This usually occurs if the Transaction ID was typed incorrectly or the payment did not complete.
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 mb-6">
                  <div className="font-bold text-white mb-1">What to do next:</div>
                  <p className="text-slate-400">
                    Please contact Novyra support with your Order ID ({order.order_id}) and payment SMS screenshot for prompt manual resolution.
                  </p>
                </div>
              </div>
            )}

            {/* Search another order button */}
            <div className="text-center">
              <button
                onClick={() => setOrder(null)}
                className="text-xs text-slate-400 hover:text-cyan-400 font-medium"
              >
                ← Check Another Order ID
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
        © 2026 Novyra. Learn. Build. Grow.
      </footer>
    </div>
  );
};
