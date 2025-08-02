# Task Management Application

This project was created using `Arkain Snap`.

## Environment and Technology Stack

| Environment       | Version       |
|-------------------|---------------|
| Operating System  | Ubuntu 22.04  |
| Node.js           | 20.18.3       |
| npm               | 10.8.2        |

| Technology        | Description                                   |
|-------------------|-----------------------------------------------|
| React 18          | Frontend library for building UI with hooks  |
| Vite              | Fast build tool and development server       |
| @dnd-kit          | Drag-and-drop functionality                    |
| date-fns          | Date utility functions                         |
| Lucide React      | Icon library                                  |

## How the Project Was Created

- Initialized a React project with Vite as the bundler.
- Set up context providers for task state and theme management.
- Developed components for task creation, editing, filtering, and display.
- Integrated drag-and-drop functionality for task reordering.
- Implemented local storage persistence for tasks and theme preferences.
- Added responsive design with dark/light theme toggle.
- Configured utility functions and global styles.
- Defined project dependencies and scripts in `package.json`.

## How to Run the Project

1. Clone the repository and navigate to the project directory.
2. Install dependencies by running:
   bash
   npm install
   ```
3. Start the development server with:
   ```bash
   npm run dev
   ```
4. Open your browser and go to the URL shown in the terminal (usually `http://localhost:3000`).

### Potential Errors and Solutions

- **Error:** `npm: command not found`  
  **Solution:** Ensure Node.js and npm are installed correctly. You can install Node.js from [nodejs.org](https://nodejs.org/) or use your OS package manager.

- **Error:** Port 3000 already in use  
  **Solution:** Either stop the process using port 3000 or configure Vite to use a different port in `vite.config.js`.

- **Error:** Missing dependencies or failed install  
  **Solution:** Delete `node_modules` and `package-lock.json` then run `npm install` again.

## Navigation Instruction (Translated)

From the top menu, navigate to  
`Container -> Execution URL and Port -> Registered URL and Port -> Click the shortcut button on the selected row.`

## Directory Structure

```
.
├── index.html
├── package.json
├── vite.config.js
└── src
    ├── App.css
    ├── App.jsx
    ├── components
    │   ├── FilterBar.jsx
    │   ├── Header.jsx
    │   ├── TaskForm.jsx
    │   ├── TaskItem.jsx
    │   ├── TaskList.jsx
    │   └── TaskStats.jsx
    ├── contexts
    │   ├── TaskContext.jsx
    │   └── ThemeContext.jsx
    ├── hooks
    │   └── useLocalStorage.js
    ├── main.jsx
    └── utils
        └── taskUtils.js
```
```