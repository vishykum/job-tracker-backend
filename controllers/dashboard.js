const pool = require("../db");
const logger = require("../utils/logger");

// Utility to get current date ranges
const getDateBoundaries = () => {
  const today = new Date();
  const oneDayAgo = new Date(today);
  const oneWeekAgo = new Date(today);
  const oneMonthAgo = new Date(today);
  oneDayAgo.setDate(today.getDate() - 1);
  oneWeekAgo.setDate(today.getDate() - 7);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return {
    day: oneDayAgo.toISOString().slice(0, 10),
    week: oneWeekAgo.toISOString().slice(0, 10),
    month: oneMonthAgo.toISOString().slice(0, 10),
    today: today.toISOString().slice(0, 10),
  };
};

exports.getDashboardSummary = async (req, res) => {
  logger.info("GET /api/dashboard/summary - Aggregating dashboard stats");

  try {
    const { day, week, month } = getDateBoundaries();

    // --- Applications ---
    const [[{ total_apps }]] = await pool.query("SELECT COUNT(*) as total_apps FROM applications");
    const [[{ daily_apps }]] = await pool.query("SELECT COUNT(*) as daily_apps FROM applications WHERE date_applied >= ?", [day]);
    const [[{ weekly_apps }]] = await pool.query("SELECT COUNT(*) as weekly_apps FROM applications WHERE date_applied >= ?", [week]);
    const [[{ monthly_apps }]] = await pool.query("SELECT COUNT(*) as monthly_apps FROM applications WHERE date_applied >= ?", [month]);

    // --- Networking ---
    const [[{ total_contacts }]] = await pool.query("SELECT COUNT(*) as total_contacts FROM networking_logs");
    const [[{ daily_contacts }]] = await pool.query("SELECT COUNT(*) as daily_contacts FROM networking_logs WHERE contact_date >= ?", [day]);
    const [[{ weekly_contacts }]] = await pool.query("SELECT COUNT(*) as weekly_contacts FROM networking_logs WHERE contact_date >= ?", [week]);
    const [[{ monthly_contacts }]] = await pool.query("SELECT COUNT(*) as monthly_contacts FROM networking_logs WHERE contact_date >= ?", [month]);

    // Skills
    const [[{ total_skills }]] = await pool.query("SELECT COUNT(*) AS total_skills FROM skill_logs WHERE category = 'leetcode'");
    const [[{ daily_skills }]] = await pool.query("SELECT COUNT(*) AS daily_skills FROM skill_logs WHERE date >= ? AND category = 'leetcode'", [day]);
    const [[{ weekly_skills }]] = await pool.query("SELECT COUNT(*) AS weekly_skills FROM skill_logs WHERE date >= ? AND category = 'leetcode'", [week]);
    const [[{ monthly_skills }]] = await pool.query("SELECT COUNT(*) AS monthly_skills FROM skill_logs WHERE date >= ? AND category = 'leetcode'", [month]);


    res.json([
      {
        section: "applications",
        total: total_apps,
        daily: daily_apps,
        weekly: weekly_apps,
        monthly: monthly_apps,
      },
      {
        section: "networking",
        total: total_contacts,
        daily: daily_contacts,
        weekly: weekly_contacts,
        monthly: monthly_contacts,
      },
      {
        section: "leetcode",
        total: total_skills,
        daily: daily_skills,
        weekly: weekly_skills,
        monthly: monthly_skills,
      }
    ]);
  } catch (err) {
    logger.error(`Error fetching dashboard summary: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
