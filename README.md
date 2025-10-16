# 🚗 FixTraq — Fleet Maintenance Tracker

FixTraq is a **smart vehicle maintenance management system** built with **Spring Boot**.  
It helps companies efficiently manage their fleet, track maintenance schedules, predict failures before they occur, and generate automated reports.

---

## 🧠 Key Features

### 🚘 Fleet Management
- Manage vehicles with details like model, plate number, mileage, last maintenance date, and fuel consumption.
- Assign drivers and link them with specific vehicles.

### 🛠️ Maintenance Tracking
- Schedule periodic maintenance tasks.
- Record breakdowns, repair history, and spare parts used.
- Generate work orders for technicians automatically.

### 📊 Reporting System
- Generate **monthly maintenance reports** in PDF format.
- Send reports automatically to managers via email (using CRON jobs).
- Visual dashboard for tracking fleet health and maintenance costs (optional frontend).

### 🤖 Predictive Maintenance (AI)
- Analyze vehicle data to **predict potential failures**.
- Uses rule-based analytics on mileage, last maintenance, and fuel efficiency.
- Future-ready for ML model integration.

### 💌 Notifications
- Automatic email alerts when a vehicle shows **high risk of failure**.
- Optional integration with mobile notifications (Firebase).

### 🔐 Authentication & Security
- JWT-based authentication for secure REST APIs.
- Role-based access control (Admin / Driver / Maintenance Staff).

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend Framework** | Spring Boot 3 |
| **Language** | Java 17 |
| **Database** | PostgreSQL |
| **Security** | Spring Security (JWT) |
| **Documentation** | Swagger / OpenAPI |
| **Email & Scheduler** | Spring Mail + Scheduler (CRON) |
| **Build Tool** | Maven |
| **Deployment** | Railway / Render / AWS (Optional) |

---
