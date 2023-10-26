/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Order`;

-- CreateTable
CREATE TABLE `Requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modalId` INTEGER NOT NULL,
    `vehicleId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `orderStatusId` INTEGER NOT NULL,
    `userLatitude` VARCHAR(191) NOT NULL,
    `userLongitude` VARCHAR(191) NOT NULL,
    `problemDescription` VARCHAR(191) NULL,
    `loadWeight` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
