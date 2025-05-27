# Personal Finance Tracker - Design

## Data Flow Diagram (Context)

```mermaid
flowchart TD
  User -->|Login, Create/View/Delete Expense| MobileApp
  MobileApp -->|Fetch/Send Data| MockAPI[MockAPI Server]
  MockAPI -->|Users Data| MobileApp
  MockAPI -->|Expenses Data| MobileApp


