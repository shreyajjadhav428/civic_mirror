-- Table to store citizen chat sessions and AI reasoning
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    citizen_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    pincode VARCHAR(10),
    ai_explanation JSONB NOT NULL, -- Stores the full structured decision card
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notify cache reload
NOTIFY pgrst, 'reload schema';