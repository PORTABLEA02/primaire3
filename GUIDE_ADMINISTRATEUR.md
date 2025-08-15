# Guide Administrateur - Système de Gestion Scolaire

## 🔐 Configuration Initiale

### 1. Première Installation

#### Prérequis
- Projet Supabase configuré
- Variables d'environnement définies
- Base de données migrée

#### Étapes de Configuration

1. **Créer les Utilisateurs de Test**
   ```sql
   -- Dans Supabase Dashboard → Authentication → Users
   -- Créer les comptes avec les emails et mots de passe fournis
   ```

2. **Configurer l'École**
   - Se connecter avec le compte admin
   - Aller dans Paramètres → Informations de l'école
   - Remplir toutes les informations

3. **Définir l'Année Scolaire**
   - Paramètres → Année scolaire active
   - Configurer les trimestres
   - Définir les vacances

4. **Configurer les Finances**
   - Types de frais par niveau
   - Méthodes de paiement
   - Pourcentages de frais

### 2. Gestion des Utilisateurs

#### Création de Comptes

**Via Interface :**
1. Paramètres → Gestion des utilisateurs
2. Nouveau utilisateur
3. Définir rôle et permissions
4. Envoyer identifiants

**Via Supabase Dashboard :**
1. Authentication → Users → Add user
2. Définir email et mot de passe
3. Le profil sera créé automatiquement

#### Rôles et Permissions

**Admin :**
- Toutes les permissions
- Gestion multi-école
- Configuration système

**Directeur :**
- Gestion complète de son école
- Tous les modules sauf paramètres système
- Rapports et statistiques

**Secrétaire :**
- Gestion des élèves
- Gestion des classes
- Inscriptions et transferts

**Enseignant :**
- Saisie des notes
- Consultation des élèves de sa classe
- Emploi du temps

**Comptable :**
- Gestion financière complète
- Paiements et relances
- Rapports financiers

### 3. Configuration Académique

#### Niveaux Scolaires

**Standards Béninois :**
- Maternelle (3-5 ans) : 300,000 FCFA
- CI (6 ans) : 350,000 FCFA
- CP (7 ans) : 350,000 FCFA
- CE1 (8 ans) : 400,000 FCFA
- CE2 (9 ans) : 400,000 FCFA
- CM1 (10 ans) : 450,000 FCFA
- CM2 (11 ans) : 450,000 FCFA

#### Matières par Niveau

**Maternelle :**
- Éveil, Langage, Graphisme, Jeux éducatifs, Motricité

**CI-CP :**
- Français (Coef. 4), Mathématiques (Coef. 4)
- Éveil Scientifique (Coef. 2), Éducation Civique (Coef. 1), Dessin (Coef. 1)

**CE1-CE2 :**
- Français (Coef. 4), Mathématiques (Coef. 4)
- Histoire-Géographie (Coef. 2), Sciences (Coef. 2)
- Éducation Civique (Coef. 1), Dessin (Coef. 1)

**CM1-CM2 :**
- Français (Coef. 4), Mathématiques (Coef. 4)
- Histoire-Géographie (Coef. 2), Sciences (Coef. 2)
- Éducation Civique (Coef. 1), Anglais (Coef. 2), Dessin (Coef. 1)

## 🛠️ Administration Technique

### 1. Base de Données

#### Surveillance
- Vérifier les logs d'activité quotidiennement
- Surveiller les performances des requêtes
- Contrôler l'espace de stockage

#### Maintenance
- Sauvegardes automatiques configurées
- Nettoyage des anciens logs (90 jours)
- Optimisation des index

### 2. Sécurité

#### Monitoring
- Tentatives de connexion échouées
- Sessions suspectes
- Accès non autorisés

#### Politiques
- Mots de passe : 8 caractères minimum
- Sessions : 30 minutes d'inactivité
- Tentatives : 5 échecs = blocage temporaire

### 3. Sauvegardes

#### Automatiques
- **Fréquence** : Quotidienne à 23h30
- **Rétention** : 30 jours
- **Contenu** : Données complètes

#### Manuelles
- Avant mises à jour importantes
- Avant imports massifs
- Sur demande utilisateur

#### Restauration
- Sélection de la sauvegarde
- Restauration complète ou partielle
- Validation avant application

## 📊 Monitoring et Rapports

### 1. Tableau de Bord Admin

#### Métriques Clés
- Nombre d'utilisateurs actifs
- Nombre de connexions quotidiennes
- Volume de données stockées
- Performance système

#### Alertes
- Espace disque faible
- Erreurs système répétées
- Tentatives d'intrusion
- Sauvegardes échouées

### 2. Rapports d'Utilisation

#### Quotidiens
- Connexions par rôle
- Actions principales effectuées
- Erreurs rencontrées

#### Mensuels
- Évolution du nombre d'utilisateurs
- Modules les plus utilisés
- Performance globale

### 3. Audit et Conformité

#### Logs d'Audit
- Toutes les actions importantes
- Modifications de données sensibles
- Accès aux informations confidentielles

#### Conformité RGPD
- Consentement des parents
- Droit à l'oubli
- Portabilité des données

## 🚨 Gestion des Incidents

### 1. Procédures d'Urgence

#### Panne Système
1. Vérifier l'état de Supabase
2. Consulter les logs d'erreur
3. Redémarrer les services si nécessaire
4. Communiquer avec les utilisateurs

#### Perte de Données
1. Arrêter immédiatement le système
2. Identifier la cause
3. Restaurer depuis la dernière sauvegarde
4. Analyser l'impact

#### Sécurité Compromise
1. Changer tous les mots de passe admin
2. Révoquer les sessions actives
3. Analyser les logs d'accès
4. Renforcer la sécurité

### 2. Escalade

#### Niveau 1 : Support Local
- Problèmes utilisateur courants
- Questions de formation
- Erreurs de saisie

#### Niveau 2 : Support Technique
- Problèmes système
- Erreurs de configuration
- Performance dégradée

#### Niveau 3 : Support Développeur
- Bugs logiciels
- Problèmes de base de données
- Nouvelles fonctionnalités

## 📋 Checklist de Maintenance

### Quotidienne
- [ ] Vérifier les sauvegardes
- [ ] Consulter les logs d'erreur
- [ ] Surveiller les connexions
- [ ] Vérifier les alertes système

### Hebdomadaire
- [ ] Analyser les performances
- [ ] Nettoyer les logs anciens
- [ ] Vérifier l'espace disque
- [ ] Tester les sauvegardes

### Mensuelle
- [ ] Rapport d'utilisation
- [ ] Mise à jour des permissions
- [ ] Audit de sécurité
- [ ] Formation utilisateurs

### Trimestrielle
- [ ] Archivage des données
- [ ] Mise à jour système
- [ ] Révision des procédures
- [ ] Évaluation des performances

---

*Guide Administrateur - Version 1.0*
*Système de Gestion Scolaire pour le Bénin*