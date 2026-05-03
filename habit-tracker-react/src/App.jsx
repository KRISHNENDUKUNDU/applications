import React, { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [habitsData, setHabitsData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("October");
  const [selectedYear, setSelectedYear] = useState(2025);

  useEffect(() => {
    Promise.all([
      fetch("/data/dashboard.json").then((res) => res.json()),
      fetch("/data/habits.json").then((res) => res.json()),
    ])
      .then(([dashboard, habits]) => {
        setDashboardData(dashboard);
        setHabitsData(habits);
      })
      .catch((err) => console.error("Failed to load JSON:", err));
  }, []);

  if (!dashboardData || !habitsData) {
    return <div style={{ padding: 40 }}>Loading dashboard...</div>;
  }

  const getDaysInMonth = (month, year) => {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Header
          dashboardData={dashboardData}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />
        <div className="dashboard-grid">
          <div>
            <OverviewSection dashboardData={dashboardData} />
            <DailyHabitsTable habitsData={habitsData} />
          </div>
          <div className="right-sidebar">
            <MonthlyProgressCard dashboardData={dashboardData} />
            <TopHabitsCard habitsData={habitsData} />
            <ProgressStatsCard habitsData={habitsData} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">📊</span>
        <span>Habit Tracker</span>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-item active">
          <span className="nav-icon">📈</span>
          Dashboard
        </div>
        <div className="nav-item">
          <span className="nav-icon">📅</span>
          Calendar
        </div>
        <div className="nav-item">
          <span className="nav-icon">✓</span>
          Habits
        </div>
        <div className="nav-item">
          <span className="nav-icon">📊</span>
          Analytics
        </div>
        <div className="nav-item">
          <span className="nav-icon">⚙️</span>
          Settings
        </div>
      </nav>
    </div>
  );
}

function Header({
  dashboardData,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
}) {
  return (
    <div className="header">
      <div className="header-left">
        <h1>{dashboardData.title}</h1>
        <p>{dashboardData.subtitle}</p>
      </div>
      <div className="header-right">
        <select
          className="date-selector"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
        </select>
        <select
          className="date-selector"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function OverviewSection({ dashboardData }) {
  return (
    <div className="overview-section">
      <div className="section-title">Overview</div>

      <div className="weeks-container">
        {dashboardData.weeks.map((week) => (
          <div key={week.weekNumber} className="week-card">
            <div className="week-label">{week.label}</div>
            <div className="week-days">
              {week.weekNumber === 5 ? (
                <>
                  <div className="day-cell">1</div>
                  <div className="day-cell">2</div>
                  <div className="day-cell">3</div>
                </>
              ) : (
                Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="day-cell"
                    style={{
                      backgroundColor:
                        i < 7 ? "#f1f5f9" : "transparent",
                    }}
                  >
                    {i + 1}
                  </div>
                ))
              )}
            </div>
            <div className="week-stats">
              <span>{week.completed}/{week.total}</span>
            </div>
            <div className="week-progress-bar">
              <div
                className="week-progress-fill"
                style={{
                  width: `${week.progressPercentage}%`,
                  backgroundColor: week.color,
                }}
              />
            </div>
            <div className="week-percentage">{week.progressPercentage}%</div>
          </div>
        ))}
      </div>

      <div className="section-title" style={{ marginTop: 24 }}>
        Overview Chart
      </div>
      <div className="chart-container">
        {dashboardData.weeks.map((week) => {
          const maxHeight = 150;
          const height = (week.progressPercentage / 100) * maxHeight;
          return (
            <div key={week.weekNumber} className="chart-bar">
              <div
                className="bar"
                style={{
                  backgroundColor: week.color,
                  width: 30,
                  height: `${height}px`,
                }}
              />
              <div className="bar-label">Week {week.weekNumber}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonthlyProgressCard({ dashboardData }) {
  const { percentage, completed, goal, left } = dashboardData.monthlyProgress;

  return (
    <div className="card">
      <div className="section-title">Monthly Progress</div>
      <div className="progress-circle-container">
        <div className="progress-circle">
          <div className="progress-circle-inner">{percentage}%</div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
          {dashboardData.currentMonth} {dashboardData.currentYear}
        </div>

        <div className="progress-stats">
          <div className="stat">
            <div className="stat-value">{completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat">
            <div className="stat-value">{goal}</div>
            <div className="stat-label">Goal</div>
          </div>
          <div className="stat">
            <div className="stat-value">{left}</div>
            <div className="stat-label">Left</div>
          </div>
        </div>

        <div className="motivational">
          <div className="motivational-text">
            {dashboardData.motivationalText}
          </div>
          <div className="motivational-subtext">
            {dashboardData.motivationalSubtext}
          </div>
        </div>
      </div>
    </div>
  );
}

function TopHabitsCard({ habitsData }) {
  return (
    <div className="card">
      <div className="section-title">Top 10 Daily Habits</div>
      <ol className="top-habits-list">
        {habitsData.habits.map((habit) => (
          <li key={habit.id} className="habit-item">
            {habit.name}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProgressStatsCard({ habitsData }) {
  return (
    <div className="card">
      <div className="section-title">Progress</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {habitsData.habits.map((habit) => (
          <div key={habit.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              <span style={{ color: "#475569" }}>{habit.completedDays}</span>
              <span style={{ color: "#94a3b8" }}>{habit.leftDays}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  height: 8,
                  backgroundColor: "#e2e8f0",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${habit.progressPercentage}%`,
                    backgroundColor: "#34d399",
                  }}
                />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>
                {habit.progressPercentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DailyHabitsTable({ habitsData }) {
  const weeksOrder = ["week1", "week2", "week3", "week4", "week5"];
  const allDays = [];

  weeksOrder.forEach((week) => {
    habitsData.habits.forEach((habit) => {
      if (week === "week5" && habit.dailyStatus[week].length === 3) {
        allDays.push(
          ...Array.from({ length: 3 }).map((_, i) => ({
            day: 31 - 3 + i + 1,
            week,
            index: i,
          }))
        );
      } else if (week !== "week5") {
        allDays.push(
          ...Array.from({ length: 7 }).map((_, i) => ({
            day: i + 1,
            week,
            index: i,
          }))
        );
      }
    });
  });

  const allDaysInMonth = 31;
  const daysArray = Array.from({ length: allDaysInMonth }).map((_, i) => i + 1);

  return (
    <div className="daily-habits-section">
      <div className="section-title">Daily Habits</div>

      <div className="habits-table">
        <div style={{ overflowX: "auto" }}>
          {habitsData.habits.map((habit) => (
            <div key={habit.id}>
              <div className="habit-row" style={{ paddingTop: 16 }}>
                <div className="habit-name">{habit.name}</div>
                <div className="habit-days">
                  {Array.from({ length: 31 }).map((_, dayIndex) => {
                    let status = 0;
                    const weekNum =
                      dayIndex < 7
                        ? 0
                        : dayIndex < 14
                        ? 1
                        : dayIndex < 21
                        ? 2
                        : dayIndex < 28
                        ? 3
                        : 4;
                    const dayInWeek =
                      dayIndex < 7
                        ? dayIndex
                        : dayIndex < 14
                        ? dayIndex - 7
                        : dayIndex < 21
                        ? dayIndex - 14
                        : dayIndex < 28
                        ? dayIndex - 21
                        : dayIndex - 28;

                    const weekKeys = ["week1", "week2", "week3", "week4", "week5"];
                    if (
                      dayInWeek <
                      habit.dailyStatus[weekKeys[weekNum]].length
                    ) {
                      status = habit.dailyStatus[weekKeys[weekNum]][dayInWeek];
                    }

                    return (
                      <div
                        key={dayIndex}
                        className={`day-checkbox ${
                          status === 1 ? "completed" : "not-completed"
                        }`}
                      >
                        {status === 1 ? "✓" : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-box completed-legend" />
          <span>Completed</span>
        </div>
        <div className="legend-item">
          <div className="legend-box not-completed-legend" />
          <span>Not Completed</span>
        </div>
      </div>
    </div>
  );
}

export default App;
