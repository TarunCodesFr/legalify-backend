import dotenv from 'dotenv';
dotenv.config();
import { app } from './app';
// import { PDFParse } from 'pdf-parse';
import { readLocalPDF } from './services/postdocument.service';

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
});
