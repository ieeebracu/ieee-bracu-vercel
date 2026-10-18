CREATE TABLE `gallery_photos` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`category` text DEFAULT 'General' NOT NULL,
	`year` text NOT NULL,
	`image_key` text NOT NULL,
	`aspect` text DEFAULT 'wide' NOT NULL,
	`created_at` integer NOT NULL
);
