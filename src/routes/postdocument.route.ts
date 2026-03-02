import { Router } from 'express';
import multer from 'multer';
import { sendDocument, upload } from '../controllers/postdocument.controller';

const router = Router();
// const upload = multer({ dest: 'uploads/' });

router.post('/post/document', upload.single('legalDocument'), sendDocument);

export default router;
