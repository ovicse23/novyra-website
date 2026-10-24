-- Cloudflare D1 Migration: 0002_site_settings.sql
-- Site Settings and Stock Management Schema

CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO site_settings (key, value) VALUES
    ('gemini_total_stock', '100'),
    ('gemini_base_sold', '92');
