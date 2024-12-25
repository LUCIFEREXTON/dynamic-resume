import { map } from 'lodash'
import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 3000) // Auto-remove after 3 seconds
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const withToast = (Component) => {
  const WrappedComponent = (props) => {
    const { addToast } = useToast()
    return <Component {...props} addToast={addToast} />
  }

  WrappedComponent.displayName = `withToast(${Component.displayName || Component.name || 'Component'})`
  return WrappedComponent
}

export const useToast = () => useContext(ToastContext)

const ToastContainer = ({ toasts }) => {
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
      {map(toasts, (toast) => (
        <div
          key={toast.id}
          style={{
            marginBottom: '10px',
            padding: '10px 20px',
            color: '#fff',
            background: getColor(toast.type),
            borderRadius: '5px',
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}

ToastContainer.propTypes = {
  toasts: PropTypes.array.isRequired,
}

const getColor = (type) => {
  switch (type) {
    case 'error':
      return 'red'
    case 'success':
      return 'green'
    case 'warning':
      return 'orange'
    default:
      return 'blue'
  }
}
