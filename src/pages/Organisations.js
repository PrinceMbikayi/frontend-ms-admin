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
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Divider,
  Stack,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
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
  Block as BlockIcon,
  CheckCircle as ActiveIcon,
  Verified as VerifiedIcon,
  Pending as PendingIcon,
  Cancel as RejectedIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as WebsiteIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Euro as EuroIcon,
  Star as StarIcon,
  Description as DocumentIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Close as CloseIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedOrganisation,
  addOrganisation,
  updateOrganisation,
  deleteOrganisation,
  updateOrganisationStatus,
  updateVerificationStatus,
  setSearchQuery,
  setFilters,
  clearFilters,
  setPagination,
  setSortModel,
  setLoading,
  setError,
  clearError
} from '../redux/slices/organisationsSlice';
import './Organisations.css';

const Organisations = () => {
  const dispatch = useDispatch();
  const { 
    organisations, 
    filteredOrganisations, 
    selectedOrganisation, 
    loading, 
    error, 
    searchQuery, 
    filters, 
    pagination, 
    sortModel 
  } = useSelector(state => state.organisations);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedTab, setSelectedTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    website: '',
    description: '',
    disciplines: [],
    memberCount: 0,
    foundedYear: new Date().getFullYear(),
    status: 'active',
    verificationStatus: 'pending'
  });

  const organisationTypes = [
    'Club de Football',
    'Club de Basketball',
    'Club de Tennis',
    'Centre médical',
    'École de sport',
    'Équipement public',
    'Salle de sport',
    'Piscine',
    'Centre de rééducation',
    'Autre'
  ];

  const availableDisciplines = [
    'Football', 'Basketball', 'Tennis', 'Natation', 'Fitness', 'Musculation',
    'Kinésithérapie', 'Rééducation', 'Préparation physique', 'Yoga', 'Pilates',
    'Crossfit', 'Aquagym', 'Water-polo', 'Tennis de table', 'Badminton'
  ];

  const statusColors = {
    active: 'success',
    suspended: 'error',
    pending: 'warning'
  };

  const verificationColors = {
    verified: 'success',
    pending: 'warning',
    rejected: 'error'
  };

  const statusIcons = {
    active: <ActiveIcon />,
    suspended: <BlockIcon />,
    pending: <PendingIcon />
  };

  const verificationIcons = {
    verified: <VerifiedIcon />,
    pending: <PendingIcon />,
    rejected: <RejectedIcon />
  };

  useEffect(() => {
    // Simulation du chargement des données
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const handleOpenDialog = (mode, organisation = null) => {
    setDialogMode(mode);
    if (organisation) {
      setFormData({
        name: organisation.name || '',
        type: organisation.type || '',
        email: organisation.email || '',
        phone: organisation.phone || '',
        address: organisation.address || '',
        city: organisation.city || '',
        postalCode: organisation.postalCode || '',
        country: organisation.country || 'France',
        website: organisation.website || '',
        description: organisation.description || '',
        disciplines: organisation.disciplines || [],
        memberCount: organisation.memberCount || 0,
        foundedYear: organisation.foundedYear || new Date().getFullYear(),
        status: organisation.status || 'active',
        verificationStatus: organisation.verificationStatus || 'pending'
      });
      dispatch(setSelectedOrganisation(organisation));
    } else {
      setFormData({
        name: '',
        type: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'France',
        website: '',
        description: '',
        disciplines: [],
        memberCount: 0,
        foundedYear: new Date().getFullYear(),
        status: 'active',
        verificationStatus: 'pending'
      });
      dispatch(setSelectedOrganisation(null));
    }
    setSelectedTab(0);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name: '',
      type: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'France',
      website: '',
      description: '',
      disciplines: [],
      memberCount: 0,
      foundedYear: new Date().getFullYear(),
      status: 'active',
      verificationStatus: 'pending'
    });
    dispatch(setSelectedOrganisation(null));
    dispatch(clearError());
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.type) {
      setSnackbar({
        open: true,
        message: 'Veuillez remplir tous les champs obligatoires',
        severity: 'error'
      });
      return;
    }

    try {
      if (dialogMode === 'add') {
        dispatch(addOrganisation(formData));
        setSnackbar({
          open: true,
          message: 'Organisation ajoutée avec succès',
          severity: 'success'
        });
      } else if (dialogMode === 'edit') {
        dispatch(updateOrganisation({ id: selectedOrganisation.id, ...formData }));
        setSnackbar({
          open: true,
          message: 'Organisation mise à jour avec succès',
          severity: 'success'
        });
      }
      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de l\'opération',
        severity: 'error'
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette organisation ?')) {
      try {
        dispatch(deleteOrganisation(id));
        setSnackbar({
          open: true,
          message: 'Organisation supprimée avec succès',
          severity: 'success'
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Erreur lors de la suppression',
          severity: 'error'
        });
      }
    }
  };

  const handleStatusChange = (id, newStatus) => {
    try {
      dispatch(updateOrganisationStatus({ id, status: newStatus }));
      setSnackbar({
        open: true,
        message: `Statut mis à jour vers ${newStatus}`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la mise à jour du statut',
        severity: 'error'
      });
    }
  };

  const handleVerificationChange = (id, newVerificationStatus) => {
    try {
      dispatch(updateVerificationStatus({ id, verificationStatus: newVerificationStatus }));
      setSnackbar({
        open: true,
        message: `Vérification mise à jour vers ${newVerificationStatus}`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la mise à jour de la vérification',
        severity: 'error'
      });
    }
  };

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilters({ [filterName]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Nom',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            <BusinessIcon fontSize="small" />
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.type}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      renderCell: (params) => (
        <Typography variant="body2" color="primary">
          {params.value}
        </Typography>
      )
    },
    {
      field: 'city',
      headerName: 'Ville',
      width: 120
    },
    {
      field: 'memberCount',
      headerName: 'Membres',
      width: 100,
      type: 'number',
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          icon={<PeopleIcon />}
          variant="outlined"
        />
      )
    },
    {
      field: 'totalMissions',
      headerName: 'Missions',
      width: 100,
      type: 'number',
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          icon={<AssignmentIcon />}
          variant="outlined"
          color="primary"
        />
      )
    },
    {
      field: 'rating',
      headerName: 'Note',
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <StarIcon fontSize="small" color="warning" />
          <Typography variant="body2">
            {params.value.toFixed(1)}
          </Typography>
        </Box>
      )
    },
    {
      field: 'status',
      headerName: 'Statut',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={statusColors[params.value]}
          icon={statusIcons[params.value]}
        />
      )
    },
    {
      field: 'verificationStatus',
      headerName: 'Vérification',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={verificationColors[params.value]}
          icon={verificationIcons[params.value]}
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="Voir"
          onClick={() => handleOpenDialog('view', params.row)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Modifier"
          onClick={() => handleOpenDialog('edit', params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Supprimer"
          onClick={() => handleDelete(params.row.id)}
          showInMenu
        />
      ]
    }
  ];

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`organisation-tabpanel-${index}`}
      aria-labelledby={`organisation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box className="organisations-page">
      {/* En-tête */}
      <Box className="header-section">
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion des Organisations
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Gérez les clubs, centres sportifs et organisations partenaires
        </Typography>
      </Box>

      {/* Filtres et actions */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Rechercher une organisation..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Statut</InputLabel>
              <Select
                value={filters.status}
                label="Statut"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="all">Tous</MenuItem>
                <MenuItem value="active">Actif</MenuItem>
                <MenuItem value="suspended">Suspendu</MenuItem>
                <MenuItem value="pending">En attente</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Vérification</InputLabel>
              <Select
                value={filters.verificationStatus}
                label="Vérification"
                onChange={(e) => handleFilterChange('verificationStatus', e.target.value)}
              >
                <MenuItem value="all">Tous</MenuItem>
                <MenuItem value="verified">Vérifié</MenuItem>
                <MenuItem value="pending">En attente</MenuItem>
                <MenuItem value="rejected">Rejeté</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.type}
                label="Type"
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <MenuItem value="all">Tous</MenuItem>
                {organisationTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={1}>
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              size="small"
            >
              Effacer
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('add')}
              fullWidth
            >
              Ajouter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tableau des organisations */}
      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredOrganisations}
          columns={columns}
          loading={loading}
          paginationModel={pagination}
          onPaginationModelChange={(model) => dispatch(setPagination(model))}
          sortModel={sortModel}
          onSortModelChange={(model) => dispatch(setSortModel(model))}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }
            }
          }}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
        />
      </Paper>

      {/* Dialog pour ajouter/modifier/voir une organisation */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              {dialogMode === 'add' && 'Ajouter une organisation'}
              {dialogMode === 'edit' && 'Modifier l\'organisation'}
              {dialogMode === 'view' && 'Détails de l\'organisation'}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
            <Tab label="Informations générales" />
            <Tab label="Contacts & Documents" />
            <Tab label="Statistiques" />
          </Tabs>

          {/* Onglet Informations générales */}
          <TabPanel value={selectedTab} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nom de l'organisation *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Type d'organisation *</InputLabel>
                  <Select
                    value={formData.type}
                    label="Type d'organisation *"
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    disabled={dialogMode === 'view'}
                  >
                    {organisationTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email *"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Adresse"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Ville"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Code postal"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Pays"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Site web"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Année de fondation"
                  type="number"
                  value={formData.foundedYear}
                  onChange={(e) => setFormData({ ...formData, foundedYear: parseInt(e.target.value) })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre de membres"
                  type="number"
                  value={formData.memberCount}
                  onChange={(e) => setFormData({ ...formData, memberCount: parseInt(e.target.value) })}
                  disabled={dialogMode === 'view'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Disciplines</InputLabel>
                  <Select
                    multiple
                    value={formData.disciplines}
                    label="Disciplines"
                    onChange={(e) => setFormData({ ...formData, disciplines: e.target.value })}
                    disabled={dialogMode === 'view'}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {availableDisciplines.map((discipline) => (
                      <MenuItem key={discipline} value={discipline}>
                        {discipline}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Onglet Contacts & Documents */}
          <TabPanel value={selectedTab} index={1}>
            {selectedOrganisation && (
              <>
                <Typography variant="h6" gutterBottom>
                  Contacts
                </Typography>
                <List>
                  {selectedOrganisation.contacts?.map((contact) => (
                    <ListItem key={contact.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={contact.name}
                        secondary={`${contact.role} - ${contact.email} - ${contact.phone}`}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Documents
                </Typography>
                <List>
                  {selectedOrganisation.documents?.map((document) => (
                    <ListItem key={document.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <DocumentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={document.name}
                        secondary={`${document.type} - ${new Date(document.uploadedAt).toLocaleDateString()}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end">
                          <DownloadIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </TabPanel>

          {/* Onglet Statistiques */}
          <TabPanel value={selectedTab} index={2}>
            {selectedOrganisation && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Missions
                      </Typography>
                      <Typography variant="h4" color="primary">
                        {selectedOrganisation.totalMissions}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total des missions
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          Actives: {selectedOrganisation.activeMissions}
                        </Typography>
                        <Typography variant="body2">
                          Terminées: {selectedOrganisation.completedMissions}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Dépenses
                      </Typography>
                      <Typography variant="h4" color="success.main">
                        {selectedOrganisation.totalSpent?.toLocaleString()} €
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total dépensé
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Évaluation
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h4" color="warning.main">
                          {selectedOrganisation.rating?.toFixed(1)}
                        </Typography>
                        <StarIcon color="warning" />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Note moyenne
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Activité
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedOrganisation.lastActivity).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Dernière activité
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </TabPanel>
        </DialogContent>

        <DialogActions>
          {dialogMode === 'view' && selectedOrganisation && (
            <>
              <FormControl size="small" sx={{ minWidth: 120, mr: 1 }}>
                <InputLabel>Statut</InputLabel>
                <Select
                  value={selectedOrganisation.status}
                  label="Statut"
                  onChange={(e) => handleStatusChange(selectedOrganisation.id, e.target.value)}
                >
                  <MenuItem value="active">Actif</MenuItem>
                  <MenuItem value="suspended">Suspendu</MenuItem>
                  <MenuItem value="pending">En attente</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
                <InputLabel>Vérification</InputLabel>
                <Select
                  value={selectedOrganisation.verificationStatus}
                  label="Vérification"
                  onChange={(e) => handleVerificationChange(selectedOrganisation.id, e.target.value)}
                >
                  <MenuItem value="verified">Vérifié</MenuItem>
                  <MenuItem value="pending">En attente</MenuItem>
                  <MenuItem value="rejected">Rejeté</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          <Button onClick={handleCloseDialog}>
            Annuler
          </Button>
          {dialogMode !== 'view' && (
            <Button onClick={handleSubmit} variant="contained">
              {dialogMode === 'add' ? 'Ajouter' : 'Modifier'}
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
    </Box>
  );
};

export default Organisations;