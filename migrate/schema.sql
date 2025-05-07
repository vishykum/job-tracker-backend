-- schema.sql

-- Create and use the database
-- CREATE DATABASE IF NOT EXISTS jtdb;
-- USE jtdb;

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  status ENUM('wishlist', 'applied', 'oa', 'interview', 'offer', 'rejected', 'ghosted') NOT NULL,
  date_applied DATE,
  job_url TEXT,
  notes TEXT,
  tags TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- References Table
CREATE TABLE IF NOT EXISTS `references` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  role VARCHAR(255),
  company VARCHAR(255),
  contact_info VARCHAR(255),
  notes TEXT
);

-- Application-Reference Link Table
CREATE TABLE IF NOT EXISTS application_references (
  application_id INT,
  reference_id INT,
  PRIMARY KEY (application_id, reference_id),
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  FOREIGN KEY (reference_id) REFERENCES `references`(id) ON DELETE CASCADE
);

-- Networking Logs
CREATE TABLE IF NOT EXISTS networking_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_name VARCHAR(255),
  company VARCHAR(255),
  type ENUM('email', 'linkedin', 'call', 'referral', 'other') NOT NULL,
  contact_date DATE NOT NULL,
  notes TEXT,
  related_application_id INT,
  FOREIGN KEY (related_application_id) REFERENCES applications(id) ON DELETE SET NULL
);

-- Technical Skill Logs
CREATE TABLE IF NOT EXISTS skill_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  category ENUM('leetcode', 'dsa', 'system_design', 'project', 'course', 'other') NOT NULL,
  num_problems INT DEFAULT NULL,
  duration_minutes INT,
  topics TEXT,
  notes TEXT
);
