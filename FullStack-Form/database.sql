CREATE DATABASE IF NOT EXISTS users_db;
USE users_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255),          -- Fixed: Added missing comma
  user_bio TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fixed: Removed trailing comma
);

CREATE TABLE IF NOT EXISTS social_platforms (
   platform_id INT AUTO_INCREMENT PRIMARY KEY, -- Fixed: Corrected spelling from plataform_id
   platform_name VARCHAR(255) NOT NULL UNIQUE,
   base_url VARCHAR(2048)
);

-- A table that stores a link from a registered social platform
CREATE TABLE IF NOT EXISTS user_social_links (
   user_social_id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT NOT NULL,
   platform_id INT NOT NULL, -- Fixed: Added missing INT data type
   social_link VARCHAR(2048) NOT NULL,

   -- Fixed: Removed broken commas from constraints
   CONSTRAINT fk_user_social 
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE,

   CONSTRAINT fk_platform
      FOREIGN KEY (platform_id) REFERENCES social_platforms(platform_id)
      ON DELETE CASCADE,

   UNIQUE KEY unique_user_platform (user_id, platform_id)
);

CREATE TABLE IF NOT EXISTS user_links (
   user_link_id INT AUTO_INCREMENT PRIMARY KEY,
   link_name VARCHAR(255) NOT NULL,
   link_url VARCHAR(2048) NOT NULL,
   user_id INT NOT NULL,

   -- Fixed: Constraint names should ideally be unique across the schema
   CONSTRAINT fk_user_custom_links 
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE
);

INSERT INTO users (user_name, user_email, user_password, user_bio)
VALUES 
("ItsCiaPro", "josuemedrado@gmail.com", "sweeet", "Eu sou um desenvolvedor de software iniciante!"),
("João Circus", "joãocircus@yahoo.com", "fodase", "Eu sou o jax pomni da silva");

INSERT IGNORE INTO social_platforms (platform_name, base_url)
VALUES 
   ("Instagram", "https://instagram.com"),
   ("Linkedin", "https://linkedin.com"),
   ("Youtube", "https://youtube.com");

INSERT INTO user_social_links (user_id, platform_id, social_link)
VALUES
   (1, 1, "https://www.instagram.com/josu_medrado/"),
   (1, 2, "https://www.linkedin.com/in/josu%C3%A9-medrado-1767523b8/"),
   (1, 3, "https://www.youtube.com/@ItsCiaPro"),

   (2, 1, "https://www.instagram.com/josu_medrado/"),
   (2, 2, "https://www.linkedin.com/in/josu%C3%A9-medrado-1767523b8/"),
   (2, 3, "https://www.youtube.com/@ItsCiaPro");

INSERT INTO user_links (user_id, link_name, link_url)
VALUES
   (1, "Github", "https://github.com/ItsCiaPro"),
   (2, "DeviantArt", "https://deviantart.com");

SELECT * FROM users WHERE id = 1;

SELECT * FROM user_social_links WHERE user_id = 1;

SELECT * FROM user_links WHERE user_id = 1;