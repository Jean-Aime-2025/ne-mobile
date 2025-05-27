graph TD
  subgraph Mobile App
    UI[UI Layer (React Native Screens)]
    BL[Business Logic (Hooks, Context)]
    API[API Service (fetch, axios calls)]
  end

  MockAPI[MockAPI Server]

  UI --> BL --> API --> MockAPI


