import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthProvider';
import { SessionManager } from '../utils/sessionManager';

interface AcademicYearContextType {
  currentAcademicYear: string;
  setCurrentAcademicYear: (year: string) => void;
  availableYears: string[];
  addAcademicYear: (year: string) => void;
  isCurrentYear: (year: string) => boolean;
}

const AcademicYearContext = createContext<AcademicYearContextType | undefined>(undefined);

export const useAcademicYear = () => {
  const context = useContext(AcademicYearContext);
  if (context === undefined) {
    throw new Error('useAcademicYear must be used within an AcademicYearProvider');
  }
  return context;
};

interface AcademicYearProviderProps {
  children: React.ReactNode;
}

export const AcademicYearProvider: React.FC<AcademicYearProviderProps> = ({ children }) => {
  const { currentAcademicYear: authAcademicYear, isAuthenticated } = useAuth();
  const [currentAcademicYear, setCurrentAcademicYearState] = useState('2024-2025');
  const [availableYears, setAvailableYears] = useState(['2024-2025', '2023-2024', '2022-2023']);

  useEffect(() => {
    // Si l'utilisateur est authentifié et a une année scolaire active, l'utiliser
    if (isAuthenticated && authAcademicYear) {
      setCurrentAcademicYearState(authAcademicYear.name);
      return;
    }

    // Si pas d'authentification, utiliser l'année par défaut
    if (!isAuthenticated) {
      setCurrentAcademicYearState('2024-2025');
      setAvailableYears(['2024-2025']);
    }
  }, [isAuthenticated, authAcademicYear]);

  const setCurrentAcademicYear = (year: string) => {
    setCurrentAcademicYearState(year);
    
    // Sauvegarder dans les préférences utilisateur
    const preferences = SessionManager.getPreferences();
    SessionManager.setPreferences({
      ...preferences,
      currentAcademicYear: year
    });
  };

  const addAcademicYear = (year: string) => {
    if (!availableYears.includes(year)) {
      const newYears = [...availableYears, year].sort().reverse();
      setAvailableYears(newYears);
      
      // Sauvegarder dans les préférences
      const preferences = SessionManager.getPreferences();
      SessionManager.setPreferences({
        ...preferences,
        availableYears: newYears
      });
    }
  };

  const isCurrentYear = (year: string) => {
    return year === currentAcademicYear;
  };

  const value: AcademicYearContextType = {
    currentAcademicYear,
    setCurrentAcademicYear,
    availableYears,
    addAcademicYear,
    isCurrentYear
  };

  return (
    <AcademicYearContext.Provider value={value}>
      {children}
    </AcademicYearContext.Provider>
  );
};