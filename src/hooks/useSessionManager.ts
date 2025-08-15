import { useEffect, useCallback } from 'react';
import { useAuth } from '../components/Auth/AuthProvider';
import { SessionManager } from '../utils/sessionManager';
import { ActivityLogService } from '../services/activityLogService';

export const useSessionManager = () => {
  const { refreshSession, logout, isAuthenticated, user, userSchool } = useAuth();

  // Vérifier périodiquement la validité de la session
  const checkSessionValidity = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const isValid = await SessionManager.isSessionValid();
      
      if (!isValid) {
        console.log('Aucune session active trouvée');
        
        // Logger la perte de session
        if (userSchool && user) {
          await ActivityLogService.logActivity({
            schoolId: userSchool.id,
            userId: user.id,
            action: 'SESSION_LOST',
            entityType: 'auth',
            level: 'warning',
            details: 'Session perdue, déconnexion automatique'
          });
        }
        
        await logout();
        return;
      }

      // Vérifier si le token expire bientôt
      const timeUntilExpiry = SessionManager.getTimeUntilExpiry();
      if (timeUntilExpiry !== null && timeUntilExpiry < 300) {
        console.log('Token expire bientôt, rafraîchissement...');
        
        const refreshSuccess = await refreshSession();
        
        if (!refreshSuccess) {
          console.log('Échec du rafraîchissement, déconnexion...');
          await logout();
        } else {
          console.log('Session rafraîchie avec succès');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de session:', error);
    }
  }, [isAuthenticated, refreshSession, logout, user, userSchool]);

  // Vérifier la session toutes les 2 minutes
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(checkSessionValidity, 2 * 60 * 1000);
    
    // Vérification initiale
    checkSessionValidity();

    return () => clearInterval(interval);
  }, [isAuthenticated, checkSessionValidity]);

  // Gérer la visibilité de la page (rafraîchir quand l'utilisateur revient)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated) {
        console.log('Page redevient visible, vérification de session...');
        SessionManager.updateActivity();
        checkSessionValidity();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isAuthenticated, checkSessionValidity]);

  // Gérer la reconnexion réseau
  useEffect(() => {
    const handleOnline = () => {
      if (isAuthenticated) {
        console.log('Connexion réseau rétablie, vérification de session...');
        SessionManager.updateActivity();
        checkSessionValidity();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [isAuthenticated, checkSessionValidity]);

  // Gérer la fermeture de l'onglet/fenêtre
  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      if (isAuthenticated && userSchool && user) {
        // Logger la fermeture de session (best effort)
        try {
          await ActivityLogService.logActivity({
            schoolId: userSchool.id,
            userId: user.id,
            action: 'SESSION_CLOSED',
            entityType: 'auth',
            level: 'info',
            details: 'Fermeture de l\'application'
          });
        } catch (error) {
          // Ignorer les erreurs de logging à la fermeture
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isAuthenticated, user, userSchool]);
  return {
    checkSessionValidity,
    refreshSession
  };
};