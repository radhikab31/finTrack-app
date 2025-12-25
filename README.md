# finTrack-app
Personal Finance Tracker 💰

A web-based application to help users track daily expenses and incomes, manage multiple payment accounts, categorize spending, and visualize monthly financial insights through charts.

📌 Overview

The Personal Finance Tracker enables users to record, organize, and analyze their financial activities on a monthly basis. Users can add expenses and incomes, categorize them, track payments across multiple accounts, and view category-wise expense analytics using pie charts.

The application focuses on:

Simplicity

Accuracy

Clear financial insights

Secure authentication

🎯 Features
🔐 Authentication

Sign up using Email & Password

Login using Email & Password

Google OAuth login/signup

Forgot password (email-based reset)

Secure session handling

👤 User Profile

Upload/update profile photo

Update personal details

Change password

Delete account permanently

💸 Expense Management

Add, edit, and delete expenses

Mandatory fields:

Date

Category

Amount

Payment platform

Fields supported:

Expense name

Description (optional)

Calculator-style amount input (instead of increment/decrement buttons)

Conditional account selection (mandatory if payment platform is Account)

💰 Income Management

Add, edit, and delete income records

Track income source and credited account

Monthly income summaries

🗂 Expense Categories
Default Categories (preloaded)

Household

Food

Travel

Shopping

Grooming

Utilities

Custom Categories

Create, edit, and delete categories

Validation to prevent deleting categories in use

🏦 Payment Platforms & Accounts

Payment platforms:

Cash

Account

Multiple account support:

Bank accounts

Wallets

Cards

Track which account was used for each transaction

📊 Analytics & Dashboard

Monthly summary:

Total expenses

Total income

Net balance

Pie chart visualization:

Category-wise expense breakdown

Recent transactions list

🖥 UI Structure
Public Pages

Landing page with:

Header (Logo, Login, Signup)

Application overview

Feature highlights

Footer (Social links, Policies, Terms, Help, Contact)

Auth Pages

Login

Signup

Forgot Password

User Dashboard

Monthly financial overview

Expense analytics (Pie chart)

Navigation:

Dashboard

Expenses

Income

Categories

Accounts

Profile

Logout

⚙ Functional Requirements

Category and payment method are mandatory for expenses

Account selection is mandatory if payment platform is Account

Default categories are auto-created on first login

Expenses and incomes can be edited or deleted

Charts update dynamically based on selected month

🚀 Tech Stack (Suggested)
Frontend

React (TypeScript)

Tailwind CSS / Material UI

Chart.js / Recharts

Backend

Node.js

Express.js

JWT Authentication

Google OAuth

Database

MongoDB

📈 Future Enhancements

Monthly budget limits and alerts

Recurring expenses

Export data (CSV / PDF)

Dark mode

Mobile application

📄 License

This project is licensed under the MIT License.
