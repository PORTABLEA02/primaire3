import React, { createContext, useContext } from 'react';
import { useConfirmation } from '../hooks/useConfirmation';
import ConfirmationModal from '../components/Common/ConfirmationModal';
import NotificationModal from '../components/Common/NotificationModal';

interface ConfirmationContextType {
  confirm: (options: {
    title: string;
    message: string;
    type?: 'warning' | 'danger' | 'success' | 'info';
    confirmText?: string;
    cancelText?: string;
  }) => Promise<boolean>;
  
  confirmAsync: (
    options: {
      title: string;
      message: string;
      type?: 'warning' | 'danger' | 'success' | 'info';
      confirmText?: string;
      cancelText?: string;
    },
    asyncAction: () => Promise<void>
  ) => Promise<boolean>;
  
  notify: (options: {
    title: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    autoClose?: boolean;
    autoCloseDelay?: number;
  }) => void;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

export const useConfirmationContext = () => {
  const context = useContext(ConfirmationContext);
  if (context === undefined) {
    throw new Error('useConfirmationContext must be used within a ConfirmationProvider');
  }
  return context;
};

interface ConfirmationProviderProps {
  children: React.ReactNode;
}

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({ children }) => {
  const {
    confirm,
    confirmAsync,
    confirmationState,
    closeConfirmation,
    notify,
    notificationState,
    closeNotification
  } = useConfirmation();

  const value: ConfirmationContextType = {
    confirm,
    confirmAsync,
    notify
  };

  return (
    <ConfirmationContext.Provider value={value}>
      {children}
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationState.isOpen}
        onClose={closeConfirmation}
        onConfirm={confirmationState.onConfirm}
        title={confirmationState.options.title}
        message={confirmationState.options.message}
        type={confirmationState.options.type}
        confirmText={confirmationState.options.confirmText}
        cancelText={confirmationState.options.cancelText}
        loading={confirmationState.loading}
      />

      {/* Notification Modal */}
      <NotificationModal
        isOpen={notificationState.isOpen}
        onClose={closeNotification}
        title={notificationState.options.title}
        message={notificationState.options.message}
        type={notificationState.options.type}
        autoClose={notificationState.options.autoClose}
        autoCloseDelay={notificationState.options.autoCloseDelay}
      />
    </ConfirmationContext.Provider>
  );
};