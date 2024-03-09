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



