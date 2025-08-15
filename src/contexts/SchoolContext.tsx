import React, { createContext, useContext, useState, useEffect } from 'react';
import { School } from '../types/School';
import { useAuth } from '../components/Auth/AuthProvider';
import { SessionManager } from '../utils/sessionManager';

interface SchoolContextType {
  currentSchool: School | null;
  schools: School[];
  setCurrentSchool: (school: School) => void;
  addSchool: (school: School) => void;
  updateSchool: (schoolId: string, updates: Partial<School>) => void;
  deleteSchool: (schoolId: string) => void;
  isLoading: boolean;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};

interface SchoolProviderProps {
  children: React.ReactNode;
}

export const SchoolProvider: React.FC<SchoolProviderProps> = ({ children }) => {
  const { userSchool, isAuthenticated } = useAuth();
  const [currentSchool, setCurrentSchoolState] = useState<School | null>(null);
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Si l'utilisateur est authentifié et a une école, l'utiliser
    if (isAuthenticated && userSchool) {
      setCurrentSchoolState(userSchool);
      setSchools([userSchool]);
      setIsLoading(false);
      return;
    }

    // Si pas d'authentification, réinitialiser
    setCurrentSchoolState(null);
    setSchools([]);
    setIsLoading(false);
  }, [isAuthenticated, userSchool]);

  const setCurrentSchool = (school: School) => {
    setCurrentSchoolState(school);
    
    // Sauvegarder dans les préférences utilisateur
    const preferences = SessionManager.getPreferences();
    SessionManager.setPreferences({
      ...preferences,
      currentSchoolId: school.id
    });
  };

  const addSchool = (school: School) => {
    const newSchools = [...schools, school];
    setSchools(newSchools);
  };

  const updateSchool = (schoolId: string, updates: Partial<School>) => {
    const updatedSchools = schools.map(school =>
      school.id === schoolId ? { ...school, ...updates } : school
    );
    setSchools(updatedSchools);
    
    // Mettre à jour l'école courante si c'est celle qui est modifiée
    if (currentSchool?.id === schoolId) {
      const updatedCurrentSchool = { ...currentSchool, ...updates };
      setCurrentSchoolState(updatedCurrentSchool);
    }
  };

  const deleteSchool = (schoolId: string) => {
    const filteredSchools = schools.filter(school => school.id !== schoolId);
    setSchools(filteredSchools);
    
    // Si l'école supprimée était l'école courante, sélectionner la première disponible
    if (currentSchool?.id === schoolId && filteredSchools.length > 0) {
      setCurrentSchool(filteredSchools[0]);
    }
  };

  const value: SchoolContextType = {
    currentSchool,
    schools,
    setCurrentSchool,
    addSchool,
    updateSchool,
    deleteSchool,
    isLoading
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
};