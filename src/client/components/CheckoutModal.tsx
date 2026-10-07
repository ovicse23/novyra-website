import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Copy,
  ArrowRight,
  Upload,
  Clock,
  Loader2,
  FileCheck,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { getStoredAttribution } from '../lib/utm';
import {
  trackInitiateCheckout,
  trackPaymentInstructionsViewed,
  trackPaymentProofSubmitted,
} from '../lib/analytics';
import type { PaymentMethod } from '../../shared/types';
import {
  PRODUCTS,
  BUNDLE_PRODUCT,
  getProductPrice,
  getProductTitle,
} from '../../shared/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductId?: string;
  price?: number;
  bkashNumber?: string;
  rocketNumber?: string;
  turnstileSiteKey?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  defaultProductId = 'complete-growth-bundle',
  bkashNumber = '01638002708',
  rocketNumber = '016380027089',
  turnstileSiteKey: _turnstileSiteKey = '',
}) => {
  // Wizard steps: 1 = Order info, 2 = Payment Instructions, 3 = Submit Txn, 4 = Success/Pending
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Selected product
  const [selectedProductId, setSelectedProductId] = useState<string>(defaultProductId);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Generated Order Details
  const [orderId, setOrderId] = useState('');
  const [confirmedProductName, setConfirmedProductName] = useState('');

  // Payment details
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bKash');
  const [payerNumber, setPayerNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

  // UI state
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (defaultProductId) {
      setSelectedProductId(defaultProductId);
    }
  }, [defaultProductId, isOpen]);

  if (!isOpen) return null;

  const currentPrice = getProductPrice(selectedProductId);
  const currentTitle = getProductTitle(selectedProductId);

  // Handle Step 1: Create Order
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid mobile number (e.g. 017xxxxxxxx).');
      return;
    }

    setIsSubmitting(true);
    try {
      const attribution = getStoredAttribution();
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          product_id: selectedProductId,
          ...attribution,
        }),
      });

      const data = (await res.json()) as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create order. Please try again.');
      }

      setOrderId(data.order_id);
      setConfirmedProductName(data.product_name || currentTitle);
      setPayerNumber(phone.trim());
      setStep(2);
      trackInitiateCheckout(currentPrice);
      trackPaymentInstructionsViewed('bKash', data.order_id);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy payment number to clipboard
  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  // Handle Step 3: Submit Payment Proof
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!payerNumber.trim() || payerNumber.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter the sender bKash/Rocket mobile number.');
      return;
    }
    if (!transactionId.trim() || transactionId.trim().length < 6) {
      setErrorMessage('Please enter the valid Transaction ID (TxnID) from your SMS.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('payment_method', selectedMethod);
      formData.append('payer_number', payerNumber.trim());
      formData.append('transaction_id', transactionId.trim().toUpperCase());

      if (screenshotFile) {
        formData.append('screenshot', screenshotFile);
      }

      const res = await fetch(`/api/orders/${orderId}/payment`, {
        method: 'POST',
        body: formData,
      });

      const data = (await res.json()) as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit payment. Please verify your details.');
      }

      trackPaymentProofSubmitted(orderId, transactionId.trim());
      setStep(4);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeNumber = selectedMethod === 'bKash' ? bkashNumber : rocketNumber;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-7 overflow-hidden my-auto text-left">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Modal Top Header Bar: Stepper + Close Button */}
        <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
          {step < 4 ? (
            <div className="flex items-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs font-bold text-slate-400 min-w-0 overflow-x-auto">
              <span className={`shrink-0 ${step >= 1 ? 'text-cyan-400 flex items-center gap-1' : ''}`}>
                1. Order Info
              </span>
              <span className="text-slate-600 shrink-0">→</span>
              <span className={`shrink-0 ${step >= 2 ? 'text-cyan-400 flex items-center gap-1' : ''}`}>
                2. Send ৳{currentPrice}
              </span>
              <span className="text-slate-600 shrink-0">→</span>
              <span className={`shrink-0 ${step >= 3 ? 'text-cyan-400 flex items-center gap-1' : ''}`}>
                3. Submit TxnID
              </span>
            </div>
          ) : (
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              ✓ Order Submitted
            </div>
          )}

          {/* Close button with dedicated shrink-0 space */}
          <button
            onClick={onClose}
            className="p-1.5 -mr-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium flex items-start gap-2">
            <span className="text-rose-400 font-bold shrink-0">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Buyer Information Form */}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                STEP 1 OF 3
              </span>
              <h2 id="modal-title" className="text-xl sm:text-2xl font-black text-white">
                Select Playbook &amp; Details
              </h2>
            </div>

            {/* Product Selector */}
            <div className="space-y-2 mb-5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Choose Playbook Package:
              </label>

              {/* Bundle Option */}
              <button
                type="button"
                onClick={() => setSelectedProductId(BUNDLE_PRODUCT.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  selectedProductId === BUNDLE_PRODUCT.id
                    ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedProductId === BUNDLE_PRODUCT.id
                        ? 'border-emerald-400 bg-emerald-500'
                        : 'border-slate-600'
                    }`}
                  >
                    {selectedProductId === BUNDLE_PRODUCT.id && (
                      <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
                      <span>Complete Growth Bundle (93 Pgs)</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-black">
                        SAVE 64%
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Both Guides: Client Hunting + Meta Ads 2026
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm sm:text-base font-black text-emerald-400">৳499</div>
                  <div className="text-[10px] text-slate-500 line-through">৳1,398</div>
                </div>
              </button>

              {/* Individual Products */}
              <div className="grid grid-cols-2 gap-2">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => setSelectedProductId(prod.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedProductId === prod.id
                        ? prod.accentColor === 'cyan'
                          ? 'bg-cyan-950/40 border-cyan-500 text-white'
                          : 'bg-purple-950/40 border-purple-500 text-white'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white truncate mb-0.5">
                      {prod.shortTitle}
                    </div>
                    <div className="text-[11px] text-slate-400">{prod.pages} Pages</div>
                    <div className="text-xs font-black text-white mt-1">৳299 BDT</div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. tanvir@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 transition-colors"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Your PDF download link will be tied to this email.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Mobile Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01712345678"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Due</span>
                  <span className="text-lg font-black text-white">৳{currentPrice} BDT</span>
                </div>
                <span className="text-xs text-cyan-400 font-semibold truncate max-w-[200px]">
                  {currentTitle}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Order...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Payment (৳{currentPrice})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Payment Details (bKash & Rocket) */}
        {step === 2 && (
          <div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
                  STEP 2 OF 3
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                  Order ID: {orderId}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Pay ৳{currentPrice} via bKash or Rocket
              </h2>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('bKash');
                  trackPaymentInstructionsViewed('bKash', orderId);
                }}
                className={`py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  selectedMethod === 'bKash'
                    ? 'bg-[#E2136E] text-white shadow-lg shadow-[#E2136E]/30'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>bKash</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('Rocket');
                  trackPaymentInstructionsViewed('Rocket', orderId);
                }}
                className={`py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  selectedMethod === 'Rocket'
                    ? 'bg-[#8C3494] text-white shadow-lg shadow-[#8C3494]/30'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Rocket</span>
              </button>
            </div>

            {/* Account Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">
                  {selectedMethod} Personal Number (Send Money):
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  Personal
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-mono text-lg font-bold text-cyan-400 tracking-wider">
                  {activeNumber}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyNumber(activeNumber)}
                  className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  {copiedNumber ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Instruction Steps */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-5 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                <span>Follow These Steps:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 leading-relaxed">
                <li>Open your {selectedMethod} app or dial USSD.</li>
                <li>Select <strong>Send Money</strong>.</li>
                <li>Enter recipient number: <strong className="text-cyan-400 font-mono">{activeNumber}</strong>.</li>
                <li>Enter amount: <strong className="text-white">৳{currentPrice} BDT</strong>.</li>
                <li>Enter Reference: <strong className="text-cyan-400 font-mono">{orderId}</strong>.</li>
                <li>Confirm PIN and save the <strong>Transaction ID (TxnID)</strong>.</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl font-bold text-xs text-slate-400 hover:text-white bg-slate-800 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
              >
                <span>I Have Sent Money — Submit TxnID</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Transaction ID Submission */}
        {step === 3 && (
          <div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
                  STEP 3 OF 3
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                  Order ID: {orderId}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Submit Payment Verification
              </h2>
            </div>

            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Sender {selectedMethod} Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={payerNumber}
                  onChange={(e) => setPayerNumber(e.target.value)}
                  placeholder="e.g. 01712345678"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-base focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Transaction ID (TxnID) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                  placeholder="e.g. BKT7294XYZ"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-base font-mono uppercase focus:border-cyan-400 transition-colors"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Find the 8-10 character TxnID in your {selectedMethod} SMS.
                </span>
              </div>

              {/* Optional Screenshot Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Payment Screenshot</span>
                  <span className="text-slate-500 font-normal">Optional</span>
                </label>
                <div className="relative border-2 border-dashed border-slate-700 hover:border-slate-500 rounded-xl p-3 text-center bg-slate-950/60 transition-colors">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-1 text-slate-400">
                    <Upload className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs font-medium">
                      {screenshotFile ? screenshotFile.name : 'Tap to attach receipt image (Max 5MB)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-4 rounded-xl font-bold text-xs text-slate-400 hover:text-white bg-slate-800"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 px-6 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Proof...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Payment Proof</span>
                      <FileCheck className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 4: Verification Pending Screen */}
        {step === 4 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400 shadow-lg shadow-cyan-500/20">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
              Status: Pending Verification
            </div>

            <h2 className="text-2xl font-black text-white mb-2">
              Payment Information Received
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto mb-6">
              We have received your transaction details. Our admin team will verify your transaction against our statement and unlock your private download link after approval.
            </p>

            {/* Order Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 mb-6 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Product:</span>
                <span className="text-white font-medium">{confirmedProductName || currentTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount:</span>
                <span className="text-white font-bold">৳{currentPrice} BDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="font-mono text-slate-300">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Verification:</span>
                <span className="text-emerald-400 font-semibold">5–30 minutes</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`/order/${orderId}`}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Go to Order Status Page</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
