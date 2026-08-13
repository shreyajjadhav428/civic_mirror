import multer from 'multer';

// Store files in memory as Buffers for quick processing
const storage = multer.memoryStorage();

// Filter for images, audio, and documents
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg', 'image/png', 'image/webp',
    'audio/mpeg', 'audio/wav', 'audio/webm',
    'application/pdf', 'text/csv', 
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // XLSX
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, audio, and standard documents are allowed.'), false);
  }
};

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});