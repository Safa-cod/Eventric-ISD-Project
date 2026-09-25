-- Create Database
CREATE DATABASE IF NOT EXISTS eventric_db;
USE eventric_db;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image_url VARCHAR(255)
);

-- 3. EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organizer_id INT NOT NULL,
    category_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    venue VARCHAR(150) NOT NULL,
    city VARCHAR(50) DEFAULT 'Dhaka',
    country VARCHAR(50) DEFAULT 'Bangladesh',
    event_date VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    image_url VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(50) PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'COMPLETED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- 5. SAVED / BOOKMARKED EVENTS
CREATE TABLE IF NOT EXISTS saved_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- SEED DATA FOR TESTING
INSERT INTO categories (name, image_url) VALUES 
('Sports', 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e'),
('Cultural', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'),
('Meeting Venue', 'https://images.unsplash.com/photo-1511578314322-379afb476865');

INSERT INTO users (full_name, email, password_hash, phone) VALUES 
('Mehedi Ahmed', 'mehedi@example.com', '$2b$10$e84639201948', '+8801700000000');

INSERT INTO events (organizer_id, category_id, title, description, venue, event_date, price, image_url, is_featured) VALUES
(1, 1, 'IELTS Mega Seminar', 'Comprehensive exam preparation strategies and scholarship walkthrough.', 'Southeast University', '10 February', 1600.00, 'https://images.unsplash.com/photo-1523240795612-9a054b0db644', TRUE),
(1, 2, 'Study Abroad & Scholarship Fair', 'Meet with university partners directly and gain access to scholarship programs.', 'Southeast University', '10 February', 1600.00, 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1', FALSE),
(1, 1, 'Competitive Exam Seminar', 'Guidance, paper distribution, and test strategy for national board exams.', 'Tejgaon, Dhaka', '12 February', 2500.00, 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173', FALSE);