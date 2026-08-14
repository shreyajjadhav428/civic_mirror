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


-- 2. SEED CITIZEN COMPLAINTS (20 Records for Clustering)
-- Note: Leaving citizen_id NULL for general admin dashboard testing. 

INSERT INTO complaints (id, category, description, pincode, status, admin_flagged, created_at)
VALUES
-- Cluster 1: Shanti Nagar Streetlights (Testing RAG and Clustering)
(gen_random_uuid(), 'Street Lighting', 'Streetlights on 4th avenue are completely dead.', '110025', 'Pending', false, NOW() - INTERVAL '2 days'),
(gen_random_uuid(), 'Street Lighting', 'Pitch black near the school in Shanti Nagar, very unsafe.', '110025', 'Pending', true, NOW() - INTERVAL '1 day'),
(gen_random_uuid(), 'Street Lighting', 'LED lights flickering and turning off.', '110025', 'Pending', false, NOW() - INTERVAL '5 hours'),
(gen_random_uuid(), 'Street Lighting', 'Pole fell down during the storm last night.', '110025', 'In Progress', true, NOW() - INTERVAL '3 days'),

-- Cluster 2: Shanti Nagar Roads
(gen_random_uuid(), 'Roads', 'Massive crater pothole on Main Road.', '110025', 'Pending', false, NOW() - INTERVAL '4 days'),
(gen_random_uuid(), 'Roads', 'Repaving left debris everywhere.', '110025', 'Resolved', false, NOW() - INTERVAL '10 days'),
(gen_random_uuid(), 'Water Supply', 'No water pressure in block B.', '110025', 'Pending', false, NOW() - INTERVAL '1 day'),

-- Cluster 3: Downtown District Sanitation & Roads
(gen_random_uuid(), 'Sanitation', 'Garbage overflow near commercial center.', '400001', 'Pending', true, NOW() - INTERVAL '2 days'),
(gen_random_uuid(), 'Sanitation', 'Waste facility smelling up the neighborhood.', '400001', 'In Progress', false, NOW() - INTERVAL '5 days'),
(gen_random_uuid(), 'Sanitation', 'Public bins haven''t been emptied in a week.', '400001', 'Pending', false, NOW() - INTERVAL '12 hours'),
(gen_random_uuid(), 'Roads', 'Road paint is completely faded at the intersection.', '400001', 'Pending', false, NOW() - INTERVAL '6 days'),
(gen_random_uuid(), 'Public Parks', 'Central park gates are broken.', '400001', 'Resolved', false, NOW() - INTERVAL '15 days'),
(gen_random_uuid(), 'Public Parks', 'Graffiti on the new park benches.', '400001', 'In Progress', false, NOW() - INTERVAL '2 days'),
(gen_random_uuid(), 'Street Lighting', 'Commercial grid update caused a blackout.', '400001', 'Pending', true, NOW() - INTERVAL '1 day'),

-- Cluster 4: Suburban Area Water & Drainage
(gen_random_uuid(), 'Sanitation', 'Drainage overflow flooding the street.', '422001', 'Pending', true, NOW() - INTERVAL '1 day'),
(gen_random_uuid(), 'Sanitation', 'Mosquitoes breeding in stagnant drainage water.', '422001', 'Pending', true, NOW() - INTERVAL '3 days'),
(gen_random_uuid(), 'Sanitation', 'Foul smell from the open drains.', '422001', 'Pending', false, NOW() - INTERVAL '4 days'),
(gen_random_uuid(), 'Water Supply', 'Yellow water coming from the taps.', '422001', 'In Progress', true, NOW() - INTERVAL '2 days'),
(gen_random_uuid(), 'Water Supply', 'Purification plant noise is too loud at night.', '422001', 'Resolved', false, NOW() - INTERVAL '20 days'),
(gen_random_uuid(), 'Roads', 'Highway extension construction blocking my driveway.', '422001', 'Pending', false, NOW() - INTERVAL '1 day');

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';