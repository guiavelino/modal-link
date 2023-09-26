-- CreateIndex
CREATE INDEX `Modal_modalCategoryId_idx` ON `Modal`(`modalCategoryId`);

-- CreateIndex
CREATE INDEX `Order_modalId_vehicleId_orderStatusId_idx` ON `Order`(`modalId`, `vehicleId`, `orderStatusId`);

-- CreateIndex
CREATE INDEX `User_userTypeId_idx` ON `User`(`userTypeId`);

-- CreateIndex
CREATE INDEX `Vehicle_userId_idx` ON `Vehicle`(`userId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userTypeId_fkey` FOREIGN KEY (`userTypeId`) REFERENCES `UserType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Modal` ADD CONSTRAINT `Modal_modalCategoryId_fkey` FOREIGN KEY (`modalCategoryId`) REFERENCES `ModalCateogry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_modalId_fkey` FOREIGN KEY (`modalId`) REFERENCES `Modal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_orderStatusId_fkey` FOREIGN KEY (`orderStatusId`) REFERENCES `OrderStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToProblem` ADD CONSTRAINT `_OrderToProblem_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToProblem` ADD CONSTRAINT `_OrderToProblem_B_fkey` FOREIGN KEY (`B`) REFERENCES `Problem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToTypeLoad` ADD CONSTRAINT `_OrderToTypeLoad_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToTypeLoad` ADD CONSTRAINT `_OrderToTypeLoad_B_fkey` FOREIGN KEY (`B`) REFERENCES `TypeLoad`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
