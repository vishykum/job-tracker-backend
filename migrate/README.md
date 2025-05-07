# Job Application Tracker Database

This folder contains SQL scripts to set up and manage the MySQL database used in the Job Application Tracker web app.

---

## 📂 Files

### `schema.sql`
Creates the database schema with all necessary tables:
- `applications`
- `references`
- `application_references` (many-to-many relationship)
- `networking_logs`
- `skill_logs`

### `seed.sql`
Inserts sample/mock data for testing or development purposes.

### `views.sql`
Defines SQL views for efficient dashboard aggregation:
- `weekly_applications_summary`
- `weekly_learning_summary`
- `networking_activity_summary`

### `drop.sql`
Drops all tables in reverse dependency order. Useful for resetting your development database.

---

## 🛠 Usage

### 🧱 Set up the schema
```bash
mysql -u your_user -p your_db < schema.sql
