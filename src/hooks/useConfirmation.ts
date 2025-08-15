import { useState, useCallback } from 'react';

interface ConfirmationOptions {
  title: string;
  message: string;
  type?: 'warning' | 'danger' | 'success' | 'info';
  confirmText?: string;
  cancelText?: string;
}

interface NotificationOptions {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const useConfirmation = () => {
  const [confirmationState, setConfirmationState] = useState<{
    isOpen: boolean;
    options: ConfirmationOptions;
    onConfirm: () => void;
    loading: boolean;
  }>({
    isOpen: false,
    options: { title: '', message: '' },
    onConfirm: () => {},
    loading: false
  });

  const [notificationState, setNotificationState] = useState<{
    isOpen: boolean;
    options: NotificationOptions;
  }>({
    isOpen: false,
    options: { title: '', message: '' }
  });

  const confirm = useCallback((options: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmationState({
        isOpen: true,
        options,
        onConfirm: () => {
          setConfirmationState(prev => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        loading: false
      });
    });
  }, []);

  const confirmAsync = useCallback((
    options: ConfirmationOptions,
    asyncAction: () => Promise<void>
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmationState({
        isOpen: true,
        options,
        onConfirm: async () => {
          setConfirmationState(prev => ({ ...prev, loading: true }));
          try {
            await asyncAction();
            setConfirmationState(prev => ({ ...prev, isOpen: false, loading: false }));
            resolve(true);
          } catch (error) {
            setConfirmationState(prev => ({ ...prev, loading: false }));
            resolve(false);
          }
        },
        loading: false
      });
    });
  }, []);

  const notify = useCallback((options: NotificationOptions) => {
    setNotificationState({
      isOpen: true,
      options
    });
  }, []);

  const closeConfirmation = useCallback(() => {
    setConfirmationState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const closeNotification = useCallback(() => {
    setNotificationState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    // Confirmation
    confirm,
    confirmAsync,
    confirmationState,
    closeConfirmation,
    
    // Notification
    notify,
    notificationState,
    closeNotification
  };
};