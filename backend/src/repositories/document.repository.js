import { supabase } from '../config/supabase.js';

export const insertDocumentChunkRepo = async (docData) => {
  const { data, error } = await supabase
    .from('documents')
    .insert([docData])
    .select('id, title')
    .single();

  if (error) throw error;
  return data;
};

export const searchSimilarDocumentsRepo = async (embedding, pincode, threshold = 0.5, limit = 3) => {
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: threshold,
    match_count: limit,
    p_pincode: pincode
  });

  if (error) throw error;
  return data;
};