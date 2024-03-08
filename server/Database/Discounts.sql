CREATE TYPE discount_type AS ENUM (
  'free shipping',
  'fixed amount discount',
  'percentage discount',
  'buy x get y free',
  'guarantee ',
  'cashback'
);

CREATE SEQUENCE discounts_discount_id_seq START WITH 1;

CREATE TABLE discounts (
  discount_id INT DEFAULT nextval('discounts_discount_id_seq') PRIMARY KEY,
  discount_type VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  start_date date NOT NULL,
  duration_days INT NOT NULL,
  duration_hours INT NOT NULL CHECK (duration_hours >= 0),
  ongoing BOOLEAN DEFAULT FALSE
);
SELECT setval('discounts_discount_id_seq', COALESCE((SELECT MAX(discount_id) FROM discounts), 1), false);






--many to many relationship between items and discounts
CREATE TABLE item_discounts (
    item_id INT NOT NULL,
    discount_id INT NOT NULL,
    PRIMARY KEY (item_id, discount_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (discount_id) REFERENCES discounts(discount_id)
);