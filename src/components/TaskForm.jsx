import React, { useState, useEffect } from 'react'
import { Plus, X, Save } from 'lucide-react'
import { useTask } from '../contexts/TaskContext'

const TaskForm = () => {
  const { addTask, updateTask, editingTask, setEditingTask } = useTask()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    tags: ''
  })

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'medium',
        dueDate: editingTask.dueDate || '',
        tags: editingTask.tags ? editingTask.tags.join(', ') : ''
      })
      setIsOpen(true)
    }
  }, [editingTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    const taskData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    if (editingTask) {
      updateTask(editingTask.id, taskData)
      setEditingTask(null)
    } else {
      addTask(taskData)
    }

    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      tags: ''
    })
    setIsOpen(false)
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      tags: ''
    })
    setIsOpen(false)
    setEditingTask(null)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (!isOpen) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => setIsOpen(true)}
        style={{ marginBottom: '2rem' }}
      >
        <Plus size={16} />
        Add New Task
      </button>
    )
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="work, urgent, personal"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          <X size={16} />
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <Save size={16} />
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
