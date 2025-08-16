import React, { useState, useEffect } from 'react';
import { X, BookOpen, Plus, Trash2, Edit, Upload, Save, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import ImportButton from '../Import/ImportButton';
import { useAuth } from '../Auth/AuthProvider';
import { SubjectService } from '../../services/subjectService';
import { ActivityLogService } from '../../services/activityLogService';
import { useConfirmationContext } from '../../contexts/ConfirmationContext';

interface AcademicLevelsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Level {
  id: string;
  name: string;
  description: string;
  subjects: string[];
  minAge: number;
  maxAge: number;
  annualFees: number;
}

interface Subject {
  id: string;
  name: string;
  levels: string[];
  coefficient: number;
  description: string;
  created_at?: string;
  updated_at?: string;
}

const AcademicLevelsModal: React.FC<AcademicLevelsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { userSchool, user } = useAuth();
  const { confirm, notify } = useConfirmationContext();
  const [activeTab, setActiveTab] = useState<'levels' | 'subjects'>('levels');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // États pour les niveaux (données statiques pour l'instant)
  const [levels, setLevels] = useState<Level[]>([
    {
      id: '1',
      name: 'Maternelle',
      description: 'Éducation préscolaire pour les tout-petits',
      subjects: ['Éveil', 'Langage', 'Graphisme', 'Jeux éducatifs', 'Motricité'],
      minAge: 3,
      maxAge: 5,
      annualFees: 300000
    },
    {
      id: '2',
      name: 'CI',
      description: 'Cours d\'Initiation - Première année du primaire',
      subjects: ['Français', 'Mathématiques', 'Éveil Scientifique', 'Éducation Civique', 'Dessin'],
      minAge: 6,
      maxAge: 7,
      annualFees: 350000
    },
    {
      id: '3',
      name: 'CP',
      description: 'Cours Préparatoire',
      subjects: ['Français', 'Mathématiques', 'Éveil Scientifique', 'Éducation Civique', 'Dessin'],
      minAge: 7,
      maxAge: 8,
      annualFees: 350000
    },
    {
      id: '4',
      name: 'CE1',
      description: 'Cours Élémentaire 1ère année',
      subjects: ['Français', 'Mathématiques', 'Histoire-Géographie', 'Sciences', 'Éducation Civique', 'Dessin'],
      minAge: 8,
      maxAge: 9,
      annualFees: 400000
    },
    {
      id: '5',
      name: 'CE2',
      description: 'Cours Élémentaire 2ème année',
      subjects: ['Français', 'Mathématiques', 'Histoire-Géographie', 'Sciences', 'Éducation Civique', 'Dessin'],
      minAge: 9,
      maxAge: 10,
      annualFees: 400000
    },
    {
      id: '6',
      name: 'CM1',
      description: 'Cours Moyen 1ère année',
      subjects: ['Français', 'Mathématiques', 'Histoire-Géographie', 'Sciences', 'Éducation Civique', 'Anglais', 'Dessin'],
      minAge: 10,
      maxAge: 11,
      annualFees: 450000
    },
    {
      id: '7',
      name: 'CM2',
      description: 'Cours Moyen 2ème année',
      subjects: ['Français', 'Mathématiques', 'Histoire-Géographie', 'Sciences', 'Éducation Civique', 'Anglais', 'Dessin'],
      minAge: 11,
      maxAge: 12,
      annualFees: 450000
    }
  ]);

  // États pour les matières (depuis la base de données)
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showAddLevel, setShowAddLevel] = useState(false);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const [newLevel, setNewLevel] = useState<Partial<Level>>({
    name: '',
    description: '',
    subjects: [],
    minAge: 6,
    maxAge: 7,
    annualFees: 350000
  });

  const [newSubject, setNewSubject] = useState<Partial<Subject>>({
    name: '',
    levels: [],
    coefficient: 1,
    description: ''
  });

  // Charger les matières depuis la base de données
  useEffect(() => {
    if (isOpen && userSchool) {
      loadSubjects();
    }
  }, [isOpen, userSchool]);

  const loadSubjects = async () => {
    if (!userSchool) return;

    try {
      setLoading(true);
      setError(null);
      
      const subjectsData = await SubjectService.getSubjects(userSchool.id);
      setSubjects(subjectsData);
    } catch (error: any) {
      console.error('Erreur lors du chargement des matières:', error);
      setError(error.message || 'Erreur lors du chargement des matières');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLevel = () => {
    if (newLevel.name && newLevel.description) {
      const level: Level = {
        id: Date.now().toString(),
        name: newLevel.name,
        description: newLevel.description,
        subjects: newLevel.subjects || [],
        minAge: newLevel.minAge || 6,
        maxAge: newLevel.maxAge || 7,
        annualFees: newLevel.annualFees || 350000
      };
      
      setLevels(prev => [...prev, level]);
      setNewLevel({
        name: '',
        description: '',
        subjects: [],
        minAge: 6,
        maxAge: 7,
        annualFees: 350000
      });
      setShowAddLevel(false);
      
      notify({
        title: 'Niveau ajouté',
        message: `Le niveau "${level.name}" a été ajouté avec succès.`,
        type: 'success',
        autoClose: true
      });
    }
  };

  const handleAddSubject = async () => {
    if (!userSchool || !newSubject.name || !newSubject.description) {
      notify({
        title: 'Données incomplètes',
        message: 'Veuillez remplir tous les champs obligatoires.',
        type: 'warning'
      });
      return;
    }

    try {
      setLoading(true);

      const subjectData = await SubjectService.createSubject({
        schoolId: userSchool.id,
        name: newSubject.name,
        description: newSubject.description,
        coefficient: newSubject.coefficient || 1,
        levels: newSubject.levels || []
      });

      // Ajouter à la liste locale
      setSubjects(prev => [...prev, subjectData]);
      
      // Reset du formulaire
      setNewSubject({
        name: '',
        levels: [],
        coefficient: 1,
        description: ''
      });
      setShowAddSubject(false);

      // Logger l'activité
      await ActivityLogService.logActivity({
        schoolId: userSchool.id,
        userId: user?.id,
        action: 'CREATE_SUBJECT',
        entityType: 'subject',
        entityId: subjectData.id,
        level: 'success',
        details: `Nouvelle matière créée: ${newSubject.name}`
      });

      notify({
        title: 'Matière ajoutée',
        message: `La matière "${newSubject.name}" a été ajoutée avec succès.`,
        type: 'success',
        autoClose: true
      });
    } catch (error: any) {
      console.error('Erreur lors de l\'ajout de la matière:', error);
      notify({
        title: 'Erreur d\'ajout',
        message: `Erreur: ${error.message}`,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubject = async (subjectId: string, updates: Partial<Subject>) => {
    if (!userSchool) return;

    try {
      setLoading(true);

      const updatedSubject = await SubjectService.updateSubject(subjectId, updates);
      
      // Mettre à jour la liste locale
      setSubjects(prev => prev.map(s => s.id === subjectId ? updatedSubject : s));
      setEditingSubject(null);

      // Logger l'activité
      await ActivityLogService.logActivity({
        schoolId: userSchool.id,
        userId: user?.id,
        action: 'UPDATE_SUBJECT',
        entityType: 'subject',
        entityId: subjectId,
        level: 'info',
        details: `Matière mise à jour: ${updates.name || 'matière'}`
      });

      notify({
        title: 'Matière mise à jour',
        message: 'La matière a été mise à jour avec succès.',
        type: 'success',
        autoClose: true
      });
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour:', error);
      notify({
        title: 'Erreur de mise à jour',
        message: `Erreur: ${error.message}`,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubject = async (subjectId: string) => {
    if (!userSchool) return;

    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    const confirmed = await confirm({
      title: 'Supprimer la matière',
      message: `Êtes-vous sûr de vouloir supprimer "${subject.name}" ? Cette action est irréversible et supprimera toutes les notes associées.`,
      type: 'danger',
      confirmText: 'Supprimer',
      cancelText: 'Annuler'
    });

    if (!confirmed) return;

    try {
      setLoading(true);

      await SubjectService.deleteSubject(subjectId);
      
      // Retirer de la liste locale
      setSubjects(prev => prev.filter(s => s.id !== subjectId));

      // Logger l'activité
      await ActivityLogService.logActivity({
        schoolId: userSchool.id,
        userId: user?.id,
        action: 'DELETE_SUBJECT',
        entityType: 'subject',
        entityId: subjectId,
        level: 'warning',
        details: `Matière supprimée: ${subject.name}`
      });

      notify({
        title: 'Matière supprimée',
        message: `"${subject.name}" a été supprimée avec succès.`,
        type: 'success',
        autoClose: true
      });
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      notify({
        title: 'Erreur de suppression',
        message: `Erreur: ${error.message}`,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteLevel = (levelId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce niveau ?')) {
      setLevels(prev => prev.filter(l => l.id !== levelId));
    }
  };

  const handleLevelToggleForSubject = (levelName: string) => {
    setNewSubject(prev => ({
      ...prev,
      levels: prev.levels?.includes(levelName)
        ? prev.levels.filter(l => l !== levelName)
        : [...(prev.levels || []), levelName]
    }));
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject({ ...subject });
  };

  const handleSaveEditSubject = async () => {
    if (!editingSubject) return;

    await handleUpdateSubject(editingSubject.id, {
      name: editingSubject.name,
      description: editingSubject.description,
      coefficient: editingSubject.coefficient,
      levels: editingSubject.levels
    });
  };

  const handleCancelEditSubject = () => {
    setEditingSubject(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Configuration Académique</h2>
                <p className="text-gray-600">Gestion des niveaux et matières - {userSchool?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={loadSubjects}
                disabled={loading}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 mt-6">
            <button
              onClick={() => setActiveTab('levels')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'levels'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Niveaux Scolaires
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'subjects'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Matières ({subjects.length})
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {activeTab === 'levels' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Niveaux Scolaires</h3>
                <button
                  onClick={() => setShowAddLevel(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nouveau Niveau</span>
                </button>
              </div>

              {/* Add Level Form */}
              {showAddLevel && (
                <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <h4 className="font-medium text-purple-800 mb-4">Ajouter un Niveau</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du Niveau *
                      </label>
                      <input
                        type="text"
                        value={newLevel.name}
                        onChange={(e) => setNewLevel(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frais Annuels (FCFA) *
                      </label>
                      <input
                        type="number"
                        value={newLevel.annualFees}
                        onChange={(e) => setNewLevel(prev => ({ ...prev, annualFees: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Âge Minimum
                      </label>
                      <input
                        type="number"
                        min="3"
                        max="15"
                        value={newLevel.minAge}
                        onChange={(e) => setNewLevel(prev => ({ ...prev, minAge: parseInt(e.target.value) || 6 }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Âge Maximum
                      </label>
                      <input
                        type="number"
                        min="4"
                        max="16"
                        value={newLevel.maxAge}
                        onChange={(e) => setNewLevel(prev => ({ ...prev, maxAge: parseInt(e.target.value) || 7 }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={newLevel.description}
                      onChange={(e) => setNewLevel(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleAddLevel}
                      disabled={!newLevel.name || !newLevel.description}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      Ajouter
                    </button>
                    <button
                      onClick={() => setShowAddLevel(false)}
                      className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}

              {/* Levels List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {levels.map((level) => (
                  <div key={level.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">{level.name}</h4>
                        <p className="text-sm text-gray-600">{level.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingLevel(level)}
                          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteLevel(level.id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Âge:</span>
                        <span>{level.minAge} - {level.maxAge} ans</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frais annuels:</span>
                        <span className="font-medium">{level.annualFees.toLocaleString()} FCFA</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Matières ({level.subjects.length}):</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {level.subjects.slice(0, 3).map(subject => (
                            <span key={subject} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                              {subject}
                            </span>
                          ))}
                          {level.subjects.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              +{level.subjects.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Matières Enseignées</h3>
                <div className="flex items-center space-x-2">
                  <ImportButton 
                    variant="secondary"
                    size="sm"
                    onImportComplete={loadSubjects}
                  />
                  <button
                    onClick={() => setShowAddSubject(true)}
                    disabled={loading}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Nouvelle Matière</span>
                  </button>
                </div>
              </div>

              {/* Add Subject Form */}
              {showAddSubject && (
                <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <h4 className="font-medium text-purple-800 mb-4">Ajouter une Matière</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de la Matière *
                      </label>
                      <input
                        type="text"
                        value={newSubject.name}
                        onChange={(e) => setNewSubject(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ex: Français, Mathématiques..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coefficient
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={newSubject.coefficient}
                        onChange={(e) => setNewSubject(prev => ({ ...prev, coefficient: parseInt(e.target.value) || 1 }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={newSubject.description}
                      onChange={(e) => setNewSubject(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Description de la matière et de son contenu..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Niveaux Concernés
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {levels.map(level => (
                        <label key={level.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newSubject.levels?.includes(level.name) || false}
                            onChange={() => handleLevelToggleForSubject(level.name)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">{level.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleAddSubject}
                      disabled={loading || !newSubject.name || !newSubject.description}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Ajout...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          <span>Ajouter</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setShowAddSubject(false)}
                      className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}

              {/* Subjects List */}
              {loading && subjects.length === 0 ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
                  <p className="text-gray-600">Chargement des matières...</p>
                </div>
              ) : subjects.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matière</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Niveaux</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coefficient</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Créée le</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {subjects.map((subject) => (
                        <tr key={subject.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            {editingSubject?.id === subject.id ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={editingSubject.name}
                                  onChange={(e) => setEditingSubject(prev => prev ? { ...prev, name: e.target.value } : null)}
                                  className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                                />
                                <textarea
                                  value={editingSubject.description}
                                  onChange={(e) => setEditingSubject(prev => prev ? { ...prev, description: e.target.value } : null)}
                                  rows={2}
                                  className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                                />
                              </div>
                            ) : (
                              <div>
                                <p className="font-medium text-gray-800">{subject.name}</p>
                                <p className="text-sm text-gray-500">{subject.description}</p>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {editingSubject?.id === subject.id ? (
                              <div className="grid grid-cols-2 gap-1">
                                {levels.map(level => (
                                  <label key={level.id} className="flex items-center space-x-1 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={editingSubject.levels?.includes(level.name) || false}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setEditingSubject(prev => prev ? { 
                                            ...prev, 
                                            levels: [...(prev.levels || []), level.name] 
                                          } : null);
                                        } else {
                                          setEditingSubject(prev => prev ? { 
                                            ...prev, 
                                            levels: (prev.levels || []).filter(l => l !== level.name) 
                                          } : null);
                                        }
                                      }}
                                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className="text-xs text-gray-700">{level.name}</span>
                                  </label>
                                ))}
                              </div>
                            ) : (
                              <div className="flex flex-wrap gap-1">
                                {(subject.levels || []).map(level => (
                                  <span key={level} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                    {level}
                                  </span>
                                ))}
                                {(!subject.levels || subject.levels.length === 0) && (
                                  <span className="text-sm text-gray-500 italic">Aucun niveau</span>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {editingSubject?.id === subject.id ? (
                              <input
                                type="number"
                                min="1"
                                max="5"
                                value={editingSubject.coefficient}
                                onChange={(e) => setEditingSubject(prev => prev ? { ...prev, coefficient: parseInt(e.target.value) || 1 } : null)}
                                className="w-16 px-2 py-1 border border-gray-200 rounded text-sm"
                              />
                            ) : (
                              <span className="font-medium text-gray-800">{subject.coefficient}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {subject.created_at ? new Date(subject.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              {editingSubject?.id === subject.id ? (
                                <>
                                  <button
                                    onClick={handleSaveEditSubject}
                                    disabled={loading}
                                    className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors disabled:opacity-50"
                                  >
                                    <Save className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={handleCancelEditSubject}
                                    className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleEditSubject(subject)}
                                    disabled={loading}
                                    className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors disabled:opacity-50"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubject(subject.id)}
                                    disabled={loading}
                                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Aucune matière configurée</h4>
                  <p className="text-gray-600 mb-4">Commencez par ajouter les matières de votre programme scolaire</p>
                  <button
                    onClick={() => setShowAddSubject(true)}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Ajouter la Première Matière</span>
                  </button>
                </div>
              )}

              {/* Informations sur le système éducatif béninois */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-3">Programme Officiel Béninois</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div>
                    <p className="font-medium mb-2">Matières principales par niveau:</p>
                    <ul className="space-y-1">
                      <li>• <strong>Maternelle:</strong> Éveil, Langage, Graphisme, Motricité</li>
                      <li>• <strong>CI-CP:</strong> Français (Coef. 4), Mathématiques (Coef. 4), Éveil Scientifique</li>
                      <li>• <strong>CE1-CE2:</strong> + Histoire-Géographie, Sciences</li>
                      <li>• <strong>CM1-CM2:</strong> + Anglais (Coef. 2)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Coefficients recommandés:</p>
                    <ul className="space-y-1">
                      <li>• <strong>Français:</strong> Coefficient 4 (matière principale)</li>
                      <li>• <strong>Mathématiques:</strong> Coefficient 4 (matière principale)</li>
                      <li>• <strong>Sciences/Histoire:</strong> Coefficient 2</li>
                      <li>• <strong>Anglais:</strong> Coefficient 2 (CM1-CM2)</li>
                      <li>• <strong>Autres matières:</strong> Coefficient 1</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {activeTab === 'subjects' && (
                <span>
                  {subjects.length} matière(s) configurée(s) • 
                  Dernière mise à jour: {subjects.length > 0 && subjects[0].updated_at 
                    ? new Date(subjects[0].updated_at).toLocaleDateString('fr-FR')
                    : 'N/A'
                  }
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicLevelsModal;