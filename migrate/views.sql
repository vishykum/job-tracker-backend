-- views.sql

CREATE OR REPLACE VIEW weekly_applications_summary AS
SELECT 
  YEARWEEK(created_at, 1) AS year_week,
  COUNT(*) AS applications_count
FROM applications
GROUP BY year_week
ORDER BY year_week DESC;

CREATE OR REPLACE VIEW weekly_learning_summary AS
SELECT 
  YEARWEEK(date, 1) AS year_week,
  category,
  SUM(duration_minutes) AS total_minutes
FROM skill_logs
GROUP BY year_week, category
ORDER BY year_week DESC;

CREATE OR REPLACE VIEW networking_activity_summary AS
SELECT 
  YEARWEEK(contact_date, 1) AS year_week,
  type,
  COUNT(*) AS count
FROM networking_logs
GROUP BY year_week, type
ORDER BY year_week DESC;
