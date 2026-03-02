import { Request, Response } from 'express';
import multer from 'multer';
import { readLocalPDF } from '../services/postdocument.service';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
export const upload = multer({ storage: storage });

// const upload2 = multer({ storage: storage });
export async function sendDocument(req: Request, res: Response) {
  try {
    const file = req.file; // 👈 store first

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const analysisResult = await readLocalPDF(file.path);

    return res.status(200).json({
      success: true,
      data: analysisResult,
    });
  } catch (err) {
    console.error('Upload Error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
