ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_userId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `chatMessages` DROP FOREIGN KEY `chatMessages_userId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `orderItems` DROP FOREIGN KEY `orderItems_orderId_orders_id_fk`;
--> statement-breakpoint
ALTER TABLE `orderItems` DROP FOREIGN KEY `orderItems_productId_products_id_fk`;
--> statement-breakpoint
ALTER TABLE `orders` DROP FOREIGN KEY `orders_userId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `orders` DROP FOREIGN KEY `orders_shippingAddressId_addresses_id_fk`;
--> statement-breakpoint
ALTER TABLE `pixProofs` DROP FOREIGN KEY `pixProofs_orderId_orders_id_fk`;
--> statement-breakpoint
ALTER TABLE `productCategories` DROP FOREIGN KEY `productCategories_productId_products_id_fk`;
--> statement-breakpoint
ALTER TABLE `productCategories` DROP FOREIGN KEY `productCategories_categoryId_categories_id_fk`;
--> statement-breakpoint
ALTER TABLE `productImages` DROP FOREIGN KEY `productImages_productId_products_id_fk`;
--> statement-breakpoint
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_productId_products_id_fk`;
--> statement-breakpoint
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_userId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `wishlists` DROP FOREIGN KEY `wishlists_userId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `wishlists` DROP FOREIGN KEY `wishlists_productId_products_id_fk`;
--> statement-breakpoint
ALTER TABLE `orders` ADD `paymentProofId` int;