# Personal Finance Tracker – Web Application Documentation

## 1. Overview

The Personal Finance Tracker is a web-based application that enables users to record, categorize, and analyze their day-to-day expenses and incomes on a monthly basis. The platform focuses on clarity, ease of use, and actionable insights through visual statistics (pie charts), while supporting multiple payment platforms and accounts.

The system is designed as a secure, user-centric application with authentication, profile management, and extensible financial categorization.

---

## 2. Objectives

* Enable users to track daily expenses and incomes efficiently.
* Provide clear monthly insights using charts and summaries.
* Support multiple payment methods and multiple accounts.
* Allow customizable expense categories with sensible defaults.
* Ensure a simple, intuitive UI suitable for non-technical users.
* Provide secure authentication and profile management.

---

## 3. Target Users

* Individuals tracking personal finances.
* Salaried professionals managing monthly budgets.
* Students or freelancers monitoring income vs expenses.

---

## 4. Core Features

### 4.1 Authentication & Authorization

* User Sign Up

  * Email + Password
  * Google OAuth Sign-Up
* User Login

  * Email + Password
  * Google OAuth Login
* Forgot Password

  * Email-based password reset
* Secure session handling

---

### 4.2 User Profile Management

* View Profile
* Upload / Update Profile Photo
* Update Personal Information

  * Mobile Number
  * Password Change
* Account Deletion (Permanent)

---

### 4.3 Expense Management

#### Add Expense (Mandatory Fields Enforced)

Each expense entry includes:

* Date (required)
* Expense Name / Title (required)
* Category (required)
* Amount (required)

  * Numeric input
  * Calculator-style input option
* Payment Platform (required)

  * Cash
  * Account
* Payment Account (required if platform = Account)
* Description / Notes (optional)

#### Expense Actions

* View expense list (date-wise / category-wise)
* Edit expense
* Delete expense

---

### 4.4 Income Management

* Add Income

  * Date
  * Source / Name
  * Amount
  * Account credited
  * Notes (optional)
* Edit Income
* Delete Income

---

### 4.5 Categories Management

#### Default Categories (Preloaded)

At least 5–6 default categories:

* Household
* Food
* Travel
* Shopping
* Grooming
* Utilities

#### Custom Categories

* Create new category
* Edit category name
* Delete category (with validation if used)

---

### 4.6 Payment Platforms & Accounts

#### Payment Platforms

* Cash
* Account

#### Account Management

* Add multiple accounts (e.g., Bank, Wallet, Credit Card)
* Account attributes:

  * Account Name
  * Type (Bank / Wallet / Card)
  * Optional balance tracking
* Select account while adding expense/income

---

### 4.7 Analytics & Reports

#### Monthly Dashboard

* Total Expenses (Monthly)
* Total Income (Monthly)
* Net Balance

#### Visual Reports

* Pie Chart: Expense distribution by category
* Optional future extensions:

  * Bar chart: Month-over-month comparison
  * Account-wise expense summary

---

## 5. UI / UX Structure (UI References)

### 5.1 Landing Page (Public)

* Header

  * Brand Logo
  * Login Button
  * Signup Button
* Main Section

  * Application overview
  * Key features highlights
  * Call-to-action (Get Started)
* Footer

  * Social Media Links
  * Privacy Policy
  * Terms & Conditions
  * Help / FAQ
  * Contact Us

---

### 5.2 Authentication Pages

* Login Page
* Signup Page
* Forgot Password Page

Design principles:

* Minimal form fields
* Clear error messages
* Responsive layout

---

### 5.3 User Dashboard (Post Login)

#### Header

* Brand Logo
* Navigation Menu

  * Dashboard
  * Expenses
  * Income
  * Categories
  * Accounts
  * Profile
* Logout Option

#### Main Dashboard Content

* Monthly Summary Cards
* Pie Chart (Category-wise Expenses)
* Recent Transactions List

---

### 5.4 Expense Form UI

* Date Picker
* Category Dropdown (mandatory)
* Expense Name Input
* Amount Input

  * Calculator popup instead of increment/decrement
* Payment Platform Selector
* Account Dropdown (conditional, mandatory)
* Notes Text Area
* Save / Cancel Buttons

---

### 5.5 Profile Page UI

* Profile Photo Upload
* Personal Information Form
* Change Password
* Delete Account Button (with confirmation)

---

## 6. Functional Requirements (Refined)

* Category and Payment Account are mandatory for expenses.
* Account selection is conditionally required based on payment platform.
* No expense can be saved without a valid amount.
* Default categories must exist on first login.
* Deleting an account or category must validate existing dependencies.
* Charts update dynamically based on selected month.

---

## 7. Non-Functional Requirements

* Responsive design (Desktop & Mobile)
* Secure authentication and password encryption
* Scalable architecture
* Clean and consistent UI
* Fast load times

---

## 8. Suggested Tech Stack (Optional Guidance)

### Frontend

* React (with TypeScript)
* State Management: Redux / Context API
* UI: Tailwind CSS / Material UI
* Charts: Chart.js / Recharts

### Backend

* Node.js + Express
* Authentication: JWT + Google OAuth

### Database

* MongoDB

---

## 9. Future Enhancements

* Budget limits and alerts
* Export data (PDF / CSV)
* Recurring expenses
* Dark mode
* Mobile app version

---

## 10. Conclusion

This documentation defines a clear, scalable foundation for building a personal finance tracking web application. The structure allows incremental enhancements while maintaining a clean user experience and strong data organization.
