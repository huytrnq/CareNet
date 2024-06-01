CREATE TABLE `doctor` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`username` VARCHAR(255) UNIQUE,
	`firstname` VARCHAR(255),
	`lastname` VARCHAR(255),
	`role` ENUM("doctor", "patient"),
	`gender` ENUM("male", "female", "other"),
	`phone` VARCHAR(255),
	`email` VARCHAR(255),
	`address` TEXT(65535),
	`password` VARCHAR(255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `patient` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`username` VARCHAR(255) UNIQUE,
	`firstname` VARCHAR(255),
	`lastname` VARCHAR(255),
	`role` ENUM("doctor", "patient"),
	`gender` ENUM("male", "female", "other"),
	`phone` VARCHAR(255),
	`email` VARCHAR(255) UNIQUE,
	`addres` VARCHAR(255),
	`password` VARCHAR(255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `appointment` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`doctor_id` INT,
	`patient_id` INT,
	`date` DATE,
	`time` TIME,
	`status` ENUM("scheduled", "completed", "cancelled"),
	PRIMARY KEY(`id`, `doctor_id`, `patient_id`)
);

ALTER TABLE `doctor`
ADD FOREIGN KEY(`id`) REFERENCES `appointment`(`doctor_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `patient`
ADD FOREIGN KEY(`id`) REFERENCES `appointment`(`patient_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;