/*
  Warnings:

  - Added the required column `filePath` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "extractedText" TEXT,
ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL;
