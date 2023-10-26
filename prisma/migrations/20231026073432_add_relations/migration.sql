-- CreateTable
CREATE TABLE `_OrderServiceToProblem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OrderServiceToProblem_AB_unique`(`A`, `B`),
    INDEX `_OrderServiceToProblem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderServiceToTypeLoad` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OrderServiceToTypeLoad_AB_unique`(`A`, `B`),
    INDEX `_OrderServiceToTypeLoad_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
