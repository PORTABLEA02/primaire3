# Système de Gestion Scolaire pour le Bénin

## Architecture Production - Système Multi-École avec Supabase

### Vue d'Ensemble

Le système de gestion scolaire est conçu pour les établissements d'enseignement primaire au Bénin. Il utilise une architecture moderne avec :

- **Base de données Supabase** avec Row Level Security (RLS)
- **Authentification sécurisée** avec gestion de session
- **Architecture multi-école** avec isolation des données
- **Système d'enseignant unique** conforme au système éducatif béninois

### Fonctionnalités Principales

#### 1. Gestion des Élèves
- Inscription avec informations complètes
- Suivi des paiements en temps réel
- Transfert entre classes
- Historique académique et financier

#### 2. Gestion des Enseignants
- Système d'enseignant unique par classe
- Affectation automatique
- Suivi des performances
- Gestion des absences

#### 3. Gestion Financière
- Enregistrement des paiements
- Suivi des impayés
- Méthodes de paiement multiples (Espèces, Mobile Money, Banque)
- Rapports financiers détaillés

#### 4. Gestion Académique
- Saisie des notes par matière
- Calcul automatique des moyennes
- Génération de bulletins
- Classements et statistiques

#### 5. Emploi du Temps
- Planification par classe
- Gestion des salles
- Détection des conflits
- Vue enseignant et classe

### Architecture Technique

#### Base de Données
- **Supabase PostgreSQL** avec RLS activé
- **Isolation par école** - chaque utilisateur ne voit que les données de son école
- **Audit trail complet** - toutes les actions sont loggées
- **Triggers automatiques** pour la cohérence des données

#### Authentification et Sécurité
- **Supabase Auth** avec email/mot de passe
- **Sessions persistantes** avec choix local/session storage
- **Gestion automatique des tokens** avec refresh
- **Détection d'inactivité** avec avertissement utilisateur
- **Permissions granulaires** par rôle

#### Frontend
- **React 18** avec TypeScript
- **Tailwind CSS** pour le design
- **Architecture modulaire** avec services séparés
- **Gestion d'état** avec Context API
- **Responsive design** mobile-first

### Configuration Requise

#### Variables d'Environnement
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Base de Données Supabase
1. Créer un projet Supabase
2. Exécuter les migrations dans l'ordre :
   - `20250812094920_shiny_snow.sql` (Tables principales)
   - `20250812095018_purple_bush.sql` (Politiques RLS)
   - `20250812095048_late_delta.sql` (Triggers et fonctions)
   - `20250812112946_restless_voice.sql` (Vues et fonctions utilitaires)
   - `20250813145538_fragrant_cloud.sql` (Corrections vues)
   - `20250814185457_soft_crystal.sql` (Corrections grade_details)

#### Authentification
1. Activer l'authentification email/password dans Supabase
2. Désactiver la confirmation d'email pour simplifier
3. Créer les premiers utilisateurs via le dashboard Supabase

### Déploiement

#### 1. Configuration Supabase
- Configurer les variables d'environnement
- Exécuter les migrations de base de données
- Configurer les politiques RLS
- Créer les premiers utilisateurs administrateurs

#### 2. Première École
- Se connecter avec un compte administrateur
- Configurer les informations de l'école
- Définir les types de frais par niveau
- Configurer les méthodes de paiement
- Créer les premières classes et enseignants

#### 3. Import Initial
- Utiliser les modèles Excel pour importer :
  - Les enseignants avec leurs qualifications
  - Les élèves avec leurs inscriptions
  - Les matières par niveau
- Vérifier la cohérence des données importées

### Sécurité et Maintenance

#### Sécurité
- **RLS activé** sur toutes les tables
- **Audit trail** complet des actions
- **Sessions sécurisées** avec expiration automatique
- **Permissions granulaires** par rôle utilisateur
- **Validation côté serveur** via triggers

#### Maintenance
- **Logs automatiques** de toutes les actions importantes
- **Monitoring des performances** via les vues optimisées
- **Sauvegarde automatique** des données critiques
- **Nettoyage automatique** des anciens logs

### Support et Documentation

#### Guides Utilisateur
- Guide d'administration pour les directeurs
- Guide de saisie pour les secrétaires
- Guide pédagogique pour les enseignants
- Guide financier pour les comptables

#### Support Technique
- Logs détaillés pour le debugging
- Monitoring en temps réel des performances
- Alertes automatiques en cas de problème
- Documentation technique complète

Ce système est prêt pour la production et peut gérer plusieurs écoles avec des milliers d'élèves tout en maintenant des performances optimales et une sécurité maximale.