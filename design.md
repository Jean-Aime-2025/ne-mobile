# Personal Finance Tracker - Design

## Data Flow Diagram (Context)

```mermaid
flowchart TD
  User --> LoginScreen
  LoginScreen -->|GET /users?username=email| AuthService
  AuthService --> MockAPI

  User --> DashboardScreen
  DashboardScreen -->|GET /expenses| ExpenseService
  ExpenseService --> MockAPI

  User --> AddExpenseScreen
  AddExpenseScreen -->|POST /expenses| ExpenseService
  ExpenseService --> MockAPI

  User --> ExpenseDetailScreen
  ExpenseDetailScreen -->|GET /expenses/:id| ExpenseService
  ExpenseService --> MockAPI

  User --> ExpenseListScreen
  ExpenseListScreen -->|DELETE /expenses/:id| ExpenseService
  ExpenseService --> MockAPI
