# Product Trial Service Application Portal

A modern, responsive web application built with **Next.js 14+** designed for streamlining product trial requests. This system features a sleek UI for users to submit applications, which are then automatically synchronized to a **Google Sheets** database for administrative review.

## 🌟 Key Features

* **Responsive UI/UX**: A clean, professional interface mimicking enterprise-grade service portals, featuring a geometric gradient header.
* **Dynamic Form Validation**: Built-in validation for required fields such as Product Selection, Contact Info, and Application Scenarios.
* **Custom Select Menus**: Pre-configured options for **IoTSuite** and **iEMS** product lines, along with specific industrial application scenarios.
* **Serverless Backend**: Utilizes Next.js API Routes to securely forward data to external APIs, keeping environment variables protected.
* **Google Sheets Integration**: Instant data logging via Google Apps Script for real-time tracking of BDM/PM approval status.
* **Interactive Feedback**: Enhanced user experience with submission confirmation dialogs and success modals.

---

## 🛠️ Technical Stack

* **Framework**: Next.js 14 (App Router)
* **Styling**: Tailwind CSS
* **Language**: TypeScript
* **Backend**: Node.js API Routes
* **Database**: Google Sheets API (via Google Apps Script)

---

## 🚀 Quick Start

### 1. Installation
```bash
git clone <your-repository-url>
cd product-trial-portal
npm install
```
### 2. Environment Setup
Create a `.env.local` file in the root directory and add your Google Apps Script URL:
```bash
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```
### 3. Development Mode
```bash
npm run dev
```
Open http://localhost:3000 to view the application.

---

## 📂 Project Structure
```bash
/app/api/submit/route.ts   The backend logic that handles the POST request and forwards it to Google Sheets.
/app/page.tsx              The main application page containing the form UI and state management.
/lib/options.ts            Centralized configuration for product lists and scenario options.
```
---

## 📊 Data Mapping (Google Sheets)

The application automatically maps the following fields to your spreadsheet columns:

| Column | Header Name    | Data Field              |
|------|---------------|-------------------------|
| A    | Timestamp     | Submission Date & Time  |
| B    | Product       | data.product            |
| C    | Scenario      | data.scenario           |
| D    | Company       | data.company            |
| E    | Contact Name  | data.contactName        |
| F    | Contact Email | data.contactEmail       |
| G    | BDM Contact   | data.bdm                |
| H    | Sales Contact | data.sales              |
| I    | Comments      | data.comments           |

---

## 📝 Future Roadmap

- [ ] Email Automation: Automatically notify the assigned BDM when a new request is submitted.
- [ ] File Upload: Allow users to attach requirement specifications or architectural diagrams.
- [ ] Admin Dashboard: A protected view to update the status of trials directly within the web app.


