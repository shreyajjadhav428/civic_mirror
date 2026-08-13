-- Table to manage the Admin Data Library
CREATE TABLE IF NOT EXISTS municipal_files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    size_bytes INT,
    status VARCHAR(50) DEFAULT 'Processed',
    uploaded_by VARCHAR(50) REFERENCES users(id) ON DELETE SET NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notify cache reload
NOTIFY pgrst, 'reload schema';