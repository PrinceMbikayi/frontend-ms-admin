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
  Snackbar
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
  CheckCircle as ActiveIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import './Users.css';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active',
    dateOfBirth: '',
    address: ''
  });

  // Mock data - à remplacer par des appels API
  const mockUsers = [
    {
      id: 1,
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@email.com',
      phone: '+33 6 12 34 56 78',
      role: 'admin',
      status: 'active',
      dateOfBirth: '1985-03-15',
      address: '123 Rue de la Paix, Paris',
      createdAt: '2024-01-15',
      lastLogin: '2024-03-10'
    },
    {
      id: 2,
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@email.com',
      phone: '+33 6 98 76 54 32',
      role: 'coach',
      status: 'active',
      dateOfBirth: '1990-07-22',
      address: '456 Avenue des Sports, Lyon',
      createdAt: '2024-02-01',
      lastLogin: '2024-03-09'
    },
    {
      id: 3,
      firstName: 'Pierre',
      lastName: 'Durand',
      email: 'pierre.durand@email.com',
      phone: '+33 6 11 22 33 44',
      role: 'user',
      status: 'inactive',
      dateOfBirth: '1988-12-03',
      address: '789 Boulevard du Sport, Marseille',
      createdAt: '2024-01-20',
      lastLogin: '2024-02-15'
    }
  ];

  useEffect(() => {
    // Simuler le chargement des données
    // dispatch(fetchUsers());
  }, [dispatch]);

  const handleOpenDialog = (mode, user = null) => {
    setDialogMode(mode);
    setSelectedUser(user);
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'user',
        status: user.status || 'active',
        dateOfBirth: user.dateOfBirth || '',
        address: user.address || ''
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'user',
        status: 'active',
        dateOfBirth: '',
        address: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (dialogMode === 'add') {
      // dispatch(createUser(formData));
      setSnackbar({
        open: true,
        message: 'Utilisateur créé avec succès',
        severity: 'success'
      });
    } else if (dialogMode === 'edit') {
      // dispatch(updateUser({ id: selectedUser.id, ...formData }));
      setSnackbar({
        open: true,
        message: 'Utilisateur modifié avec succès',
        severity: 'success'
      });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      // dispatch(deleteUser(id));
      setSnackbar({
        open: true,
        message: 'Utilisateur supprimé avec succès',
        severity: 'success'
      });
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    // dispatch(updateUserStatus({ id, status: newStatus }));
    setSnackbar({
      open: true,
      message: `Utilisateur ${newStatus === 'active' ? 'activé' : 'désactivé'} avec succès`,
      severity: 'success'
    });
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      active: { label: 'Actif', color: 'success' },
      inactive: { label: 'Inactif', color: 'error' },
      pending: { label: 'En attente', color: 'warning' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const getRoleChip = (role) => {
    const roleConfig = {
      admin: { label: 'Admin', color: 'error' },
      coach: { label: 'Coach', color: 'primary' },
      user: { label: 'Utilisateur', color: 'default' }
    };
    
    const config = roleConfig[role] || roleConfig.user;
    return <Chip label={config.label} color={config.color} size="small" variant="outlined" />;
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      sortable: true
    },
    {
      field: 'fullName',
      headerName: 'Nom complet',
      width: 200,
      valueGetter: (value, row) => `${row.firstName} ${row.lastName}`,
      sortable: true
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      sortable: true
    },
    {
      field: 'phone',
      headerName: 'Téléphone',
      width: 150,
      sortable: false
    },
    {
      field: 'role',
      headerName: 'Rôle',
      width: 120,
      renderCell: (params) => getRoleChip(params.value),
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
      field: 'createdAt',
      headerName: 'Date création',
      width: 130,
      type: 'date',
      valueGetter: (value) => new Date(value),
      sortable: true
    },
    {
      field: 'lastLogin',
      headerName: 'Dernière connexion',
      width: 150,
      type: 'date',
      valueGetter: (value) => value ? new Date(value) : null,
      sortable: true
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => {
        const row = params.row;
        return [
          <GridActionsCellItem
            icon={
              <Tooltip title="Voir">
                <ViewIcon />
              </Tooltip>
            }
            label="Voir"
            onClick={() => handleOpenDialog('view', row)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Modifier">
                <EditIcon />
              </Tooltip>
            }
            label="Modifier"
            onClick={() => handleOpenDialog('edit', row)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title={row.status === 'active' ? 'Désactiver' : 'Activer'}>
                {row.status === 'active' ? <BlockIcon /> : <ActiveIcon />}
              </Tooltip>
            }
            label={row.status === 'active' ? 'Désactiver' : 'Activer'}
            onClick={() => handleToggleStatus(row.id, row.status)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Supprimer">
                <DeleteIcon />
              </Tooltip>
            }
            label="Supprimer"
            onClick={() => handleDelete(row.id)}
          />
        ];
      }
    }
  ];

  return (
    <div className="users-page">
      <Box className="users-header">
        <Typography variant="h4" component="h1" className="page-title">
          Gestion des Utilisateurs
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('add')}
          className="add-button"
        >
          Ajouter un utilisateur
        </Button>
      </Box>

      <Paper className="users-table-container">
        <DataGrid
          rows={mockUsers}
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

      {/* Dialog pour ajouter/modifier/voir un utilisateur */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        className="user-dialog"
      >
        <DialogTitle>
          {dialogMode === 'add' && 'Ajouter un utilisateur'}
          {dialogMode === 'edit' && 'Modifier l\'utilisateur'}
          {dialogMode === 'view' && 'Détails de l\'utilisateur'}
        </DialogTitle>
        <DialogContent>
          <Box className="dialog-form">
            <TextField
              label="Prénom"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              required
            />
            <TextField
              label="Nom"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              required
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              required
            />
            <TextField
              label="Téléphone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Rôle</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                disabled={dialogMode === 'view'}
                label="Rôle"
              >
                <MenuItem value="user">Utilisateur</MenuItem>
                <MenuItem value="coach">Coach</MenuItem>
                <MenuItem value="admin">Administrateur</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Statut</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                disabled={dialogMode === 'view'}
                label="Statut"
              >
                <MenuItem value="active">Actif</MenuItem>
                <MenuItem value="inactive">Inactif</MenuItem>
                <MenuItem value="pending">En attente</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Date de naissance"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Adresse"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              fullWidth
              margin="normal"
              disabled={dialogMode === 'view'}
              multiline
              rows={3}
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

export default Users;