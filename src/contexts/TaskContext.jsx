import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TaskContext = createContext()

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload
      }
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      }
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }
    case 'REORDER_TASKS':
      return {
        ...state,
        tasks: action.payload
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.payload
      }
    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload
      }
    case 'SET_EDITING_TASK':
      return {
        ...state,
        editingTask: action.payload
      }
    default:
      return state
  }
}

const initialState = {
  tasks: [],
  filter: 'all',
  searchTerm: '',
  sortBy: 'created',
  editingTask: null
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState)
  const [storedTasks, setStoredTasks] = useLocalStorage('tasks', [])

  useEffect(() => {
    dispatch({ type: 'SET_TASKS', payload: storedTasks })
  }, [storedTasks])

  useEffect(() => {
    setStoredTasks(state.tasks)
  }, [state.tasks, setStoredTasks])

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: 'todo',
      dueDate: taskData.dueDate,
      tags: taskData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    dispatch({ type: 'ADD_TASK', payload: newTask })
  }

  const updateTask = (taskId, updates) => {
    const task = state.tasks.find(t => t.id === taskId)
    if (task) {
      const updatedTask = {
        ...task,
        ...updates,
        updatedAt: new Date().toISOString()
      }
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask })
    }
  }

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId })
  }

  const reorderTasks = (newTasks) => {
    dispatch({ type: 'REORDER_TASKS', payload: newTasks })
  }

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter })
  }

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH', payload: term })
  }

  const setSortBy = (sortBy) => {
    dispatch({ type: 'SET_SORT', payload: sortBy })
  }

  const setEditingTask = (task) => {
    dispatch({ type: 'SET_EDITING_TASK', payload: task })
  }

  const value = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,
    setFilter,
    setSearchTerm,
    setSortBy,
    setEditingTask
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}
