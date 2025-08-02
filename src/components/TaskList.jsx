import React, { useMemo } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import TaskItem from './TaskItem'
import { useTask } from '../contexts/TaskContext'
import { filterTasks, sortTasks } from '../utils/taskUtils'

const TaskList = () => {
  const { tasks, filter, searchTerm, sortBy, reorderTasks } = useTask()
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = filterTasks(tasks, filter, searchTerm)
    return sortTasks(filtered, sortBy)
  }, [tasks, filter, searchTerm, sortBy])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = filteredAndSortedTasks.findIndex(task => task.id === active.id)
      const newIndex = filteredAndSortedTasks.findIndex(task => task.id === over.id)
      
      const newTasks = arrayMove(filteredAndSortedTasks, oldIndex, newIndex)
      reorderTasks(newTasks)
    }
  }

  if (filteredAndSortedTasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks found</h3>
        <p>
          {searchTerm 
            ? `No tasks match "${searchTerm}"`
            : filter === 'all' 
              ? 'Create your first task to get started'
              : `No ${filter.replace('-', ' ')} tasks`
          }
        </p>
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredAndSortedTasks.map(task => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="task-list">
          {filteredAndSortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default TaskList
