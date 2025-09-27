import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  Grid,
  Avatar
} from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar
} from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  PlayArrow as StartIcon,
  Stop as StopIcon,
  CheckCircle as CompleteIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Euro as EuroIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import './Missions.css';

const Missions = () => {
  const dispatch = useDispatch();
  const { missions, loading, error } = useSelector(state => state.missions);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [selectedMission, setSelectedMission] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sport: '',
    level: 'beginner',
    duration: '',
    location: '',
    maxParticipants: '',
    price: '',
    coachId: '',
    startDate: '',
    endDate: '',
    status: 'draft',
    requirements: ''
  });

  // Mock data
  const mockMissions = [
    {
      id: 1,
      title: 'Cours de Tennis Débutant',
      description: 'Initiation au tennis pour débutants avec apprentissage des bases',
      sport: 'Tennis',
      level: 'beginner',
      duration: '1h30',
      location: 'Court Central, Paris 16e',
      maxParticipants: 8,
      currentParticipants: 5,
      price: 45,
      coachId: 2,
      coachName: 'Marie Martin',
      startDate: '2024-03-15T10:00:00',
      endDate: '2024-03-15T11:30:00',
      status: 'active',
      requirements: 'Raquette fournie, tenue de sport obligatoire',
      createdAt: '2024-02-01'
    },
    {
      id: 2,
      title: 'Entraînement Football Avancé',
      description: 'Session d\'entraînement intensif pour joueurs confirmés',
      sport: 'Football',
      level: 'advanced',
      duration: '2h',
      location: 'Stade Municipal, Boulogne',
      maxParticipants: 20,
      currentParticipants: 18,
      price: 35,
      coachId: 3,
      coachName: 'Pierre Durand',
      startDate: '2024-03-16T14:00:00',
      endDate: '2024-03-16T16:00:00',
      status: 'active',
      requirements: 'Crampons obligatoires, protège-tibias',
      createdAt: '2024-02-05'
    },
    {
      id: 3,
      title: 'Yoga Matinal',
      description: 'Séance de yoga relaxante pour bien commencer la journée',
      sport: 'Yoga',
      level: 'intermediate',
      duration: '1h',
      location: 'Studio Zen, Paris 11e',
      maxParticipants: 15,
      currentParticipants: 12,
      price: 25,
      coachId: 4,
      coachName: 'Sophie Laurent',
      startDate: '2024-03-17T08:00:00',
      endDate: '2024-03-17T09:00:00',
      status: 'completed',
      requirements: 'Tapis de yoga fourni, vêtements confortables',
      createdAt: '2024-01-20'
    }
  ];

  const mockCoaches = [
    { id: 2, name: 'Marie Martin' },
    { id: 3, name: 'Pierre Durand' },
    { id: 4, name: 'Sophie Laurent' }
  ];

  useEffect(() => {
    // dispatch(fetchMissions());
  }, [dispatch]);

  const handleOpenDialog = (mode, mission = null) => {
    setDialogMode(mode);
    setSelectedMission(mission);
    if (mission) {
      setFormData({
        title: mission.title || '',
        description: mission.description || '',
        sport: mission.sport || '',
        level: mission.level || 'beginner',
        duration: mission.duration || '',
        location: mission.location || '',
        maxParticipants: mission.maxParticipants || '',
        price: mission.price || '',
        coachId: mission.coachId || '',
        startDate: mission.startDate ? mission.startDate.slice(0, 16) : '',
        endDate: mission.endDate ? mission.endDate.slice(0, 16) : '',
        status: mission.status || 'draft',
        requirements: mission.requirements || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        sport: '',
        level: 'beginner',
        duration: '',
        location: '',
        maxParticipants: '',
        price: '',
        coachId: '',
        startDate: '',
        endDate: '',
        status: 'draft',
        requirements: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMission(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (dialogMode === 'add') {
      setSnackbar({
        open: true,
        message: 'Mission créée avec succès',
        severity: 'success'
      });
    } else if (dialogMode === 'edit') {
      setSnackbar({
        open: true,
        message: 'Mission modifiée avec succès',
        severity: 'success'
      });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
      setSnackbar({
        open: true,
        message: 'Mission supprimée avec succès',
        severity: 'success'
      });
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setSnackbar({
      open: true,
      message: `Mission ${newStatus === 'active' ? 'activée' : newStatus === 'completed' ? 'terminée' : 'suspendue'} avec succès`,
      severity: 'success'
    });
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      draft: { label: 'Brouillon', color: 'default' },
      active: { label: 'Active', color: 'success' },
      completed: { label: 'Terminée', color: 'info' },
      cancelled: { label: 'Annulée', color: 'error' },
      suspended: { label: 'Suspendue', color: 'warning' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const getLevelChip = (level) => {
    const levelConfig = {
      beginner: { label: 'Débutant', color: 'success' },
      intermediate: { label: 'Intermédiaire', color: 'warning' },
      advanced: { label: 'Avancé', color: 'error' }
    };
    
    const config = levelConfig[level] || levelConfig.beginner;
    return <Chip label={config.label} color={config.color} size="small" variant="outlined" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70
    },
    {
      field: 'title',
      headerName: 'Titre',
      width: 200,
      sortable: true
    },
    {
      field: 'sport',
      headerName: 'Sport',
      width: 120,
      sortable: true
    },
    {
      field: 'level',
      headerName: 'Niveau',
      width: 130,
      renderCell: (params) => getLevelChip(params.value),
      sortable: true
    },
    {
      field: 'coachName',
      headerName: 'Coach',
      width: 150,
      sortable: true
    },
    {
      field: 'participants',
      headerName: 'Participants',
      width: 120,
      valueGetter: (value, row) => `${row.currentParticipants}/${row.maxParticipants}`,
      sortable: false
    },
    {
      field: 'price',
      headerName: 'Prix',
      width: 100,
      valueFormatter: (params) => `${params.value}€`,
      sortable: true
    },
    {
      field: 'startDate',
      headerName: 'Date/Heure',
      width: 150,
      valueFormatter: (params) => formatDate(params.value),
      sortable: true
    },
    {
      field: 'status',
      headerName: 'Statut',
      width: 120,
      renderCell: (params) => getStatusChip(params.value),
      sortable: true
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 180,
      getActions: (params) => {
        const row = params.row;
        return [
          <GridActionsCellItem
            icon={<Tooltip title="Voir"><ViewIcon /></Tooltip>}
            label="Voir"
            onClick={() => handleOpenDialog('view', row)}
          />,
          <GridActionsCellItem
            icon={<Tooltip title="Modifier"><EditIcon /></Tooltip>}
            label="Modifier"
            onClick={() => handleOpenDialog('edit', row)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title={row.status === 'active' ? 'Suspendre' : 'Activer'}>
                {row.status === 'active' ? <StopIcon /> : <StartIcon />}
              </Tooltip>
            }
            label={row.status === 'active' ? 'Suspendre' : 'Activer'}
            onClick={() => handleStatusChange(row.id, row.status === 'active' ? 'suspended' : 'active')}
          />,
          <GridActionsCellItem
            icon={<Tooltip title="Supprimer"><DeleteIcon /></Tooltip>}
            label="Supprimer"
            onClick={() => handleDelete(row.id)}
          />
        ];
      }
    }
  ];

  const renderMissionCard = (mission) => (
    <Grid item xs={12} sm={6} md={4} key={mission.id}>
      <Card className="mission-card">
        <CardContent>
          <Box className="mission-card-header">
            <Typography variant="h6" component="h3" className="mission-title">
              {mission.title}
            </Typography>
            {getStatusChip(mission.status)}
          </Box>
          
          <Typography variant="body2" color="text.secondary" className="mission-description">
            {mission.description}
          </Typography>
          
          <Box className="mission-details">
            <Box className="mission-detail-item">
              <PersonIcon fontSize="small" />
              <Typography variant="body2">{mission.coachName}</Typography>
            </Box>
            
            <Box className="mission-detail-item">
              <LocationIcon fontSize="small" />
              <Typography variant="body2">{mission.location}</Typography>
            </Box>
            
            <Box className="mission-detail-item">
              <ScheduleIcon fontSize="small" />
              <Typography variant="body2">{formatDate(mission.startDate)}</Typography>
            </Box>
            
            <Box className="mission-detail-item">
              <EuroIcon fontSize="small" />
              <Typography variant="body2">{mission.price}€</Typography>
            </Box>
          </Box>
          
          <Box className="mission-participants">
            <Typography variant="body2">
              Participants: {mission.currentParticipants}/{mission.maxParticipants}
            </Typography>
            {getLevelChip(mission.level)}
          </Box>
        </CardContent>
        
        <CardActions className="mission-card-actions">
          <Button size="small" onClick={() => handleOpenDialog('view', mission)}>
            Voir
          </Button>
          <Button size="small" onClick={() => handleOpenDialog('edit', mission)}>
            Modifier
          </Button>
          <IconButton size="small" onClick={() => handleDelete(mission.id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <div className="missions-page">
      <Box className="missions-header">
        <Typography variant="h4" component="h1" className="page-title">
          Gestion des Missions
        </Typography>
        <Box className="header-actions">
          <Button
            variant={viewMode === 'table' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('table')}
            size="small"
          >
            Tableau
          </Button>
          <Button
            variant={viewMode === 'cards' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('cards')}
            size="small"
          >
            Cartes
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('add')}
            className="add-button"
          >
            Ajouter une mission
          </Button>
        </Box>
      </Box>

      {viewMode === 'table' ? (
        <Paper className="missions-table-container">
          <DataGrid
            rows={mockMissions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            loading={loading}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 }
              }
            }}
            className="data-grid"
          />
        </Paper>
      ) : (
        <Grid container spacing={3} className="missions-grid">
          {mockMissions.map(renderMissionCard)}
        </Grid>
      )}

      {/* Dialog pour ajouter/modifier/voir une mission */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        className="mission-dialog"
      >
        <DialogTitle>
          {dialogMode === 'add' && 'Ajouter une mission'}
          {dialogMode === 'edit' && 'Modifier la mission'}
          {dialogMode === 'view' && 'Détails de la mission'}
        </DialogTitle>
        <DialogContent>
          <Box className="dialog-form">
            <TextField
              label="Titre"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              required
            />
            <TextField
              label="Sport"
              value={formData.sport}
              onChange={(e) => handleInputChange('sport', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              required
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              multiline
              rows={3}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Niveau</InputLabel>
              <Select
                value={formData.level}
                onChange={(e) => handleInputChange('level', e.target.value)}
                disabled={dialogMode === 'view'}
                label="Niveau"
              >
                <MenuItem value="beginner">Débutant</MenuItem>
                <MenuItem value="intermediate">Intermédiaire</MenuItem>
                <MenuItem value="advanced">Avancé</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Durée"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              placeholder="ex: 1h30"
            />
            <TextField
              label="Lieu"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              required
            />
            <TextField
              label="Participants max"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              required
            />
            <TextField
              label="Prix (€)"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Coach</InputLabel>
              <Select
                value={formData.coachId}
                onChange={(e) => handleInputChange('coachId', e.target.value)}
                disabled={dialogMode === 'view'}
                label="Coach"
              >
                {mockCoaches.map(coach => (
                  <MenuItem key={coach.id} value={coach.id}>
                    {coach.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Date de début"
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Date de fin"
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              InputLabelProps={{ shrink: true }}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Statut</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                disabled={dialogMode === 'view'}
                label="Statut"
              >
                <MenuItem value="draft">Brouillon</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="completed">Terminée</MenuItem>
                <MenuItem value="cancelled">Annulée</MenuItem>
                <MenuItem value="suspended">Suspendue</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Prérequis/Matériel"
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          {dialogMode !== 'view' && (
            <Button onClick={handleSubmit} variant="contained">
              {dialogMode === 'add' ? 'Créer' : 'Modifier'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Missions;