-- ==========================================
-- CIVICMIRROR AI - TEST DATA SEED SCRIPT (V2)
-- ==========================================

-- 1. SEED MUNICIPAL PROJECTS (10 Records)
-- Explicitly passing gen_random_uuid() to satisfy the NOT NULL constraint on the id column.
INSERT INTO projects (id, project_code, title, category, status, progress, expected_completion, pincode) 
VALUES
-- Shanti Nagar (110025) Projects
(gen_random_uuid(), 'RD-101', 'Shanti Nagar Main Road Repaving', 'Roads', 'In Progress', 45, '2026-11-01', '110025'),
(gen_random_uuid(), 'EL-204', 'Shanti Nagar LED Streetlight Upgrade', 'Street Lighting', 'In Progress', 15, '2026-09-15', '110025'),
(gen_random_uuid(), 'WT-301', 'Water Pipeline Expansion Phase 1', 'Water Supply', 'Pending', 0, '2027-02-01', '110025'),

-- Downtown District (400001) Projects
(gen_random_uuid(), 'RD-102', 'Downtown Pothole Eradication', 'Roads', 'Resolved', 100, '2026-07-01', '400001'),
(gen_random_uuid(), 'SN-405', 'Public Waste Management Facility', 'Sanitation', 'In Progress', 80, '2026-08-30', '400001'),
(gen_random_uuid(), 'EL-205', 'Commercial District Grid Update', 'Street Lighting', 'Pending', 0, '2026-12-01', '400001'),
(gen_random_uuid(), 'PK-501', 'Central Park Renovation', 'Public Parks', 'In Progress', 60, '2026-10-15', '400001'),

-- Suburban Area (422001) Projects
(gen_random_uuid(), 'RD-103', 'Suburban Highway Extension', 'Roads', 'Pending', 10, '2027-06-01', '422001'),
(gen_random_uuid(), 'WT-302', 'Reservoir Purification Plant', 'Water Supply', 'In Progress', 35, '2026-11-20', '422001'),
(gen_random_uuid(), 'SN-406', 'Drainage System Overhaul', 'Sanitation', 'In Progress', 25, '2026-10-01', '422001')
ON CONFLICT DO NOTHING;


-- 2. SEED CITIZEN COMPLAINTS (Covering All 12 Official Departments)
INSERT INTO complaints (id, category, description, pincode, status, admin_flagged, created_at)
VALUES
-- 1. Electricity & Street Lighting
(gen_random_uuid(), 'Electricity & Street Lighting', 'Streetlights on 4th avenue are completely dead in Shanti Nagar.', '110025', 'Pending', false, NOW() - INTERVAL '2 days'),
(gen_random_uuid(), 'Electricity & Street Lighting', 'Pitch black near the primary school, flickering LED poles.', '110025', 'Pending', true, NOW() - INTERVAL '1 day'),

-- 2. Water Supply & Water Works
(gen_random_uuid(), 'Water Supply & Water Works', 'No water pressure in Block B during peak morning hours.', '110025', 'Pending', false, NOW() - INTERVAL '1 day'),
(gen_random_uuid(), 'Water Supply & Water Works', 'Discolored yellow water coming from municipal tap line.', '422001', 'In Progress', true, NOW() - INTERVAL '2 days'),

-- 3. Sewerage & Sanitation
(gen_random_uuid(), 'Sewerage & Sanitation', 'Sewage line blockage overflowing near commercial market.', '400001', 'Pending', true, NOW() - INTERVAL '2 days'),

-- 4. Roads & Public Works
(gen_random_uuid(), 'Roads & Public Works', 'Massive crater pothole on Main Road near Ward 4.', '110025', 'Pending', false, NOW() - INTERVAL '4 days'),
(gen_random_uuid(), 'Roads & Public Works', 'Road repaving left heavy gravel and asphalt debris on street.', '110025', 'Resolved', false, NOW() - INTERVAL '10 days'),

-- 5. Solid Waste Management
(gen_random_uuid(), 'Solid Waste Management', 'Garbage overflow and uncollected public bins near Sector 8 market.', '400001', 'Pending', false, NOW() - INTERVAL '12 hours'),

-- 6. Storm Water & Drainage
(gen_random_uuid(), 'Storm Water & Drainage', 'Stagnant rainwater and blocked stormwater drain flooding street.', '422001', 'Pending', true, NOW() - INTERVAL '1 day'),

-- 7. Parks & Horticulture
(gen_random_uuid(), 'Parks & Horticulture', 'Overgrown tree branches blocking street lamps and park gates broken.', '400001', 'In Progress', false, NOW() - INTERVAL '2 days'),

-- 8. Building & Urban Development
(gen_random_uuid(), 'Building & Urban Development', 'Unauthorized construction material dumped on public sidewalk.', '110001', 'Pending', false, NOW() - INTERVAL '3 days'),

-- 9. Traffic & Transportation
(gen_random_uuid(), 'Traffic & Transportation', 'Traffic signal controller malfunctioning at major intersection.', '110025', 'Pending', true, NOW() - INTERVAL '5 hours'),

-- 10. Public Health & Sanitation
(gen_random_uuid(), 'Public Health & Sanitation', 'Mosquito breeding risk in stagnant puddles near ward clinic.', '422001', 'Pending', true, NOW() - INTERVAL '3 days'),

-- 11. Animal Welfare & Veterinary
(gen_random_uuid(), 'Animal Welfare & Veterinary', 'Pack of aggressive stray dogs near residential gate.', '110025', 'Pending', false, NOW() - INTERVAL '1 day'),

-- 12. Environment & Pollution Control
(gen_random_uuid(), 'Environment & Pollution Control', 'Severe dust pollution from unmitigated building site.', '110001', 'Pending', false, NOW() - INTERVAL '2 days');

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';