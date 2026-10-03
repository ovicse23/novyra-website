-- Cloudflare D1 Migration: 0001_initial_schema.sql
-- Novyra Sales Website Database Schema

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    product_id TEXT NOT NULL DEFAULT 'ai-client-hunting-toolkit',
    amount REAL NOT NULL DEFAULT 299,
    currency TEXT NOT NULL DEFAULT 'BDT',
    payment_method TEXT,
    payer_number TEXT,
    transaction_id TEXT UNIQUE,
    payment_proof_key TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'rejected'
    download_token_hash TEXT,
    download_expires_at TEXT,
    download_count INTEGER NOT NULL DEFAULT 0,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    fbclid TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    approved_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_transaction_id ON orders(transaction_id);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_token_hash ON orders(download_token_hash);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL DEFAULT 299,
    currency TEXT NOT NULL DEFAULT 'BDT',
    r2_object_key TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
);

-- Seed primary digital product
INSERT OR IGNORE INTO products (slug, name, price, currency, r2_object_key, active)
VALUES (
    'ai-client-hunting-toolkit',
    'AI Client Hunting + Freelancing Toolkit',
    299,
    'BDT',
    'products/novyra-ai-client-hunting-toolkit.pdf',
    1
);
