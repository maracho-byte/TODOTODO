export const filterTasks = (tasks, filter, searchTerm) => {
  let filtered = tasks

  // Filter by status
  if (filter !== 'all') {
    filtered = filtered.filter(task => task.status === filter)
  }

  // Filter by search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term) ||
      (task.tags && task.tags.some(tag => tag.toLowerCase().includes(term)))
    )
  }

  return filtered
}

export const sortTasks = (tasks, sortBy) => {
  const sorted = [...tasks]

  switch (sortBy) {
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    
    case 'priority':
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
    
    case 'dueDate':
      return sorted.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      })
    
    case 'updated':
      return sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    
    case 'created':
    default:
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
}

export const getTaskStats = (tasks) => {
  return {
    total: tasks.length,
    todo: tasks.filter(task => task.status === 'todo').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length,
    overdue: tasks.filter(task => {
      if (!task.dueDate || task.status === 'completed') return false
      return new Date(task.dueDate) < new Date()
    }).length
  }
}

export const generateTaskId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export const isTaskOverdue = (task) => {
  if (!task.dueDate || task.status === 'completed') return false
  return new Date(task.dueDate) < new Date()
}

export const getTasksByStatus = (tasks, status) => {
  return tasks.filter(task => task.status === status)
}

export const getTasksByPriority = (tasks, priority) => {
  return tasks.filter(task => task.priority === priority)
}

export const searchTasks = (tasks, searchTerm) => {
  if (!searchTerm) return tasks
  
  const term = searchTerm.toLowerCase()
  return tasks.filter(task =>
    task.title.toLowerCase().includes(term) ||
    task.description.toLowerCase().includes(term) ||
    (task.tags && task.tags.some(tag => tag.toLowerCase().includes(term)))
  )
}
