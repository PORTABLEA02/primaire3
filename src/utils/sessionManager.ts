import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

export class SessionManager {
  private static readonly SESSION_KEY = 'ecoletech_session';
  private static readonly ACTIVITY_KEY = 'ecoletech_last_activity';
  private static readonly ROUTE_KEY = 'ecoletech_current_route';
  private static readonly PREFERENCES_KEY = 'ecoletech_preferences';

  // Initialiser le gestionnaire de session
  static initialize() {
    // Nettoyer les anciennes clés de session si elles existent
    this.cleanupLegacyKeys();
    
    // Enregistrer l'activité initiale
    this.updateActivity();
  }

  // Sauvegarder une session
  static setSession(session: Session, persistence: 'local' | 'session' = 'local') {
    const sessionData = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at,
      user_id: session.user.id,
      user_email: session.user.email,
      created_at: Date.now(),
      persistence_type: persistence
    };

    const storage = persistence === 'local' ? localStorage : sessionStorage;
    storage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    
    // Mettre à jour l'activité
    this.updateActivity();
  }

  // Récupérer une session stockée
  static getStoredSession(): any | null {
    try {
      // Vérifier d'abord localStorage, puis sessionStorage
      let sessionData = localStorage.getItem(this.SESSION_KEY);
      let storage = localStorage;
      
      if (!sessionData) {
        sessionData = sessionStorage.getItem(this.SESSION_KEY);
        storage = sessionStorage;
      }

      if (!sessionData) return null;

      const parsed = JSON.parse(sessionData);
      
      // Vérifier si la session n'est pas expirée
      if (parsed.expires_at && parsed.expires_at * 1000 < Date.now()) {
        storage.removeItem(this.SESSION_KEY);
        return null;
      }

      return parsed;
    } catch (error) {
      console.error('Erreur lors de la récupération de session:', error);
      return null;
    }
  }

  // Mettre à jour une session existante
  static updateSession(session: Session) {
    const existingSession = this.getStoredSession();
    if (!existingSession) return;

    const updatedSessionData = {
      ...existingSession,
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at,
      updated_at: Date.now()
    };

    const storage = existingSession.persistence_type === 'local' ? localStorage : sessionStorage;
    storage.setItem(this.SESSION_KEY, JSON.stringify(updatedSessionData));
  }

  // Nettoyer la session
  static clearSession() {
    localStorage.removeItem(this.SESSION_KEY);
    sessionStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.ACTIVITY_KEY);
    localStorage.removeItem(this.ROUTE_KEY);
    
    // Garder les préférences utilisateur
    // localStorage.removeItem(this.PREFERENCES_KEY);
  }

  // Vérifier si une session est valide
  static async isSessionValid(): Promise<boolean> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Erreur lors de la vérification de session:', error);
        return false;
      }

      if (!session) {
        this.clearSession();
        return false;
      }

      // Vérifier l'expiration
      if (session.expires_at && session.expires_at * 1000 < Date.now()) {
        this.clearSession();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur lors de la validation de session:', error);
      return false;
    }
  }

  // Obtenir le temps restant avant expiration
  static getTimeUntilExpiry(): number | null {
    const session = this.getStoredSession();
    if (!session?.expires_at) return null;

    const now = Math.floor(Date.now() / 1000);
    return Math.max(0, session.expires_at - now);
  }

  // Mettre à jour l'activité utilisateur
  static updateActivity() {
    localStorage.setItem(this.ACTIVITY_KEY, Date.now().toString());
  }

  // Obtenir la dernière activité
  static getLastActivity(): Date | null {
    const activity = localStorage.getItem(this.ACTIVITY_KEY);
    return activity ? new Date(parseInt(activity)) : null;
  }

  // Sauvegarder la route actuelle
  static setCurrentRoute(route: string) {
    localStorage.setItem(this.ROUTE_KEY, route);
  }

  // Récupérer la route actuelle
  static getCurrentRoute(): string | null {
    return localStorage.getItem(this.ROUTE_KEY);
  }

  // Sauvegarder les préférences utilisateur
  static setPreferences(preferences: Record<string, any>) {
    localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(preferences));
  }

  // Récupérer les préférences utilisateur
  static getPreferences(): Record<string, any> {
    try {
      const prefs = localStorage.getItem(this.PREFERENCES_KEY);
      return prefs ? JSON.parse(prefs) : {};
    } catch (error) {
      return {};
    }
  }

  // Obtenir les informations de session pour le debugging
  static getSessionInfo() {
    const session = this.getStoredSession();
    const lastActivity = this.getLastActivity();
    const timeUntilExpiry = this.getTimeUntilExpiry();

    return {
      hasSession: !!session,
      userId: session?.user_id,
      userEmail: session?.user_email,
      persistenceType: session?.persistence_type,
      createdAt: session?.created_at ? new Date(session.created_at) : null,
      lastActivity,
      timeUntilExpiry,
      isExpired: timeUntilExpiry !== null && timeUntilExpiry <= 0,
      needsRefresh: timeUntilExpiry !== null && timeUntilExpiry < 300 // Moins de 5 minutes
    };
  }

  // Nettoyer les anciennes clés de session (migration)
  private static cleanupLegacyKeys() {
    const legacyKeys = [
      'ecoletech_session_start',
      'ecoletech_page_views',
      'ecoletech_actions_count',
      'ecoletech_current_academic_year',
      'ecoletech_available_years',
      'ecoletech_schools',
      'ecoletech_current_school'
    ];

    legacyKeys.forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Forcer l'expiration de la session
  static expireSession() {
    this.clearSession();
    // Forcer la déconnexion Supabase
    supabase.auth.signOut();
  }

  // Vérifier l'inactivité
  static checkInactivity(maxInactivityMinutes: number = 30): boolean {
    const lastActivity = this.getLastActivity();
    if (!lastActivity) return false;

    const now = new Date();
    const diffInMinutes = (now.getTime() - lastActivity.getTime()) / (1000 * 60);
    
    return diffInMinutes >= maxInactivityMinutes;
  }

  // Étendre la session (mise à jour de l'activité)
  static extendSession() {
    this.updateActivity();
  }
}