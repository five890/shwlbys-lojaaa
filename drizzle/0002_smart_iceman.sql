ALTER TABLE `orders` DROP FOREIGN KEY `orders_paymentProofId_pixProofs_id_fk`;
--> statement-breakpoint
ALTER TABLE `orders` DROP COLUMN `paymentProofId`;