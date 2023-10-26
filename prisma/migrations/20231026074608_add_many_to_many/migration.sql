/*
  Warnings:

  - You are about to drop the `OrderServiceOnProblem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderServiceToTypeLoad` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `OrderServiceOnProblem`;

-- DropTable
DROP TABLE `_OrderServiceToTypeLoad`;

-- CreateTable
CREATE TABLE `OrderServiceToProblem` (
    `orderServiceId` INTEGER NOT NULL,
    `problemId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`orderServiceId`, `problemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderServiceToTypeLoad` (
    `orderServiceId` INTEGER NOT NULL,
    `typeLoadId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`orderServiceId`, `typeLoadId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
