/*
  Warnings:

  - You are about to drop the `_OrderServiceToProblem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `_OrderServiceToProblem`;

-- CreateTable
CREATE TABLE `OrderServiceOnProblem` (
    `orderServiceId` INTEGER NOT NULL,
    `problemId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`orderServiceId`, `problemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
