CREATE DATABASE IF NOT EXISTS users_db;
USE users_db;

DROP TABLE IF EXISTS user_links;
DROP TABLE IF EXISTS user_social_link;
DROP TABLE IF EXISTS social_platforms;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_password VARCHAR(100),          -- Fixed: Added missing comma
  user_bio TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fixed: Removed trailing comma
);

CREATE TABLE IF NOT EXISTS social_platforms (
   platform_id INT AUTO_INCREMENT PRIMARY KEY, -- Fixed: Corrected spelling from plataform_id
   platform_name VARCHAR(50) NOT NULL UNIQUE,
   base_url VARCHAR(2048)
);

#A table that stores a link from a registered social platform
CREATE TABLE IF NOT EXISTS user_social_link (
   user_social_id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT NOT NULL,
   platform_id INT NOT NULL, -- Fixed: Added missing INT data type
   social_link VARCHAR(2048) NOT NULL,

   -- Fixed: Removed broken commas from constraints
   CONSTRAINT fk_user_social 
      FOREIGN KEY (user_id) REFERENCES users(user_id)
      ON DELETE CASCADE,

   CONSTRAINT fk_platform
      FOREIGN KEY (platform_id) REFERENCES social_platforms(platform_id)
      ON DELETE CASCADE,

   UNIQUE KEY unique_user_platform (user_id, platform_id)
);

CREATE TABLE IF NOT EXISTS user_links (
   user_link_id INT AUTO_INCREMENT PRIMARY KEY,
   link VARCHAR(2048) NOT NULL,
   user_id INT NOT NULL,

   -- Fixed: Constraint names should ideally be unique across the schema
   CONSTRAINT fk_user_custom_links 
      FOREIGN KEY (user_id) REFERENCES users(user_id)
      ON DELETE CASCADE
);
