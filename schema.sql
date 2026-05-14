CREATE DATABASE IF NOT EXISTS tanabana CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tanabana;

CREATE TABLE IF NOT EXISTS products (
  id          INT          AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  brand       VARCHAR(100) NOT NULL,
  price       INT          NOT NULL,
  category    VARCHAR(100),
  collection  VARCHAR(100),
  img_main    VARCHAR(255),
  img_hover   VARCHAR(255),
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- Seed data — collection values MUST match frontend fetch exactly:
--   "Mothers Day Sale" | "Spring Summer 2026" | "Ready To Wear"
INSERT INTO products (name, brand, price, category, collection, img_main, img_hover) VALUES
  ('3 Piece - Embroidered Silk - EET-06', 'ELYSEE',        13993, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('3 Piece - Embroidered Silk - EET-10', 'ELYSEE',        11995, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('3 Piece - Embroidered Silk - EET-09', 'ELYSEE',        12990, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('3 Piece - Embroidered Silk - EET-01', 'ELYSEE',        13993, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('3 Piece - Embroidered Silk - EET-02', 'ELYSEE',        12990, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('3 Piece - Embroidered Silk - EET-03', 'ELYSEE',        12990, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('3 Piece - Embroidered Silk - EET-04', 'ELYSEE',        12990, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('3 Piece - Embroidered Silk - EET-05', 'ELYSEE',        12990, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('3 Piece - Embroidered Suit - PEL-06', 'Pret Avenue',    8490, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('3 Piece - Embroidered Suit - PEL-07', 'Pret Avenue',    8490, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('3 Piece - Embroidered Suit - PEL-09', 'Pret Avenue',    8490, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('3 Piece - Embroidered Suit - PEL-10', 'Pret Avenue',    8490, 'Embroidered',   'Mothers Day Sale',   NULL, NULL),
  ('Printed Lawn Unstitched - PKLU-V2-01','ELYSEE',         6990, 'Unstitched',    'Spring Summer 2026', NULL, NULL),
  ('Printed Lawn Unstitched - PKLU-V2-02','ELYSEE',         6990, 'Unstitched',    'Spring Summer 2026', NULL, NULL),
  ('3 Piece - Embroidered Suit - PEL-09', 'Pret Avenue',    8490, 'Embroidered',   'Spring Summer 2026', NULL, NULL),
  ('3 Piece - Embroidered Suit - PEL-10', 'Pret Avenue',    8490, 'Embroidered',   'Spring Summer 2026', NULL, NULL),
  ('Ready to Wear - EEL-03',             'Everyday Saly',   7490, 'Ready To Wear', 'Ready To Wear',      NULL, NULL),
  ('Ready to Wear - EEL-04',             'Everyday Saly',   7490, 'Ready To Wear', 'Ready To Wear',      NULL, NULL),
  ('Ready to Wear - EEL-05',             'Everyday Saly',   7490, 'Ready To Wear', 'Ready To Wear',      NULL, NULL),
  ('Ready to Wear - EEL-06',             'Everyday Saly',   7490, 'Ready To Wear', 'Ready To Wear',      NULL, NULL),
  ('HEK-08 Embroidered Khaddar',         'Halina',          9990, 'Ready To Wear', 'Ready To Wear',      NULL, NULL),
  ('SUF-02 Embroidered Suit',            'Sufiyana',       14990, 'Ready To Wear', 'Ready To Wear',      NULL, NULL),
  ('SUF-03 Embroidered Suit',            'Sufiyana',       14990, 'Ready To Wear', 'Ready To Wear',      NULL, NULL),
  ('SUF-04 Embroidered Suit',            'Sufiyana',       13990, 'Ready To Wear', 'Ready To Wear',      NULL, NULL),
  ('SUF-07 Embroidered Suit',            'Sufiyana',       14990, 'Ready To Wear', 'Ready To Wear',      NULL, NULL),
  ('SUF-08 Embroidered Suit',            'Sufiyana',       14990, 'Ready To Wear', 'Ready To Wear',      NULL, NULL);
