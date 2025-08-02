import React, { useState } from 'react'
import { Settings, Bell, BellOff, Volume2, VolumeX, X } from 'lucide-react'
import { useNotification } from '../contexts/NotificationContext'

const NotificationSettings = ({ isOpen, onClose }) => {
  const { settings, updateSettings, enableBrowserNotifications } = useNotification()
  const [isEnabling, setIsEnabling] = useState(false)

  const handleBrowserNotificationToggle = async () => {
    if (!settings.browserNotifications) {
      setIsEnabling(true)
      const granted = await enableBrowserNotifications()
      setIsEnabling(false)
      
      if (!granted) {
        alert('브라우저 알림이 차단되었습니다. 브라우저 설정에서 알림을 허용해주세요.')
      }
    } else {
      updateSettings({ browserNotifications: false })
    }
  }

  const handleSettingChange = (key, value) => {
    updateSettings({ [key]: value })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content notification-settings" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <Settings size={20} />
            알림 설정
          </h2>
          <button className="btn btn-secondary" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="settings-section">
          <h3>알림 방식</h3>
          
          <div className="setting-item">
            <div className="setting-info">
              <label>브라우저 알림</label>
              <p>중요한 알림을 브라우저 알림으로 받습니다</p>
            </div>
            <button
              className={`toggle-btn ${settings.browserNotifications ? 'active' : ''}`}
              onClick={handleBrowserNotificationToggle}
              disabled={isEnabling}
            >
              {isEnabling ? '설정 중...' : settings.browserNotifications ? <Bell size={16} /> : <BellOff size={16} />}
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>앱 내 알림</label>
              <p>앱 내에서 알림을 표시합니다</p>
            </div>
            <button
              className={`toggle-btn ${settings.inAppNotifications ? 'active' : ''}`}
              onClick={() => handleSettingChange('inAppNotifications', !settings.inAppNotifications)}
            >
              {settings.inAppNotifications ? <Bell size={16} /> : <BellOff size={16} />}
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>알림 사운드</label>
              <p>알림 시 소리를 재생합니다</p>
            </div>
            <button
              className={`toggle-btn ${settings.notificationSound ? 'active' : ''}`}
              onClick={() => handleSettingChange('notificationSound', !settings.notificationSound)}
            >
              {settings.notificationSound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>알림 유형</h3>
          
          <div className="setting-item">
            <div className="setting-info">
              <label>지연된 업무</label>
              <p>마감일이 지난 업무에 대한 알림</p>
            </div>
            <input
              type="checkbox"
              checked={settings.overdueReminders}
              onChange={(e) => handleSettingChange('overdueReminders', e.target.checked)}
            />
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>오늘 마감 업무</label>
              <p>오늘 마감인 업무에 대한 알림</p>
            </div>
            <input
              type="checkbox"
              checked={settings.dueTodayReminders}
              onChange={(e) => handleSettingChange('dueTodayReminders', e.target.checked)}
            />
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>내일 마감 업무</label>
              <p>내일 마감인 업무에 대한 알림</p>
            </div>
            <input
              type="checkbox"
              checked={settings.dueTomorrowReminders}
              onChange={(e) => handleSettingChange('dueTomorrowReminders', e.target.checked)}
            />
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>반복 업무 알림</label>
              <p>반복 업무에 대한 특별 알림</p>
            </div>
            <input
              type="checkbox"
              checked={settings.recurringReminders}
              onChange={(e) => handleSettingChange('recurringReminders', e.target.checked)}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>알림 주기</h3>
          
          <div className="setting-item">
            <div className="setting-info">
              <label>알림 간격</label>
              <p>동일한 알림의 반복 간격 (분)</p>
            </div>
            <select
              value={settings.reminderInterval}
              onChange={(e) => handleSettingChange('reminderInterval', parseInt(e.target.value))}
            >
              <option value={15}>15분</option>
              <option value={30}>30분</option>
              <option value={60}>1시간</option>
              <option value={120}>2시간</option>
              <option value={240}>4시간</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationSettings