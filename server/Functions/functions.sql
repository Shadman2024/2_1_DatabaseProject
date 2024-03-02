-- Function and Trigger for Automatic Discount Application
-- To apply discounts to items automatically based on certain criteria, such as a seasonal sale or clearance.

-- Function:

CREATE OR REPLACE FUNCTION apply_automatic_discounts()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.price > 500 THEN
        INSERT INTO item_discounts(item_id, discount_id)
        VALUES (NEW.item_id, (SELECT discount_id FROM discounts WHERE discount > 20 LIMIT 1));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_apply_discounts
BEFORE INSERT OR UPDATE ON items
FOR EACH ROW EXECUTE FUNCTION apply_automatic_discounts();


-- Function and Trigger for User Activity Log
-- Track user activity for security and auditing purposes, such as logins, updates, or critical actions.

-- Function:

CREATE OR REPLACE FUNCTION log_user_activity()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_activity_logs(user_id, activity, activity_time)
    VALUES (NEW.user_id, 'User logged in', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_user_login_activity
AFTER INSERT ON user_sessions -- Assuming you have a user_sessions table for tracking logins
FOR EACH ROW EXECUTE FUNCTION log_user_activity();



-- TRIGGER FOR INSERTING

CREATE OR REPLACE FUNCTION hash_user_password()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.password_hash !~ '^\$2[ayb]\$.{56}$' THEN
        NEW.password_hash := crypt(NEW.password_hash, gen_salt('bf'));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER trigger_hash_password
BEFORE INSERT ON users
FOR EACH ROW EXECUTE FUNCTION hash_user_password();
SELECT setval('users_user_id_seq', COALESCE((SELECT MAX(user_id) FROM users), 1), false);

