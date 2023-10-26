/*
  Warnings:

  - Made the column `problemDescription` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `loadWeight` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `problemDescription` VARCHAR(191) NOT NULL,
    MODIFY `loadWeight` DOUBLE NOT NULL;
