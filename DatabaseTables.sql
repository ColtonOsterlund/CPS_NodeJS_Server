DROP TABLE IF EXISTS calciulate_tests;
DROP TABLE IF EXISTS cows;
DROP TABLE IF EXISTS herds;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS blacklisted_jwts;
-- DROP TRIGGER IF EXISTS users_uuid;
-- DROP TRIGGER IF EXISTS cows_uuid;
-- DROP TRIGGER IF EXISTS herds_uuid;
-- DROP TRIGGER IF EXISTS calciulate_tests_uuid;


CREATE TABLE IF NOT EXISTS blacklisted_jwts (
  token TEXT(8000) NOT NULL,
  expiration INT NOT NULL
);

CREATE EVENT IF NOT EXISTS delete_jwts
ON SCHEDULE EVERY 1 HOUR
DO
  DELETE FROM blacklisted_jwts
  WHERE expiration < UNIX_TIMESTAMP(NOW());

-- For MySQL version 8.0.13, append "DEFAULT(UUID_TO_BIN(UUID()))" to primary keys of ID
-- Otherwise, use the triggers

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name BLOB NOT NULL,
  last_name BLOB NOT NULL,
  main_address BLOB NOT NULL,
  secondary_address BLOB,
  city BLOB NOT NULL,
  province BLOB NOT NULL,
  country BLOB NOT NULL,
  zip_code BLOB NOT NULL,
  phone BLOB NOT NULL,
  admin_flag TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- CREATE TRIGGER users_uuid
-- BEFORE INSERT ON users
-- FOR EACH ROW
-- SET NEW.id = UUID();

CREATE TABLE IF NOT EXISTS herds (
  id VARCHAR(255),
  herd_id INT NOT NULL,
  location VARCHAR(255) NOT NULL,
  milking_system VARCHAR(255) NOT NULL,
  pin INT NOT NULL,
  modify_date DATETIME NOT NULL,
  sync_flag TINYINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT NOT NULL DEFAULT 0,
  user_id BINARY(16) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- CREATE TRIGGER herds_uuid
-- BEFORE INSERT ON herds
-- FOR EACH ROW
-- SET NEW.id = UUID();

CREATE TABLE IF NOT EXISTS cows (
  id VARCHAR(255),
  cow_id INT NOT NULL,
  days_in_milk INT NOT NULL,
  dry_off_day INT NOT NULL,
  mastitis_history INT NOT NULL,
  method_of_dry_off VARCHAR(255) NOT NULL,
  daily_milk_average INT NOT NULL,
  parity INT NOT NULL,
  reproduction_status VARCHAR(255) NOT NULL,
  number_of_times_bred INT NOT NULL,
  farm_breeding_index INT NOT NULL,
  lactation_number INT NOT NULL,
  days_carried_calf_if_pregnant INT NOT NULL,
  projected_due_date VARCHAR(255) NOT NULL,
  current_305_day_milk INT NOT NULL,
  current_somatic_cell_count INT NOT NULL,
  linear_score_at_last_test DOUBLE NOT NULL,
  date_of_last_clinical_mastitis VARCHAR(255) NOT NULL,
  chain_visible_id INT NOT NULL,
  animal_registration_no_nlid VARCHAR(255) NOT NULL,
  dam_breed VARCHAR(255) NOT NULL,
  culled TINYINT NOT NULL DEFAULT 0,
  modify_date DATETIME NOT NULL,
  sync_flag TINYINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT NOT NULL DEFAULT 0,
  herd_id BINARY(16) NOT NULL,
  user_id BINARY(16) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (herd_id) REFERENCES herds (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- CREATE TRIGGER cows_uuid
-- BEFORE INSERT ON cows
-- FOR EACH ROW
-- SET NEW.id = UUID();

CREATE TABLE IF NOT EXISTS calciulate_tests (
  id VARCHAR(255),
  calciulate_test_id INT NOT NULL,
  units VARCHAR(255) NOT NULL,
  millivolts FLOAT NOT NULL,
  result FLOAT NOT NULL,
  milk_fever TINYINT NOT NULL,
  follow_up_num INT,
  days_in_milk INT NOT NULL,
  dry_off_day INT NOT NULL,
  mastitis_history INT NOT NULL,
  method_of_dry_off VARCHAR(255) NOT NULL,
  daily_milk_average INT NOT NULL,
  parity INT NOT NULL,
  reproduction_status VARCHAR(255) NOT NULL,
  number_of_times_bred INT NOT NULL,
  farm_breeding_index INT NOT NULL,
  lactation_number INT NOT NULL,
  days_carried_calf_if_pregnant INT NOT NULL,
  projected_due_date VARCHAR(255) NOT NULL,
  current_305_day_milk INT NOT NULL,
  current_somatic_cell_count INT NOT NULL,
  linear_score_at_last_test DOUBLE NOT NULL,
  date_of_last_clinical_mastitis VARCHAR(255) NOT NULL,
  chain_visible_id INT NOT NULL,
  animal_registration_no_nlid VARCHAR(255) NOT NULL,
  dam_breed VARCHAR(255) NOT NULL,
  culled TINYINT NOT NULL DEFAULT 0,
  modify_date DATETIME NOT NULL,
  sync_flag TINYINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT NOT NULL DEFAULT 0,
  cow_id BINARY(16) NOT NULL,
  user_id BINARY(16) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (cow_id) REFERENCES cows (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- CREATE TRIGGER calciulate_tests_uuid
-- BEFORE INSERT ON calciulate_tests
-- FOR EACH ROW
-- SET NEW.id = UUID();

ALTER TABLE mj3q374936dbg9dd.herds ADD UNIQUE KEY (id, deleted_flag);

ALTER TABLE mj3q374936dbg9dd.cows ADD CONSTRAINT `herds_deleted_cascade`
FOREIGN KEY (herd_id, deleted_flag) REFERENCES mj3q374936dbg9dd.herds(id, deleted_flag) ON UPDATE CASCADE;

ALTER TABLE mj3q374936dbg9dd.cows ADD UNIQUE KEY (id, deleted_flag);

ALTER TABLE mj3q374936dbg9dd.calciulate_tests ADD CONSTRAINT `cowss_deleted_cascade`
FOREIGN KEY (cow_id, deleted_flag) REFERENCES mj3q374936dbg9dd.cows(id, deleted_flag) ON UPDATE CASCADE;