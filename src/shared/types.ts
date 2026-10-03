export type OrderStatus = 'pending' | 'paid' | 'rejected';
export type PaymentMethod = 'bKash' | 'Rocket';

export interface Order {
  id: number;
  order_id: string;
  name: string;
  email: string;
  phone: string;
  product_id: string;
  amount: number;
  currency: string;
  payment_method: PaymentMethod | null;
  payer_number: string | null;
  transaction_id: string | null;
  payment_proof_key: string | null;
  status: OrderStatus;
  download_token_hash: string | null;
  download_expires_at: string | null;
  download_count: number;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  fbclid: string | null;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
}

export interface CreateOrderRequest {
  name: string;
  email: string;
  phone: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  order_id: string;
  amount: number;
  currency: string;
  bkash_number: string;
  rocket_number: string;
  message?: string;
}

export interface SubmitPaymentRequest {
  payment_method: PaymentMethod;
  payer_number: string;
  transaction_id: string;
  turnstile_token?: string;
}

export interface OrderStatusResponse {
  success: boolean;
  order: {
    order_id: string;
    name: string;
    product_name: string;
    amount: number;
    currency: string;
    status: OrderStatus;
    payment_method: PaymentMethod | null;
    payer_number: string | null;
    transaction_id: string | null;
    created_at: string;
    approved_at: string | null;
    download_url?: string;
    download_expires_at?: string | null;
    download_count?: number;
    max_downloads?: number;
    has_proof_screenshot?: boolean;
  };
}

export interface AdminStats {
  pendingOrders: number;
  approvedOrders: number;
  rejectedOrders: number;
  totalRevenue: number;
  ordersToday: number;
}

export interface AdminOrdersResponse {
  success: boolean;
  stats: AdminStats;
  orders: Order[];
}

export interface ProductConfig {
  slug: string;
  name: string;
  price: number;
  regularPrice: number;
  currency: string;
  bkashNumber: string;
  rocketNumber: string;
  downloadExpiryHours: number;
  maxDownloads: number;
  supportHoursMsg: string;
}
