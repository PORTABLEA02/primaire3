# Manuel d'Utilisation - Système de Gestion Scolaire pour le Bénin

## Table des Matières

1. [Introduction](#introduction)
2. [Première Connexion](#première-connexion)
3. [Interface Générale](#interface-générale)
4. [Tableau de Bord](#tableau-de-bord)
5. [Gestion des Élèves](#gestion-des-élèves)
6. [Gestion des Classes](#gestion-des-classes)
7. [Gestion Financière](#gestion-financière)
8. [Gestion Académique](#gestion-académique)
9. [Gestion des Enseignants](#gestion-des-enseignants)
10. [Emploi du Temps](#emploi-du-temps)
11. [Import en Masse](#import-en-masse)
12. [Paramètres](#paramètres)
13. [Dépannage](#dépannage)
14. [FAQ](#faq)

---

## Introduction

### À Propos du Système

Le Système de Gestion Scolaire pour le Bénin est une application web moderne conçue spécifiquement pour les établissements d'enseignement primaire béninois. Il respecte le système éducatif national et intègre les spécificités locales.

### Caractéristiques Principales

- **Architecture Multi-École** : Gestion centralisée de plusieurs établissements
- **Système d'Enseignant Unique** : Conforme au système éducatif béninois
- **Gestion Financière Intégrée** : Suivi des paiements en FCFA avec Mobile Money
- **Sécurité Avancée** : Authentification sécurisée et permissions granulaires
- **Interface Responsive** : Accessible sur ordinateur, tablette et mobile

### Rôles Utilisateur

- **Admin** : Accès complet multi-école
- **Directeur** : Gestion complète de son école
- **Secrétaire** : Gestion des élèves et inscriptions
- **Enseignant** : Saisie des notes et consultation
- **Comptable** : Gestion financière et paiements

---

## Première Connexion

### Accès à l'Application

1. **Ouvrir l'application** dans votre navigateur web
2. **Page de connexion** s'affiche automatiquement
3. **Saisir vos identifiants** fournis par l'administrateur

### Identifiants de Démonstration

Pour tester l'application, utilisez ces comptes :

**Administrateur :**
- Email : `admin@ecoletech.edu`
- Mot de passe : `password123`

**Directeur :**
- Email : `directeur@ecoletech.edu`
- Mot de passe : `password123`

**Secrétaire :**
- Email : `secretaire@ecoletech.edu`
- Mot de passe : `password123`

**Comptable :**
- Email : `comptable@ecoletech.edu`
- Mot de passe : `password123`

### Options de Connexion

- **Se souvenir de moi** : Maintient la session active
- **Mot de passe oublié** : Récupération par email (en développement)

### Sécurité de Session

- **Timeout automatique** : 30 minutes d'inactivité
- **Avertissement** : 5 minutes avant déconnexion
- **Sessions multiples** : Jusqu'à 3 sessions simultanées

---

## Interface Générale

### Structure de l'Interface

L'application utilise une interface moderne avec :

1. **Barre latérale** : Navigation principale (rétractable)
2. **En-tête** : Informations utilisateur et contrôles
3. **Zone principale** : Contenu de la page active
4. **Indicateurs** : Statut de session et notifications

### Navigation

#### Menu Principal (Barre Latérale)

- **Tableau de Bord** : Vue d'ensemble
- **Élèves** : Gestion des inscriptions
- **Classes & Niveaux** : Configuration des classes
- **Gestion Financière** : Paiements et comptabilité
- **Académique** : Notes et bulletins
- **Enseignants** : Personnel enseignant
- **Emploi du Temps** : Planification des cours
- **Import Excel** : Importation en masse
- **Paramètres** : Configuration système

#### En-tête

- **Sélecteur d'école** : Changer d'établissement (Admin)
- **Année scolaire** : Sélection de l'année active
- **Indicateur de session** : Statut de connexion
- **Notifications** : Alertes système
- **Menu utilisateur** : Profil et déconnexion

### Responsive Design

L'interface s'adapte automatiquement :

- **Desktop** : Interface complète avec barre latérale
- **Tablette** : Barre latérale rétractable
- **Mobile** : Menu hamburger et interface optimisée

---

## Tableau de Bord

### Vue d'Ensemble

Le tableau de bord offre une vue synthétique de l'école :

#### Cartes Statistiques

1. **Élèves Inscrits** : Nombre total avec évolution
2. **Classes Actives** : Nombre de classes configurées
3. **Revenus Totaux** : Montant collecté en FCFA
4. **Paiements en Retard** : Nombre d'élèves concernés

#### Sections Principales

1. **Répartition Académique** : Élèves par niveau
2. **Activités Récentes** : Journal des dernières actions
3. **Actions Rapides** : Raccourcis vers les fonctions courantes
4. **Statistiques d'Import** : Suivi des importations

### Actualisation des Données

- **Bouton Actualiser** : Mise à jour manuelle
- **Auto-refresh** : Toutes les 5 minutes
- **Temps réel** : Certaines données se mettent à jour automatiquement

---

## Gestion des Élèves

### Vue d'Ensemble

La section élèves permet de gérer toutes les inscriptions et informations des élèves.

### Fonctionnalités Principales

#### 1. Liste des Élèves

**Affichage :**
- Nom complet et informations de base
- Classe et niveau
- Contacts parents (téléphone, email)
- Situation financière avec barre de progression
- Statut d'inscription (Actif/Inactif)

**Filtres Disponibles :**
- **Recherche** : Par nom, parent, téléphone, email
- **Classe** : Filtrer par classe spécifique
- **Statut de paiement** : À jour, En retard, Partiel
- **Statut d'inscription** : Actif/Inactif

#### 2. Ajouter un Nouvel Élève

**Étapes d'inscription :**

1. **Informations Personnelles**
   - Prénom et nom (obligatoires)
   - Sexe : Masculin/Féminin
   - Date de naissance (validation d'âge automatique)
   - Nationalité (par défaut : Béninoise)
   - Lieu de naissance

2. **Informations Familiales**
   - **Père** : Nom, téléphone, profession
   - **Mère** : Nom, téléphone, profession
   - **Email principal** : Contact privilégié (obligatoire)
   - **Adresse complète** : Domicile familial

3. **Contact d'Urgence**
   - Nom du contact
   - Numéro de téléphone
   - Relation avec l'élève

4. **Inscription Scolaire**
   - **Classe** : Sélection parmi les classes disponibles
   - **Validation automatique** : Âge approprié pour le niveau
   - **Calcul des frais** : Automatique selon le niveau

5. **Paiement Initial (Optionnel)**
   - Type : Inscription ou Scolarité
   - Montant en FCFA
   - Méthode : Espèces, Mobile Money, Virement
   - Référence de transaction

**Validations Automatiques :**
- Âge approprié pour le niveau sélectionné
- Format email valide
- Au moins un contact parent obligatoire
- Unicité de l'email dans l'école

#### 3. Gestion Individuelle

**Actions Disponibles :**

- **👁️ Voir Détails** : Profil complet de l'élève
- **✏️ Modifier** : Mise à jour des informations
- **🖨️ Facture** : Impression de la facture des paiements
- **↗️ Transférer** : Changement de classe
- **❌ Retirer** : Désactivation de l'inscription

**Profil Détaillé :**

*Onglet Informations :*
- Données personnelles complètes
- Contacts famille avec possibilité de modification
- Informations scolaires (classe, enseignant, année)
- Situation financière détaillée

*Onglet Académique :*
- Moyenne générale et rang en classe
- Notes par matière avec graphiques
- Taux d'assiduité
- Historique des bulletins

*Onglet Financier :*
- Résumé des frais et paiements
- Historique détaillé des transactions
- Méthodes de paiement utilisées
- Échéancier des paiements

*Onglet Historique :*
- Parcours scolaire dans l'établissement
- Transferts de classe
- Modifications importantes

#### 4. Transfert d'Élève

**Processus :**

1. **Sélection de la nouvelle classe**
   - Classes disponibles avec places libres
   - Vérification de l'âge approprié
   - Enseignant assigné affiché

2. **Raison du transfert**
   - Champ libre pour justification
   - Archivage automatique

3. **Confirmation**
   - Récapitulatif du transfert
   - Actions automatiques listées
   - Validation finale

**Actions Automatiques :**
- Désactivation de l'inscription actuelle
- Création de la nouvelle inscription
- Conservation des paiements effectués
- Mise à jour des effectifs
- Notification aux enseignants

#### 5. Export et Rapports

**Formats d'Export :**
- **CSV** : Compatible Excel
- **Données incluses** : Toutes les informations élèves
- **Filtres appliqués** : Seuls les élèves filtrés sont exportés

---

## Gestion des Classes

### Principe du Système d'Enseignant Unique

Le système respecte le modèle éducatif béninois où **un seul enseignant par classe** assure l'enseignement de toutes les matières du programme.

### Fonctionnalités

#### 1. Vue d'Ensemble des Classes

**Affichage par Niveau :**
- Statistiques par niveau (Maternelle, CI, CP, CE1, CE2, CM1, CM2)
- Nombre de classes et d'élèves par niveau
- Codes couleur pour identification rapide

**Tableau des Classes :**
- Nom de la classe et niveau
- Enseignant titulaire unique
- Effectif actuel / Capacité maximum
- Taux de remplissage avec indicateur visuel
- Actions disponibles

#### 2. Créer une Nouvelle Classe

**Informations Requises :**

1. **Nom de la classe** : Ex: CM2A, CE1B
2. **Niveau** : Sélection parmi les niveaux standards
3. **Capacité** : Entre 10 et 60 élèves
4. **Enseignant** : Sélection parmi les disponibles
5. **Salaire** : Rémunération mensuelle en FCFA

**Matières Automatiques :**
- Attribution automatique selon le niveau
- Conforme au programme officiel béninois
- Modifiable après création

**Validation :**
- Nom unique dans l'école
- Enseignant disponible (pas déjà assigné)
- Capacité raisonnable

#### 3. Gestion des Affectations

**Principe :**
- Un enseignant = Une classe maximum
- Responsabilité de toutes les matières
- Salaire défini par affectation

**Interface d'Affectation :**

*Enseignants Disponibles :*
- Liste des enseignants sans classe
- Qualifications et spécialisations
- Note de performance
- Recommandations automatiques

*Classes sans Enseignant :*
- Classes nécessitant une affectation
- Nombre d'élèves et matières
- Niveau et capacité

*Système de Recommandation :*
- Compatibilité enseignant/niveau
- Spécialisations pertinentes
- Expérience appropriée

#### 4. Changement d'Enseignant

**Processus :**

1. **Sélection du nouvel enseignant**
   - Enseignants disponibles uniquement
   - Évaluation de compatibilité
   - Raisons de recommandation

2. **Aperçu du changement**
   - Ancien vs nouvel enseignant
   - Impact sur les élèves
   - Actions automatiques

3. **Confirmation et exécution**
   - Transfert de l'emploi du temps
   - Notification aux parents
   - Mise à jour des documents

#### 5. Emploi du Temps de Classe

**Fonctionnalités :**
- Visualisation hebdomadaire
- Répartition par matière
- Gestion des salles
- Détection des conflits

**Actions :**
- Ajouter/Supprimer des cours
- Modifier les horaires
- Changer de salle
- Export PDF

---

## Gestion Financière

### Vue d'Ensemble

Module complet pour la gestion des finances de l'école avec support des méthodes de paiement locales.

### Fonctionnalités

#### 1. Tableau de Bord Financier

**Cartes Statistiques :**
- **Revenus Totaux** : Montant collecté en FCFA
- **Montant des Impayés** : Somme due par les familles
- **Taux de Collecte** : Pourcentage avec barre de progression
- **Paiements Récents** : Nombre des dernières 24h

#### 2. Enregistrement de Paiement

**Processus en 3 Étapes :**

*Étape 1 - Sélection de l'Élève :*
- Recherche par nom ou classe
- Affichage de la situation financière
- Montant dû clairement visible
- Progression des paiements

*Étape 2 - Détails du Paiement :*
- **Type de paiement** :
  - Inscription (frais d'entrée)
  - Scolarité (frais mensuels/trimestriels)
  - Cantine, Transport, Fournitures
  - Autre (avec description libre)

- **Montant** : Saisie en FCFA avec validation
- **Date** : Par défaut aujourd'hui, modifiable
- **Méthode de paiement** :
  - **Espèces** : Paiement direct
  - **Mobile Money** : MTN, Moov (numéro requis)
  - **Virement Bancaire** : Référence requise

- **Informations complémentaires** :
  - Numéro de référence
  - Notes libres

*Étape 3 - Confirmation :*
- Récapitulatif complet
- Vérification des données
- Validation finale

#### 3. Suivi des Paiements

**Paiements Récents :**
- Liste des derniers paiements
- Détails : élève, montant, méthode, date
- Statut : Confirmé, En attente, Échoué
- Filtrage et recherche

**Tous les Paiements :**
- Historique complet
- Filtres avancés :
  - Période (aujourd'hui, semaine, mois)
  - Statut de paiement
  - Type de paiement
  - Méthode utilisée
- Export CSV pour comptabilité
- Recherche multi-critères

#### 4. Gestion des Impayés

**Tableau des Impayés :**
- Élèves avec montants dus
- Priorité selon montant et ancienneté
- Contacts parents directs
- Actions de relance

**Niveaux d'Urgence :**
- **🔴 Urgent** : >200,000 FCFA ou >60 jours
- **🟡 Prioritaire** : >100,000 FCFA ou >30 jours
- **🟢 Normal** : Autres cas

**Actions de Relance :**
- **Appel téléphonique** : Lien direct vers l'app téléphone
- **Email automatique** : Modèle de rappel pré-rempli
- **SMS** : Notification courte (si configuré)

#### 5. Méthodes de Paiement

**Espèces :**
- Paiement direct sans frais
- Reçu manuel ou automatique
- Comptage de caisse

**Mobile Money :**
- MTN Mobile Money
- Moov Money
- Frais de transaction configurables
- Numéro de téléphone obligatoire
- Référence de transaction

**Virement Bancaire :**
- Banques locales
- RIB ou numéro de compte
- Délai de traitement
- Frais bancaires

#### 6. Rapports Financiers

**Statistiques :**
- Répartition par méthode de paiement
- Évolution mensuelle des revenus
- Impayés par niveau scolaire
- Taux de collecte par classe

**Export :**
- Rapports PDF formatés
- Données Excel pour analyse
- Graphiques et tendances

---

## Gestion Académique

### Système de Notes

#### 1. Saisie des Notes

**Sélection :**
- **Classe** : Parmi les classes de l'école
- **Matière** : Selon le programme du niveau
- **Période** : Trimestre 1, 2 ou 3

**Configuration de l'Évaluation :**
- **Type** : Devoir, Composition, Interrogation
- **Titre** : Description libre
- **Date** : Date de l'évaluation
- **Coefficient** : 1 à 4 selon l'importance

**Interface de Saisie :**
- Tableau avec tous les élèves de la classe
- Note précédente affichée (si disponible)
- Taux d'assiduité de l'élève
- Saisie note sur 20 avec validation
- Appréciation automatique (Excellent, Bien, etc.)
- Commentaire libre par élève

**Statistiques en Temps Réel :**
- Nombre de notes saisies
- Moyenne de classe
- Répartition des notes
- Taux de réussite

**Actions Rapides :**
- Note par défaut (10/20)
- Effacer toutes les notes
- Sauvegarde automatique

#### 2. Calcul des Moyennes

**Lancement du Calcul :**
- Sélection de la période
- Choix des classes (toutes ou spécifique)
- Paramètres de calcul

**Paramètres :**
- Application des coefficients
- Calcul des classements
- Seuil de passage (par défaut 10/20)
- Arrondi des moyennes

**Résultats :**
- Moyennes par classe
- Classement des élèves
- Statistiques par matière
- Taux de réussite global

#### 3. Génération des Bulletins

**Configuration :**
- Sélection des classes
- Modèle de bulletin (Standard, Détaillé, Simplifié)
- Options d'inclusion :
  - Appréciations des enseignants
  - Classement dans la classe
  - Statistiques de classe

**Méthodes de Distribution :**
- **Impression** : Bulletins papier
- **Email** : Envoi automatique aux parents
- **Les deux** : Impression + Email

**Contenu du Bulletin :**
- En-tête avec logo de l'école
- Informations élève et classe
- Notes par matière avec coefficients
- Moyenne générale et rang
- Appréciations de l'enseignant
- Conduite et assiduité
- Décision : Admis/Redouble/En cours

#### 4. Suivi des Performances

**Par Élève :**
- Évolution des moyennes
- Progression par matière
- Comparaison avec la classe
- Recommandations pédagogiques

**Par Classe :**
- Moyenne générale
- Répartition des notes
- Matières fortes/faibles
- Comparaison inter-classes

**Par Matière :**
- Performance globale de l'école
- Identification des difficultés
- Besoins de formation

---

## Gestion des Enseignants

### Système d'Enseignant Unique

Chaque enseignant est responsable d'une seule classe et enseigne toutes les matières du programme de ce niveau.

### Fonctionnalités

#### 1. Liste des Enseignants

**Informations Affichées :**
- Nom complet et qualifications
- Contact (téléphone, email)
- Classe assignée ou "Disponible"
- Expérience professionnelle
- Note de performance (étoiles)
- Statut (Actif, Inactif, Congé)

**Filtres :**
- Recherche par nom, email, téléphone
- Statut (Actif, Inactif, Congé)
- Disponibilité (Avec/Sans classe)

#### 2. Ajouter un Enseignant

**Informations Personnelles :**
- Prénom et nom
- Email (unique dans l'école)
- Téléphone
- Adresse complète
- Contact d'urgence

**Informations Professionnelles :**
- **Qualification** : Diplôme principal
- **Expérience** : Nombre d'années
- **Spécialisations** : Matières de prédilection
- **Date d'embauche**
- **Salaire mensuel** : En FCFA

**Affectation (Optionnelle) :**
- Classe disponible
- Matières à enseigner (automatiques)
- Salaire spécifique à l'affectation

**Compte Utilisateur (Optionnel) :**
- Création d'un compte système
- Mot de passe initial
- Permissions accordées :
  - Gestion académique (notes, bulletins)
  - Consultation des élèves
  - Emploi du temps

#### 3. Gestion des Affectations

**Principe :**
- Un enseignant ne peut avoir qu'une seule classe
- Responsabilité de toutes les matières
- Salaire lié à l'affectation

**Interface :**
- Enseignants disponibles
- Classes sans enseignant
- Recommandations automatiques
- Validation des affectations

#### 4. Suivi des Performances

**Évaluation :**
- Note globale sur 5 étoiles
- Critères détaillés :
  - Pédagogie
  - Ponctualité
  - Relation avec les élèves
  - Innovation

**Historique :**
- Évolution des performances
- Commentaires d'évaluation
- Plans d'amélioration

#### 5. Gestion des Absences

**Demandes d'Absence :**
- Saisie des demandes
- Justification obligatoire
- Période concernée
- Enseignant remplaçant

**Validation :**
- Approbation par la direction
- Notification automatique
- Mise à jour de l'emploi du temps

---

## Emploi du Temps

### Principe de Fonctionnement

L'emploi du temps organise les matières par créneaux horaires, avec un seul enseignant responsable de toutes les matières de sa classe.

### Fonctionnalités

#### 1. Vue Générale

**Modes d'Affichage :**
- **Vue Semaine** : Planning hebdomadaire complet
- **Vue Classe** : Emploi du temps d'une classe spécifique
- **Vue Enseignant** : Planning d'un enseignant

**Informations Affichées :**
- Créneaux horaires (8h-18h)
- Matières par créneau
- Enseignant (unique par classe)
- Salle de classe
- Pause déjeuner (12h-14h)

#### 2. Gestion des Cours

**Ajouter un Cours :**

1. **Sélection de l'enseignant**
   - Enseignants avec classe assignée
   - Classe automatiquement sélectionnée

2. **Détails du cours**
   - Matière (selon le programme de la classe)
   - Jour de la semaine
   - Heure de début et fin
   - Salle de classe

3. **Validation**
   - Vérification des conflits d'horaire
   - Disponibilité de la salle
   - Cohérence pédagogique

**Conflits Automatiques :**
- Enseignant déjà occupé
- Salle déjà réservée
- Chevauchement d'horaires

#### 3. Planning par Enseignant

**Avantages du Système :**
- **Suivi personnalisé** : Connaissance approfondie des élèves
- **Cohérence pédagogique** : Approche unifiée
- **Relation privilégiée** : Lien fort avec les familles
- **Gestion simplifiée** : Moins de coordination

**Affichage :**
- Planning hebdomadaire de l'enseignant
- Toutes les matières de sa classe
- Répartition horaire par matière
- Salle principale d'enseignement

#### 4. Occupation des Salles

**Gestion des Espaces :**
- Taux d'occupation par salle
- Planning d'utilisation
- Équipements disponibles
- Optimisation des espaces

**Types de Salles :**
- Classe Standard
- Laboratoire
- Espace Lecture
- Sport
- Informatique

---

## Import en Masse

### Vue d'Ensemble

Module d'importation pour ajouter rapidement de nombreux enregistrements depuis des fichiers Excel.

### Types d'Import

#### 1. Import d'Élèves

**Objectif :** Inscrire des élèves en masse avec leurs informations complètes.

**Données Requises :**
- **Obligatoires** : Prénom, Nom, Sexe, Date de naissance, Classe, Email parent
- **Optionnelles** : Nationalité, Contacts parents, Adresse, Frais, Paiement initial

**Processus :**

1. **Téléchargement du modèle Excel**
   - Fichier pré-configuré avec colonnes
   - Instructions intégrées
   - Exemples de données

2. **Remplissage des données**
   - Respect des formats requis
   - Validation locale dans Excel
   - Vérification des classes existantes

3. **Upload et validation**
   - Analyse automatique du fichier
   - Rapport d'erreurs détaillé
   - Aperçu avant import final

4. **Import et traitement**
   - Traitement ligne par ligne
   - Gestion des erreurs
   - Rapport final avec statistiques

**Validations :**
- Âge approprié (3-18 ans)
- Email unique dans l'école
- Classes existantes
- Contacts parents obligatoires
- Formats de date corrects

#### 2. Import d'Enseignants

**Objectif :** Ajouter des enseignants avec qualifications et affectations.

**Données Requises :**
- **Obligatoires** : Prénom, Nom, Email, Qualification
- **Optionnelles** : Téléphone, Expérience, Spécialisations, Classe, Salaire

**Fonctionnalités :**
- Affectation automatique aux classes disponibles
- Calcul des salaires selon grille
- Création optionnelle de comptes utilisateur
- Validation des qualifications

#### 3. Import de Matières

**Objectif :** Configurer les matières par niveau avec coefficients.

**Données Requises :**
- **Obligatoires** : Nom matière, Coefficient
- **Optionnelles** : Description, Niveaux concernés, Heures/semaine

**Validation :**
- Unicité des noms par école
- Coefficients entre 1 et 5
- Niveaux existants

### Gestion d'Erreurs

#### Types d'Erreurs

1. **Erreurs de Format**
   - Fichier corrompu
   - Colonnes manquantes
   - Types de données incorrects

2. **Erreurs de Validation**
   - Données obligatoires manquantes
   - Formats invalides (email, téléphone, date)
   - Contraintes métier non respectées

3. **Erreurs de Référence**
   - Classes inexistantes
   - Emails dupliqués
   - Enseignants déjà assignés

#### Rapport d'Erreurs

**Localisation Précise :**
- Numéro de ligne exact
- Champ concerné
- Valeur problématique

**Message Explicite :**
- Description claire du problème
- Suggestion de correction
- Exemples de formats corrects

### Bonnes Pratiques

1. **Préparation :**
   - Toujours utiliser les modèles fournis
   - Vérifier les prérequis (classes existantes)
   - Tester avec un petit échantillon

2. **Validation :**
   - Corriger toutes les erreurs avant import
   - Vérifier les données après import
   - Conserver les fichiers sources

3. **Sécurité :**
   - Sauvegarder avant gros import
   - Importer par petits lots
   - Vérifier les permissions

---

## Paramètres

### Configuration Générale

#### 1. Informations de l'École

**Données de Base :**
- Nom officiel de l'établissement
- Adresse complète
- Téléphone et email
- Directeur/Directrice
- Année de fondation
- Capacité d'accueil
- Devise de l'école

**Logo et Identité :**
- Upload du logo (formats supportés)
- Couleurs institutionnelles
- Modèles de documents

#### 2. Année Scolaire

**Configuration :**
- Nom de l'année (ex: 2024-2025)
- Dates de début et fin
- Activation/Désactivation

**Périodes d'Évaluation :**
- **Trimestres** : 3 périodes standard
- **Semestres** : 2 périodes (optionnel)
- Dates personnalisables
- Périodes actives

**Vacances Scolaires :**
- Vacances de Noël
- Vacances de Pâques
- Congés nationaux
- Dates personnalisables

#### 3. Gestion des Utilisateurs

**Création de Comptes :**
- Informations personnelles
- Rôle et permissions
- Mot de passe initial
- Liaison avec enseignant (si applicable)

**Rôles et Permissions :**
- **Admin** : Toutes les permissions
- **Directeur** : Gestion complète de l'école
- **Secrétaire** : Élèves et classes
- **Enseignant** : Notes et consultation
- **Comptable** : Finance et rapports

**Sécurité :**
- Politique des mots de passe
- Durée des sessions
- Tentatives de connexion
- Audit des accès

### Configuration Académique

#### 1. Niveaux et Classes

**Niveaux Standards :**
- Maternelle (3-5 ans)
- CI - Cours d'Initiation (6 ans)
- CP - Cours Préparatoire (7 ans)
- CE1/CE2 - Cours Élémentaire (8-10 ans)
- CM1/CM2 - Cours Moyen (11-12 ans)

**Configuration par Niveau :**
- Âges recommandés
- Frais de scolarité
- Matières du programme
- Coefficients par matière

#### 2. Matières Enseignées

**Programme Officiel Béninois :**

*Maternelle :*
- Éveil, Langage, Graphisme
- Jeux éducatifs, Motricité

*Primaire (CI-CP) :*
- Français, Mathématiques
- Éveil Scientifique, Éducation Civique, Dessin

*Élémentaire (CE1-CE2) :*
- Français, Mathématiques
- Histoire-Géographie, Sciences
- Éducation Civique, Dessin

*Moyen (CM1-CM2) :*
- Français, Mathématiques
- Histoire-Géographie, Sciences
- Éducation Civique, Anglais, Dessin

**Gestion des Matières :**
- Ajout/Suppression de matières
- Modification des coefficients
- Association aux niveaux
- Import en masse

#### 3. Modèles de Bulletins

**Types de Modèles :**

1. **Standard** : Format classique
   - Notes par matière
   - Moyenne générale
   - Classement
   - Appréciations

2. **Détaillé** : Format complet
   - Graphiques d'évolution
   - Analyses détaillées
   - Comparaisons
   - Recommandations

3. **Simplifié** : Format condensé
   - Notes essentielles
   - Commentaire général
   - Format économique

**Personnalisation :**
- En-tête avec logo
- Sections configurables
- Signatures requises
- Format (Portrait/Paysage)

### Configuration Financière

#### 1. Types de Frais

**Frais par Niveau :**
- Frais de scolarité annuels
- Frais d'inscription
- Frais optionnels (cantine, transport)

**Configuration :**
- Montant en FCFA
- Niveau concerné
- Obligatoire/Optionnel
- Description

#### 2. Méthodes de Paiement

**Configuration des Méthodes :**

*Espèces :*
- Toujours disponible
- Aucun frais de transaction
- Gestion de caisse

*Mobile Money :*
- Nom du service (MTN, Moov)
- Frais de transaction (%)
- Code marchand
- Configuration API

*Virement Bancaire :*
- Nom de la banque
- Numéro de compte
- RIB de l'école
- Frais bancaires

#### 3. Rapports Financiers

**Types de Rapports :**
- Résumé mensuel
- Rapport trimestriel
- Analyse annuelle
- Impayés détaillés

**Formats d'Export :**
- PDF formaté
- Excel pour analyse
- CSV pour comptabilité

### Système et Sécurité

#### 1. Sauvegardes

**Sauvegardes Automatiques :**
- Fréquence : Quotidienne (par défaut)
- Heure : 23h30
- Rétention : 30 jours
- Stockage sécurisé

**Sauvegardes Manuelles :**
- Création à la demande
- Avant mises à jour importantes
- Export local possible

**Restauration :**
- Sélection de la sauvegarde
- Aperçu du contenu
- Restauration sélective ou complète

#### 2. Journal d'Activité

**Logging Automatique :**
- Toutes les actions importantes
- Horodatage précis
- Utilisateur responsable
- Détails de l'action

**Niveaux de Log :**
- **Info** : Actions normales
- **Succès** : Opérations réussies
- **Avertissement** : Situations à surveiller
- **Erreur** : Problèmes techniques

**Filtrage :**
- Par niveau de gravité
- Par catégorie d'action
- Par utilisateur
- Par période

#### 3. Sécurité

**Politique des Mots de Passe :**
- Longueur minimale
- Complexité requise
- Expiration périodique
- Historique des mots de passe

**Contrôle d'Accès :**
- Tentatives de connexion limitées
- Blocage automatique
- Liste blanche d'IP
- Authentification à deux facteurs

**Sessions :**
- Timeout d'inactivité
- Sessions simultanées limitées
- Déconnexion automatique
- Monitoring des connexions

---

## Utilisation Quotidienne

### Workflow Secrétaire

#### Matin (8h-12h)

1. **Connexion et vérification**
   - Se connecter au système
   - Vérifier les notifications
   - Consulter le tableau de bord

2. **Gestion des arrivées**
   - Accueillir les nouveaux élèves
   - Traiter les inscriptions
   - Enregistrer les paiements

3. **Suivi administratif**
   - Répondre aux demandes parents
   - Mettre à jour les dossiers
   - Préparer les documents

#### Après-midi (14h-17h)

1. **Paiements et relances**
   - Enregistrer les paiements reçus
   - Contacter les familles en retard
   - Mettre à jour les situations

2. **Support enseignants**
   - Aider pour les questions administratives
   - Gérer les demandes d'absence
   - Coordonner les remplacements

### Workflow Enseignant

#### Préparation des Cours

1. **Consultation de l'emploi du temps**
   - Vérifier le planning de la semaine
   - Préparer les matières du jour
   - Organiser les évaluations

2. **Suivi des élèves**
   - Consulter les profils élèves
   - Vérifier les situations particulières
   - Préparer les adaptations pédagogiques

#### Saisie des Notes

1. **Après chaque évaluation**
   - Se connecter au système
   - Sélectionner classe/matière/période
   - Saisir les notes avec appréciations

2. **Fin de période**
   - Vérifier toutes les notes saisies
   - Calculer les moyennes
   - Préparer les bulletins

### Workflow Comptable

#### Suivi Quotidien

1. **Vérification des paiements**
   - Consulter les paiements du jour
   - Vérifier les références
   - Valider les transactions

2. **Gestion des impayés**
   - Identifier les retards
   - Préparer les relances
   - Contacter les familles

#### Rapports Périodiques

1. **Fin de mois**
   - Générer le rapport mensuel
   - Analyser les tendances
   - Préparer la comptabilité

2. **Fin de trimestre**
   - Bilan trimestriel complet
   - Analyse comparative
   - Projections financières

---

## Dépannage

### Problèmes de Connexion

#### Session Expirée

**Symptômes :**
- Message "Session expirée"
- Redirection vers la page de connexion
- Perte des données non sauvegardées

**Solutions :**
1. Cliquer sur "Rafraîchir Session"
2. Si échec, se reconnecter
3. Vérifier la connexion internet

#### Mot de Passe Oublié

**Procédure :**
1. Cliquer sur "Mot de passe oublié"
2. Saisir l'adresse email
3. Suivre les instructions reçues
4. Contacter l'administrateur si nécessaire

### Problèmes de Performance

#### Chargement Lent

**Causes Possibles :**
- Connexion internet faible
- Serveur surchargé
- Cache navigateur plein

**Solutions :**
1. Actualiser la page (F5)
2. Vider le cache du navigateur
3. Fermer les onglets inutiles
4. Redémarrer le navigateur

#### Erreurs d'Affichage

**Solutions :**
1. Actualiser la page
2. Vérifier la compatibilité du navigateur
3. Désactiver les extensions
4. Essayer en navigation privée

### Problèmes de Données

#### Données Manquantes

**Vérifications :**
1. Année scolaire correcte sélectionnée
2. Permissions utilisateur suffisantes
3. Filtres appliqués
4. Synchronisation des données

#### Erreurs de Saisie

**Prévention :**
1. Valider avant sauvegarder
2. Utiliser les formats requis
3. Vérifier les données obligatoires
4. Sauvegarder régulièrement

### Support Technique

#### Contacts

- **Support Technique** : support@ecoletech.edu
- **Formation** : formation@ecoletech.edu
- **Urgences** : +229 XX XX XX XX

#### Informations à Fournir

1. Description détaillée du problème
2. Étapes pour reproduire l'erreur
3. Navigateur et version utilisés
4. Captures d'écran si possible
5. Messages d'erreur exacts

---

## FAQ

### Questions Générales

**Q : Puis-je utiliser l'application sur mobile ?**
R : Oui, l'application est entièrement responsive et fonctionne sur tous les appareils.

**Q : Mes données sont-elles sécurisées ?**
R : Oui, toutes les données sont chiffrées et sauvegardées quotidiennement.

**Q : Puis-je exporter mes données ?**
R : Oui, tous les modules proposent des exports en CSV, Excel ou PDF.

### Gestion des Élèves

**Q : Comment changer un élève de classe ?**
R : Utilisez la fonction "Transférer" dans le profil de l'élève.

**Q : Que se passe-t-il si je retire un élève ?**
R : L'inscription est désactivée mais les données sont conservées pour l'historique.

**Q : Comment gérer les frères et sœurs ?**
R : Chaque élève a un dossier séparé, mais vous pouvez utiliser le même email parent.

### Gestion Financière

**Q : Comment annuler un paiement ?**
R : Contactez l'administrateur, seuls les admins peuvent annuler les paiements.

**Q : Les frais de Mobile Money sont-ils automatiques ?**
R : Oui, ils sont calculés selon le pourcentage configuré dans les paramètres.

**Q : Comment relancer les impayés ?**
R : Utilisez les boutons "Appeler" ou "Email" dans le tableau des impayés.

### Gestion Académique

**Q : Puis-je modifier une note après saisie ?**
R : Oui, mais toutes les modifications sont tracées dans le journal d'activité.

**Q : Comment calculer les moyennes ?**
R : Utilisez l'outil "Calculer Moyennes" dans la section Académique.

**Q : Les bulletins sont-ils automatiquement envoyés ?**
R : Seulement si vous choisissez l'option "Email" lors de la génération.

### Import en Masse

**Q : Quel format de fichier utiliser ?**
R : Uniquement Excel (.xlsx ou .xls), utilisez les modèles fournis.

**Q : Que faire en cas d'erreurs d'import ?**
R : Corrigez les erreurs dans le fichier Excel et relancez l'import.

**Q : Puis-je importer partiellement ?**
R : Oui, les lignes valides sont importées, les erreurs sont ignorées.

### Système d'Enseignant Unique

**Q : Pourquoi un seul enseignant par classe ?**
R : C'est le système officiel béninois qui garantit un suivi personnalisé optimal.

**Q : Un enseignant peut-il enseigner plusieurs classes ?**
R : Non, chaque enseignant est responsable d'une seule classe pour toutes les matières.

**Q : Comment gérer les spécialisations ?**
R : Les spécialisations sont informatives et aident aux recommandations d'affectation.

---

## Annexes

### A. Formats de Données

#### Dates
- **Format standard** : JJ/MM/AAAA (15/03/2013)
- **Format ISO** : AAAA-MM-JJ (2013-03-15)
- **Format Excel** : Automatiquement reconnu

#### Téléphones
- **International** : +229 01 23 45 67
- **National** : 01 23 45 67
- **Compact** : 22901234567

#### Montants
- **FCFA uniquement** : 450000
- **Séparateurs acceptés** : 450,000 ou 450 000

### B. Codes d'Erreur

#### Erreurs de Connexion
- **AUTH001** : Email ou mot de passe incorrect
- **AUTH002** : Compte désactivé
- **AUTH003** : Session expirée

#### Erreurs de Données
- **DATA001** : Données obligatoires manquantes
- **DATA002** : Format de données invalide
- **DATA003** : Contrainte d'unicité violée

#### Erreurs Système
- **SYS001** : Erreur de base de données
- **SYS002** : Erreur de réseau
- **SYS003** : Erreur de serveur

### C. Raccourcis Clavier

- **Ctrl + S** : Sauvegarder (dans les formulaires)
- **Ctrl + F** : Rechercher
- **Échap** : Fermer les modals
- **Tab** : Navigation entre champs

### D. Navigateurs Supportés

#### Recommandés
- **Chrome** : Version 90+
- **Firefox** : Version 88+
- **Safari** : Version 14+
- **Edge** : Version 90+

#### Fonctionnalités Requises
- JavaScript activé
- Cookies autorisés
- LocalStorage disponible
- Connexion internet stable

---

## Support et Formation

### Ressources Disponibles

1. **Manuel utilisateur** : Ce document
2. **Guides vidéo** : Tutoriels par module
3. **FAQ en ligne** : Questions fréquentes
4. **Support technique** : Assistance personnalisée

### Formation

#### Formation Initiale
- **Durée** : 2 jours
- **Contenu** : Toutes les fonctionnalités
- **Support** : Manuel et exercices pratiques

#### Formation Continue
- **Mises à jour** : Nouvelles fonctionnalités
- **Perfectionnement** : Utilisation avancée
- **Support** : Sessions à distance

### Contact

**Support Technique :**
- Email : support@ecoletech.edu
- Téléphone : +229 XX XX XX XX
- Horaires : Lundi-Vendredi 8h-17h

**Formation :**
- Email : formation@ecoletech.edu
- Demande de formation personnalisée
- Documentation supplémentaire

---

*Manuel d'utilisation - Version 1.0 - Octobre 2024*
*Système de Gestion Scolaire pour le Bénin*
*© 2024 EcoleTech - Tous droits réservés*