-- 1. Insert Departments
INSERT INTO departments (id, name, code) VALUES
('dept-elec', 'Electrical Works Department', 'ELEC'),
('dept-roads', 'Roads & Infrastructure Department', 'ROADS'),
('dept-water', 'Water Supply & Sanitation Department', 'WATER');

-- 2. Insert Projects (Includes project_code for exact lookups)
INSERT INTO projects (id, project_code, title, category, pincode, status, department_id, expected_completion) VALUES
('proj-el204', 'EL-204', 'Electrical Maintenance Phase II', 'Street Lighting', '110025', 'In Progress', 'dept-elec', '2026-08-18'),
('proj-rd101', 'RD-101', 'Main Road Paving & Drainage', 'Roads', '110025', 'Planning', 'dept-roads', '2026-11-30'),
('proj-wt309', 'WT-309', 'Pipeline Replacement Drive', 'Water Supply', '110001', 'In Progress', 'dept-water', '2026-09-15');

-- 3. Insert Budgets (Required for the frontend Explainable Decision Cards)
INSERT INTO budgets (id, project_id, total_allocated, spent, fiscal_year) VALUES
('budg-el204', 'proj-el204', 1800000.00, 1170000.00, '2026-2027'),
('budg-rd101', 'proj-rd101', 4500000.00, 900000.00, '2026-2027');

-- 4. Insert Initial Complaint Seed
INSERT INTO complaints (id, description, category, pincode, status, project_id, admin_flagged, ai_summary) VALUES
('cmp-1024', 'Street light near main park has not been working for 3 days', 'Street Lighting', '110025', 'Pending', 'proj-el204', FALSE, 'Associated with ongoing project EL-204 scheduled for completion by Aug 18.');