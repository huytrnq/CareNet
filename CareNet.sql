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
    `occupation` VARCHAR(255),        -- Occupation

    `license_number` VARCHAR(255),    -- Licence number
    `expiry_date` DATE,               -- Expiry date
    `date_of_birth` DATE,             -- Date of birth
    `affiliations` VARCHAR(255),      -- Affiliations
    `profile_path` VARCHAR(255),      -- Path to profile picture
    PRIMARY KEY (`id`)
);

-- Medical information table
CREATE TABLE `medical_info` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `weight` DECIMAL(5,2),            -- Weight in kg
    `height` DECIMAL(4,2),            -- Height in meters
    `allergies` TEXT,                 -- Allergies
    `current_medication` TEXT,        -- Current medication
    `genetic_conditions` TEXT,        -- Genetic conditions
    `last_surgery` TEXT,              -- Last surgery
    `emergency_contact` VARCHAR(255), -- Emergency contact
    `insurance` VARCHAR(255),         -- Insurance
    `heart` VARCHAR(255),             -- Heart information
    `blood_pressure` VARCHAR(255),    -- Blood pressure
    `pulse` VARCHAR(255),             -- Pulse
    `abdomen` VARCHAR(255),           -- Abdomen information
    `risk_factor` INT,                -- Risk factor
    `xray_path` VARCHAR(255),         -- Path to X-ray image
    `ultrasound_path` VARCHAR(255),   -- Path to ultrasound image
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
        ON UPDATE NO ACTION ON DELETE CASCADE
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