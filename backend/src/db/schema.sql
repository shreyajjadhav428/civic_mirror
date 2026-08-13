-- 1. Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Drop existing tables to ensure a clean slate
DROP TABLE IF EXISTS complaints CASCADE;
DROP TABLE IF EXISTS budgets CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS departments CASCADE;

-- 3. Departments Table
CREATE TABLE departments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL
);

-- 4. Projects Table (Re-added project_code)
CREATE TABLE projects (
    id VARCHAR(50) PRIMARY KEY,
    project_code VARCHAR(50) UNIQUE NOT NULL, 
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    status VARCHAR(50) DEFAULT 'In Progress',
    department_id VARCHAR(50) REFERENCES departments(id) ON DELETE CASCADE,
    expected_completion DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_projects_pincode ON projects(pincode);

-- 5. Budgets Table (Re-added for the frontend decision cards)
CREATE TABLE budgets (
    id VARCHAR(50) PRIMARY KEY,
    project_id VARCHAR(50) REFERENCES projects(id) ON DELETE CASCADE,
    total_allocated NUMERIC(15, 2) NOT NULL,
    spent NUMERIC(15, 2) DEFAULT 0.00,
    fiscal_year VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Complaints Table
CREATE TABLE complaints (
    id VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    project_id VARCHAR(50) REFERENCES projects(id) ON DELETE SET NULL,
    admin_flagged BOOLEAN DEFAULT FALSE,
    ai_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_complaints_pincode ON complaints(pincode);