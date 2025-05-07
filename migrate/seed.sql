-- seed.sql

INSERT INTO applications (company, position, status, date_applied, job_url, notes, tags)
VALUES
('Google', 'Software Engineer', 'applied', '2025-04-20', 'https://careers.google.com', 'Referred by a friend', 'backend, cloud'),
('Spotify', 'Backend Developer', 'interview', '2025-04-25', 'https://spotifyjobs.com', 'Recruiter reached out via LinkedIn', 'nodejs, music');

INSERT INTO `references` (name, role, company, contact_info, notes)
VALUES
('Alice Johnson', 'Engineering Manager', 'Google', 'alice.johnson@google.com', 'Willing to provide a referral'),
('Bob Smith', 'Senior Dev', 'Spotify', 'bob.smith@spotify.com', 'Had a coffee chat last week');

INSERT INTO application_references (application_id, reference_id)
VALUES
(1, 1),
(2, 2);

INSERT INTO networking_logs (contact_name, company, type, contact_date, notes, related_application_id)
VALUES
('Eve Lee', 'Google', 'linkedin', '2025-04-18', 'Sent a connection request with message', 1),
('Tom Yu', 'Spotify', 'email', '2025-04-23', 'Asked about team culture and upcoming roles', 2);

INSERT INTO skill_logs (date, category, duration_minutes, topics, notes)
VALUES
('2025-05-01', 'dsa', 60, 'Arrays, Binary Search', 'Solved 3 Leetcode problems'),
('2025-05-02', 'system_design', 90, 'REST APIs, Load Balancing', 'Watched Tech Dummies videos');
