import React from 'react'
import { Search } from 'lucide-react'
import { useTask } from '../contexts/TaskContext'

const FilterBar = () => {
  const { filter, searchTerm, sortBy, setFilter, setSearchTerm, setSortBy } = useTask()

  return (
    <div className="filter-bar">
      <div className="search-input" style={{ position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: '40px' }}
        />
      </div>

      <select
        className="filter-select"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All Tasks</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        className="filter-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="created">Sort by Created</option>
        <option value="updated">Sort by Updated</option>
        <option value="priority">Sort by Priority</option>
        <option value="dueDate">Sort by Due Date</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>
  )
}

export default FilterBar
