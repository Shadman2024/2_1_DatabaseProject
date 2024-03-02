-- Inserting data into the subcategories table

INSERT INTO subcategories (subcategory_id, category_id, name)
VALUES
  -- Category: Mobiles (category_id = 1)
  (1, 1, 'Mobile Phones'),
  (2, 1, 'Mobile Phone Accessories'),
  (3, 1, 'Wearables'),
  (4, 1, 'SIM Cards'),
  (5, 1, 'Mobile Phone Services'),

  -- Category: Electronics (category_id = 2)
  (1, 2, 'Desktop Computers'),
  (2, 2, 'Laptops'),
  (3, 2, 'Laptop & Computer Accessories'),
  (4, 2, 'Tablets & Accessories'),
  (5, 2, 'TVs'),
  (6, 2, 'TV & Video Accessories'),
  (7, 2, 'Home Appliances'),
  (8, 2, 'Cameras, Camcorders & Accessories'),
  (9, 2, 'ACs & Home Electronics'),
  (10, 2, 'Audio & Sound Systems'),
  (11, 2, 'Video Game Consoles & Accessories'),
  (12, 2, 'Photocopiers'),
  (13, 2, 'Other Electronics'),

  -- Category: Home & Living (category_id = 3)
  (1, 3, 'Living Room Furniture'),
  (2, 3, 'Kitchen & Dining Furniture'),
  (3, 3, 'Bedroom Furniture'),
  (4, 3, 'Office & Shop Furniture'),
  (5, 3, 'Children''s Furniture'),
  (6, 3, 'Household Items'),
  (7, 3, 'Bathroom Products'),
  (8, 3, 'Doors'),
  (9, 3, 'Home Textiles & Decoration'),

  -- Category: Men's Fashion & Grooming (category_id = 4)
  (1, 4, 'Jacket & Coat'),
  (2, 4, 'Shirts & T-Shirts'),
  (3, 4, 'Pants'),
  (4, 4, 'Traditional Clothing'),
  (5, 4, 'Grooming & Bodycare'),
  (6, 4, 'Optical & Sunglasses'),
  (7, 4, 'Baby Boy''s Fashion'),
  (8, 4, 'Bags & Accessories'),
  (9, 4, 'Footwear'),
  (10, 4, 'Watches'),
  (11, 4, 'Wholesale - Bulk'),

  -- Category: Women's Fashion & Beauty (category_id = 5)
  (1, 5, 'Traditional Wear'),
  (2, 5, 'Winter Wear'),
  (3, 5, 'Western Wear'),
  (4, 5, 'Bags & Accessories'),
  (5, 5, 'Footwear'),
  (6, 5, 'Lingerie & Sleepwear'),
  (7, 5, 'Jewellery & Watches'),
  (8, 5, 'Beauty & Personal Care'),
  (9, 5, 'Optical & Sunglasses'),
  (10, 5, 'Wholesale - Bulk'),
  (11, 5, 'Baby Girl''s Fashion'),

  -- Category: Pets & Animals (category_id = 6)
  (1, 6, 'Pets'),
  (2, 6, 'Farm Animals'),
  (3, 6, 'Pet & Animal Accessories'),
  (4, 6, 'Pet & Animal food'),
  (5, 6, 'Other Pets & Animals'),

  -- Category: Hobbies, Sports & Kids (category_id = 7)
  (1, 7, 'Musical Instruments'),
  (2, 7, 'Sports'),
  (3, 7, 'Fitness & Gym'),
  (4, 7, 'Music, Books & Movies'),
  (5, 7, 'Children''s Items'),
  (6, 7, 'Other Hobby, Sport & Kids items'),

  -- Category: Business & Industry (category_id = 8)
  (1, 8, 'Office Supplies & Stationary'),
  (2, 8, 'Safety & Security'),
  (3, 8, 'Industry Machinery & Tools'),
  (4, 8, 'Raw Materials & Industrial Supplies'),

  -- Category: Education (category_id = 9)
  (1, 9, 'Textbooks'),
  (2, 9, 'Other Books'),
  (3, 9, 'Other Education Materials'),

  -- Category: Essentials (category_id = 10)
  (1, 10, 'Grocery'),
  (2, 10, 'Fruits & Vegetables'),
  (3, 10, 'Meat & Seafood'),
  (4, 10, 'Baby Products'),
  (5, 10, 'Healthcare'),
  (6, 10, 'Household'),
  (7, 10, 'Other Essentials'),

  -- Category: Agriculture (category_id = 11)
  (1, 11, 'Crops, Seeds & Plants'),
  (2, 11, 'Farming Tools & Machinery'),
  (3, 11, 'Other Agriculture'),

  -- Category: Vehicles (category_id = 12)
  (1, 12, 'Cars'),
  (2, 12, 'Motorcycles & Scooters'),
  (3, 12, 'Bicycles'),
  (4, 12, 'Commercial Vehicles'),
  (5, 12, 'Boats & Water Transport'),
  
  -- Category: Real Estate (category_id = 13)
  (6, 13, 'Apartments & Flats'),
  (7, 13, 'Houses'),
  (8, 13, 'Plots & Land'),
  (9, 13, 'Commercial Property'),
  (10, 13, 'Rooms'),
  
  -- Category: Services (category_id = 14)
  (11, 14, 'Educational'),
  (12, 14, 'Computer & Tech Help'),
  (13, 14, 'Health & Beauty Services'),
  (14, 14, 'Home & Garden Services'),
  (15, 14, 'Legal & Financial Services'),
  
  -- Category: Jobs (category_id = 15)
  (16, 15, 'Full-time'),
  (17, 15, 'Part-time'),
  (18, 15, 'Internships'),
  (19, 15, 'Freelance'),
  (20, 15, 'Other Jobs'),
  
  -- Category: Travel & Leisure (category_id = 16)
  (21, 16, 'Travel Packages & Tours'),
  (22, 16, 'Travel Accessories'),
  (23, 16, 'Luggage'),
  (24, 16, 'Camping & Hiking'),
  (25, 16, 'Sports Equipment'),

  (26, 17, 'Books'),
  (27, 17, 'Magazines'),
  (28, 17, 'Movies'),
  (29, 17, 'Music'),
  (30, 17, 'Musical Instruments'),

  -- Category: Art & Collectibles (category_id = 18)
  (31, 18, 'Antiques'),
  (32, 18, 'Art'),
  (33, 18, 'Crafts'),
  (34, 18, 'Collectibles'),

  -- Category: Health & Beauty (category_id = 19)
  (35, 19, 'Healthcare Products'),
  (36, 19, 'Beauty Products'),
  (37, 19, 'Personal Care'),
  (38, 19, 'Supplements'),
  (39, 19, 'Fitness & Gym Equipment'),

  -- Category: Tools & DIY (category_id = 20)
  (40, 20, 'Hand Tools'),
  (41, 20, 'Power Tools'),
  (42, 20, 'Electrical Equipment'),
  (43, 20, 'Building Materials'),
  (44, 20, 'DIY Projects'),

  -- Category: Event Management (category_id = 21)
  (45, 21, 'Planning & Coordination'),
  (46, 21, 'Decorations'),
  (47, 21, 'Catering Services'),
  (48, 21, 'Photography & Videography'),
  (49, 21, 'Music & Entertainment'),

  -- Category: Furniture & Home Decor (category_id = 22)
  (50, 22, 'Sofas & Chairs'),
  (51, 22, 'Tables & Desks'),
  (52, 22, 'Beds & Mattresses'),
  (53, 22, 'Storage & Organization'),
  (54, 22, 'Decor & Accents'),

  -- Category: Kitchen & Dining (category_id = 23)
  (55, 23, 'Cookware'),
  (56, 23, 'Dining Sets'),
  (57, 23, 'Kitchen Gadgets'),
  (58, 23, 'Kitchen Storage'),
  (59, 23, 'Tableware & Linens'),

  -- Category: Bath & Bedding (category_id = 24)
  (60, 24, 'Bath Towels & Accessories'),
  (61, 24, 'Bedding Sets'),
  (62, 24, 'Mattresses & Pillows'),
  (63, 24, 'Shower Curtains & Mats'),
  (64, 24, 'Bathroom Storage'),

  -- Category: Garden & Outdoor (category_id = 25)
  (65, 25, 'Outdoor Furniture'),
  (66, 25, 'Grills & Outdoor Cooking'),
  (67, 25, 'Garden Tools'),
  (68, 25, 'Plants & Seeds'),
  (69, 25, 'Outdoor Decor'),

  -- Category: Event Management (category_id = 21)
  (70, 21, 'Wedding Planning'),
  (71, 21, 'Corporate Events'),
  (72, 21, 'Birthday Parties'),
  (73, 21, 'Catering Services'),
  (74, 21, 'Photography & Videography Services'),
  
  -- Category: Furniture & Home Decor (category_id = 22)
  (75, 22, 'Sofas & Sectionals'),
  (76, 22, 'Coffee Tables'),
  (77, 22, 'Bedroom Furniture'),
  (78, 22, 'Dining Room Furniture'),
  (79, 22, 'Lighting & Fixtures'),
  
  -- Category: Kitchen & Dining (category_id = 23)
  (80, 23, 'Cookware & Bakeware'),
  (81, 23, 'Kitchen Appliances'),
  (82, 23, 'Kitchen Utensils & Gadgets'),
  (83, 23, 'Dinnerware'),
  (84, 23, 'Barware'),
  
  -- Category: Bath & Bedding (category_id = 24)
  (85, 24, 'Towels & Washcloths'),
  (86, 24, 'Shower Curtains & Accessories'),
  (87, 24, 'Bed Sheets & Pillowcases'),
  (88, 24, 'Comforters & Quilts'),
  (89, 24, 'Mattress Protectors & Toppers'),
  
  -- Category: Garden & Outdoor (category_id = 25)
  (90, 25, 'Patio Furniture'),
  (91, 25, 'Garden Tools'),
  (92, 25, 'Outdoor Lighting'),
  (93, 25, 'Grills & BBQ'),
  (94, 25, 'Outdoor Decor'),
  
  -- Category: Computers & Accessories (category_id = 26)
  (95, 26, 'Desktop Computers'),
  (96, 26, 'Laptops & Notebooks'),
  (97, 26, 'Computer Components'),
  (98, 26, 'Computer Accessories'),
  (99, 26, 'Networking & Connectivity'),
  
  -- Category: Mobile Accessories (category_id = 27)
  (100, 27, 'Cases & Covers'),
  (101, 27, 'Chargers & Cables'),
  (102, 27, 'Headphones & Earphones'),
  (103, 27, 'Screen Protectors'),
  (104, 27, 'Power Banks'),
  
  -- Category: Photography & Videography (category_id = 28)
  (105, 28, 'Digital Cameras'),
  (106, 28, 'Camcorders'),
  (107, 28, 'Lenses & Filters'),
  (108, 28, 'Tripods & Supports'),
  (109, 28, 'Lighting & Studio Equipment'),
  
  -- Category: Sports & Fitness (category_id = 29)
  (110, 29, 'Gym Equipment'),
  (111, 29, 'Cycling'),
  (112, 29, 'Running Gear'),
  (113, 29, 'Team Sports'),
  (114, 29, 'Outdoor Recreation'),
  
  -- Category: Musical Instruments (category_id = 30)
  (115, 30, 'Guitars'),
  (116, 30, 'Keyboards & Pianos'),
  (117, 30, 'Drums & Percussion'),
  (118, 30, 'Wind Instruments'),
  (119, 30, 'String Instruments'),
  
  -- Category: Board Games & Puzzles (category_id = 31)
  (120, 31, 'Board Games'),
  (121, 31, 'Puzzles'),
  (122, 31, 'Card Games'),
  (123, 31, 'Educational Games'),
  (124, 31, 'Strategy Games'),
  
  -- Category: Toys & Games (category_id = 32)
  (125, 32, 'Action Figures'),
  (126, 32, 'Dolls & Accessories'),
  (127, 32, 'Remote Control Toys'),
  (128, 32, 'Outdoor Play'),
  (129, 32, 'Educational Toys'),
  
  -- Category: Crafts & Sewing (category_id = 33)
  (130, 33, 'Sewing Machines & Accessories'),
  (131, 33, 'Fabric'),
  (132, 33, 'Craft Supplies'),
  (133, 33, 'Knitting & Crochet'),
  (134, 33, 'Scrapbooking & Paper Crafts'),
  
  -- Category: Pet Supplies (category_id = 34)
  (135, 34, 'Pet Food'),
  (136, 34, 'Pet Toys'),
  (137, 34, 'Grooming Supplies'),
  (138, 34, 'Aquariums & Accessories'),
  (139, 34, 'Pet Health & Wellness'),
  
  -- Category: Office Supplies (category_id = 35)
  (140, 35, 'Writing Instruments'),
  (141, 35, 'Notebooks & Planners'),
  (142, 35, 'Office Furniture'),
  (143, 35, 'Printers & Scanners'),
  (144, 35, 'Office Electronics'),
  
  -- Category: Beauty & Personal Care (category_id = 36)
  (145, 36, 'Skincare'),
  (146, 36, 'Makeup'),
  (147, 36, 'Hair Care Products'),
  (148, 36, 'Personal Hygiene'),
  (149, 36, 'Mens Grooming'),
  
  -- Category: Groceries & Food (category_id = 37)
  (150, 37, 'Bakery & Breads'),
  (151, 37, 'Dairy Products'),
  (152, 37, 'Meat & Poultry'),
  (153, 37, 'Seafood'),
  (154, 37, 'Pantry Staples'),
  
  -- Category: Beverages (category_id = 38)
  (155, 38, 'Soft Drinks'),
  (156, 38, 'Juices'),
  (157, 38, 'Water'),
  (158, 38, 'Coffee & Tea'),
  (159, 38, 'Alcoholic Beverages'),
  
  -- Category: Snacks & Confectionery (category_id = 39)
  (160, 39, 'Chips & Crisps'),
  (161, 39, 'Chocolate & Sweets'),
  (162, 39, 'Nuts & Seeds'),
  (163, 39, 'Biscuits & Cookies'),
  (164, 39, 'Cakes & Pastries'),
  
  -- Category: Healthcare Products (category_id = 40)
  (165, 40, 'Over-The-Counter Medicines'),
  (166, 40, 'Vitamins & Supplements'),
  (167, 40, 'First Aid'),
  (168, 40, 'Medical Devices'),
  (169, 40, 'Personal Care Appliances'),
  
  -- Category: Baby Products (category_id = 41)
  (170, 41, 'Baby Food & Formula'),
  (171, 41, 'Diapers & Wipes'),
  (172, 41, 'Feeding & Nursing'),
  (173, 41, 'Baby Gear'),
  (174, 41, 'Toys & Learning Materials');

