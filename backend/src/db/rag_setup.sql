-- Creates a function to perform vector similarity search for documents within a specific pincode
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int,
  p_pincode varchar
)
RETURNS TABLE (
  id varchar,
  title varchar,
  content_text text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    documents.id,
    documents.title,
    documents.content_text,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE documents.pincode = p_pincode
    -- Use cosine distance (<=>) for similarity
    AND 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;

-- Notify cache reload
NOTIFY pgrst, 'reload schema';