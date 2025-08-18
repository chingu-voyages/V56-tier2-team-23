# 🏥 Surgery Status Board — MVP

_A React/next.js‑based dashboard for tracking surgical patient information and progress._

---

## 🚀 Overview

Surgery Status Board is a frontend-only application built with **React**, **Zustand**, **Next.js** and **MongoDB**, aimed at medical facilities managing surgical patients. It supports:

- ✅ Admin and Doctor access control
- ✅ Patient creation and management
- ✅ Real‑time search and lookup
- ✅ Live status updates and workflow charts
- ✅ Exportable summaries (planned in next sprint)
- ✅ Fully client‑side with Zustand as the source of truth

> 🎯 **Note:** User Story 7 (multi‑patient export by date/month/year) is pending implementation in the next MVP iteration.

---

## 🧱 Tech Stack

| Feature                  | Technology Stack                    |
|--------------------------|-------------------------------------|
| **Frontend Framework**   | Next.js (React)                     |
| **State Management**     | Zustand                             |
| **Routing**              | Next.js `useRouter`, client‑only auth|
| **Icons**                | `react-icons`                       |
| **Forms & Validation**   | `react-hook-form`                   |
| **UI Utility**           | Tailwind CSS                        |
| **Date Parsing**         | `date-fns` (prepping for exports)   |
| **Database**             | MongoDB                             |

---

## 🎯 User Flows & Features

### 1. Authentication Guard  
- All protected pages are wrapped in `<ProtectedRoute>` to ensure only authenticated users see them.
- Based on admin or doctor roles to control access.

### 2. Add New Patient  
- Admins can add patient information via a form.
- Data is stored in Zustand and surfaces immediately.

### 3. Patient Search (Live)  
- Real-time searching of patients by last name using debounced input.
- Works responsive for both desktop and mobile screens.

### 4. Patient Status Workflow  
- Doctors can locate a patient and submit status updates.
- UI displays workflow of current statuses, and shows relevant forms.

---


---

Our Team:
- Member Name: Tushar Parihar / Role: Product Maneger [GitHub](https://github.com/Tush-R)
- Member Name: Tibam Gisele  / Role: Scrum Master  [GitHub](https://github.com/Gisele-1)
- Member Name: Jyotirmoy Das / Role: Scrum Master  [GitHub](https://github.com/jdx-code)
- Member Name: Ahamada / Role: Web Developer [GitHub](https://github.com/Ahmad-nba)
- Member Name: Shubham Nagare / Role: Web Developer [GitHub](https://github.com/Shubhambn)
- Member Name: Tibamwenda / Role: Web Developer [GitHub](https://github.com/AskTiba)

## ⚙️ Installation & Setup

```bash
git clone <repo-url>
cd surgery-status-board
npm install
npm run dev

checkout functionality:
Admin Email : xyz@gmail.com
Admin Pass : admin123

---

## 📌 Next Steps & Roadmap
User Story 7: Export patient data by date/month/year (PDF, Excel, Word)

Add role-based dashboard (e.g. admin vs doctor views)

Improve styling and responsiveness (mobile-first)

Add notification/toast system for feedback

Add unit tests and type-check coverage

🧪 MVP Status Summary
Feature	Status
Auth guard with client-side auth checks	✅ Done
Add patient form and validation	✅ Done
Search patient live by last name	✅ Done
Doctor status update workflow	✅ Done
Export feature (multi‑patient + filters)	❌ Coming Up

🤝 Contribute
Contributions are welcome! Please submit a PR or open issues for improvements or bug fixes.

Thank you for using the Surgery Status Board MVP! Let’s build the next features together. 💪

yaml
Copy
Edit


