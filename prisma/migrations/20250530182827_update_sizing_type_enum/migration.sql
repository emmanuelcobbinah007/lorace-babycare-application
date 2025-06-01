/*
  Warnings:

  - The values [Footwear] on the enum `SizingType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SizingType_new" AS ENUM ('Clothing', 'FootwearInfants', 'FootwearToddlers', 'FootwearChildren', 'Diapers', 'NA');
ALTER TABLE "Product" ALTER COLUMN "sizingType" TYPE "SizingType_new" USING ("sizingType"::text::"SizingType_new");
ALTER TYPE "SizingType" RENAME TO "SizingType_old";
ALTER TYPE "SizingType_new" RENAME TO "SizingType";
DROP TYPE "SizingType_old";
COMMIT;
