import { isToday, isTomorrow, isPast, differenceInDays, format } from 'date-fns'

export const NOTIFICATION_TYPES = {
  OVERDUE: 'overdue',
  DUE_TODAY: 'due_today',
  DUE_TOMORROW: 'due_tomorrow',
  RECURRING_REMINDER: 'recurring_reminder'
}

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission === 'denied') {
    return false
  }

  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

export const showBrowserNotification = (title, options = {}) => {
  if (Notification.permission !== 'granted') {
    return null
  }

  const defaultOptions = {
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    requireInteraction: false,
    silent: false,
    ...options
  }

  return new Notification(title, defaultOptions)
}

export const getTaskNotifications = (tasks) => {
  const notifications = []
  const now = new Date()

  tasks.forEach(task => {
    if (!task.dueDate || task.status === 'completed') return

    const dueDate = new Date(task.dueDate)
    const daysDiff = differenceInDays(dueDate, now)

    // 지연된 업무
    if (isPast(dueDate)) {
      notifications.push({
        id: `overdue_${task.id}`,
        type: NOTIFICATION_TYPES.OVERDUE,
        taskId: task.id,
        title: task.title,
        message: `${Math.abs(daysDiff)}일 지연된 업무입니다`,
        priority: 'high',
        dueDate: task.dueDate,
        isRecurring: task.isRecurring || task.isRecurringInstance
      })
    }
    // 오늘 마감인 업무
    else if (isToday(dueDate)) {
      notifications.push({
        id: `today_${task.id}`,
        type: NOTIFICATION_TYPES.DUE_TODAY,
        taskId: task.id,
        title: task.title,
        message: '오늘 마감인 업무입니다',
        priority: 'medium',
        dueDate: task.dueDate,
        isRecurring: task.isRecurring || task.isRecurringInstance
      })
    }
    // 내일 마감인 업무
    else if (isTomorrow(dueDate)) {
      notifications.push({
        id: `tomorrow_${task.id}`,
        type: NOTIFICATION_TYPES.DUE_TOMORROW,
        taskId: task.id,
        title: task.title,
        message: '내일 마감인 업무입니다',
        priority: 'low',
        dueDate: task.dueDate,
        isRecurring: task.isRecurring || task.isRecurringInstance
      })
    }
  })

  return notifications.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })
}

export const formatNotificationTime = (dateString) => {
  const date = new Date(dateString)
  if (isToday(date)) return '오늘'
  if (isTomorrow(date)) return '내일'
  if (isPast(date)) return `${Math.abs(differenceInDays(date, new Date()))}일 전`
  return format(date, 'MM월 dd일')
}

export const getNotificationIcon = (type) => {
  switch (type) {
    case NOTIFICATION_TYPES.OVERDUE:
      return '⚠️'
    case NOTIFICATION_TYPES.DUE_TODAY:
      return '📅'
    case NOTIFICATION_TYPES.DUE_TOMORROW:
      return '⏰'
    case NOTIFICATION_TYPES.RECURRING_REMINDER:
      return '🔄'
    default:
      return '📋'
  }
}