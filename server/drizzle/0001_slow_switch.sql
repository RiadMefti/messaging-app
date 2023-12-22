CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`tempSocketId` text
);
--> statement-breakpoint
DROP TABLE `countries`;