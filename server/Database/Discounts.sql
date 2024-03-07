CREATE TYPE discount_type AS ENUM (
  'free shipping',
  'fixed amount discount',
  'percentage discount',
  'buy x get y free',
  'guarantee',
  'cashback'
);

CREATE SEQUENCE discounts_discount_id_seq START WITH 1;

CREATE TABLE discounts (
    discount_id INT DEFAULT nextval('discounts_discount_id_seq') PRIMARY KEY,
    type discount_type NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE  DEFAULT CURRENT_TIMESTAMP,
    duration INT NOT NULL CHECK (duration >= 0)
);

SELECT setval('discounts_discount_id_seq', COALESCE((SELECT MAX(discount_id) FROM discounts), 1), false);

CREATE OR REPLACE FUNCTION format_duration(duration INT)
RETURNS TEXT AS $$
DECLARE
    days INT;
    hours INT;
BEGIN
    days := duration / 24; -- Convert duration to days (24 * 60 * 60 seconds)
    hours := (duration % 24); -- Remaining hours
    RETURN days || ' days and ' || hours || ' hours';
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION update_discount_description()
RETURNS TRIGGER AS $$
BEGIN
    NEW.description := 'Duration: ' || format_duration(NEW.duration);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER discount_description_trigger
BEFORE INSERT ON discounts
FOR EACH ROW
EXECUTE PROCEDURE update_discount_description();







--many to many relationship between items and discounts
CREATE TABLE item_discounts (
    item_id INT NOT NULL,
    discount_id INT NOT NULL,
    PRIMARY KEY (item_id, discount_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (discount_id) REFERENCES discounts(discount_id)
);