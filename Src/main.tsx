import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx' // Agar file ka naam app.tsx (chota 'a') hai

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

