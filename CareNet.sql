USE CareNet;

-- Combined user table
CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) UNIQUE,
    `firstname` VARCHAR(255),
    `lastname` VARCHAR(255),
    `role` ENUM('doctor', 'patient'),
    `gender` ENUM('male', 'female', 'other'),
    `phone` VARCHAR(255),
    `email` VARCHAR(255) UNIQUE,
    `address` TEXT,
    `password` VARCHAR(255),
    PRIMARY KEY (`id`)
);

-- Appointment table
CREATE TABLE `appointment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `doctor_id` INT NOT NULL,
    `patient_id` INT NOT NULL,
    `date` DATE,
    `time` TIME,
    `status` ENUM('scheduled', 'completed', 'cancelled'),
    PRIMARY KEY (`id`),
    INDEX (`doctor_id`),
    INDEX (`patient_id`),
    FOREIGN KEY (`doctor_id`) REFERENCES `user` (`id`)
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    FOREIGN KEY (`patient_id`) REFERENCES `user` (`id`)
        ON UPDATE NO ACTION ON DELETE NO ACTION
);
