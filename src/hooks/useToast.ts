import { useState } from 'react'

export const useToast = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const show = (message: string, type: 'success' | 'error') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
  }

  const hide = () => {
    setShowToast(false)
  }

  return {
    showToast,
    toastMessage,
    toastType,
    show,
    hide,
  }
}
