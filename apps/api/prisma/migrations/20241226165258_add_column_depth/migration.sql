/*
  Warnings:

  - Added the required column `depth` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "depth" INTEGER NOT NULL;
