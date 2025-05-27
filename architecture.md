# Personal Finance Tracker - Design

## Architecture Diagram (Context)

```mermaid
graph TD
  subgraph Mobile App
    UI[UI Layer (Screens: Login, Dashboard, Expense List, Add Expense, Details)]
    BL[Business Logic (State Mgmt, Validation, Context API)]
    API[API Service Layer (axios/fetch to MockAPI)]
    Storage[Local Storage / AsyncStorage]
    Notification[Notification Service (for budget alerts)]
  end

  MockAPI[MockAPI Server (MockAPI.io)]

  UI --> BL
  BL --> API
  BL --> Storage
  BL --> Notification
  API --> MockAPI
