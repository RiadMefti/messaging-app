CREATE TABLE `roomMessages` (
	`id` text,
	`userName` text,
	`hidden` integer DEFAULT 0,
	PRIMARY KEY(`id`, `userName`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text
);
