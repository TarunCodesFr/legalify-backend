import fs from 'fs';
import { generateContent } from './content.service';
const pdf = require('pdf-parse');

export const readLocalPDF = async (filePath: string) => {
  try {
    console.log('Reading PDF from:', filePath);

    // Read the PDF file
    const buffer = await fs.promises.readFile(filePath);
    console.log('PDF file read successfully, size:', buffer.length);

    // Extract text from PDF
    const data = await pdf(buffer);
    const pdfText = data.text;

    console.log('PDF text extracted, length:', pdfText.length);
    console.log('First 200 chars:', pdfText.substring(0, 200));

    if (!pdfText || pdfText.length < 50) {
      throw new Error('Could not extract sufficient text from PDF');
    }

    // Generate content using Gemini and RETURN the result
    const analysisResult = await generateContent(pdfText);

    console.log('Analysis completed successfully');

    // Return the result to the controller
    return analysisResult;
  } catch (error) {
    console.error('PDF Service Error:', error);
    throw error;
  }
};
