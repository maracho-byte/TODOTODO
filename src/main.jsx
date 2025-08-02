import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
import { TaskProvider } from './contexts/TaskContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <NotificationProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
