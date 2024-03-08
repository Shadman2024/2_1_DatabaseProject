INSERT INTO orders (user_id, total_price, status)
VALUES 
(1, 1250, 'placed'),
(2, 1250, 'placed'),
(3, 1250, 'placed'),
(4, 1250, 'placed'),
(5, 1250, 'placed'),
(6, 1250, 'placed'),
(7, 1250, 'placed'),
(8, 1250, 'placed'),
(9, 1250, 'placed');

INSERT INTO orders (user_id, total_price, status, created_at)
VALUES 
(1, 150.00, 'placed',    '2024-02-21 10:00:00+00'), 
(1, 200.00, 'placed',    '2024-02-21 15:30:00+00'),
(2, 1715.50,'delivered', '2024-02-22 09:25:00+00'),
(3, 275.50, 'delivered', '2024-02-23 09:25:00+00'),
(4, 375.50, 'delivered', '2024-02-24 09:25:00+00'),
(5, 475.50, 'delivered', '2024-02-25 09:25:00+00'),
(6, 575.50, 'delivered', '2024-02-26 09:25:00+00'),
(7, 675.50, 'delivered', '2024-02-27 09:25:00+00'),
(8, 775.50, 'delivered', '2024-02-28 09:25:00+00'),
(9, 875.50, 'delivered', '2024-02-29 09:25:00+00');
