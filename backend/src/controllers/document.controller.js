import { generateEmbedding } from '../services/embedding.service.js';
import { insertDocumentChunkRepo } from '../repositories/document.repository.js';

/**
 * POST /api/documents/ingest
 * Ingests a raw text snippet, generates an embedding, and stores it for RAG.
 */
export const ingestDocument = async (req, res) => {
  try {
    const { title, content_text, pincode, source_type } = req.body;

    if (!title || !content_text || !pincode || !source_type) {
      return res.status(400).json({
        error: 'BadRequest',
        message: 'Missing required fields: title, content_text, pincode, source_type.'
      });
    }

    // 1. Generate the vector embedding for the document content
    const embedding = await generateEmbedding(content_text);

    // 2. Prepare the database record
    const documentId = `doc-${Date.now()}`;
    const newDoc = {
      id: documentId,
      title,
      content_text,
      pincode,
      source_type,
      embedding
    };

    // 3. Save to Supabase
    const savedDoc = await insertDocumentChunkRepo(newDoc);

    return res.status(201).json({
      status: 'success',
      data: savedDoc
    });

  } catch (error) {
    console.error('Error ingesting document:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};