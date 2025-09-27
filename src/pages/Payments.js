import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  Stack
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
  Receipt as ReceiptIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Euro as EuroIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon,
  Payment as PaymentIcon,
  Download as DownloadIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import './Payments.css';

const Payments = () => {
  const dispatch = useDispatch();
  const { payments, loading } = useSelector(state => state.payments || { payments: [], loading: false });
  
  const [open, setOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [viewingPayment, setViewingPayment] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    id: '',
    userId: '',
    userName: '',
    missionId: '',
    missionTitle: '',
    amount: '',
    currency: 'EUR',
    status: 'pending',
    paymentMethod: 'bank_transfer',
    description: '',
    dueDate: '',
    paidDate: '',
    invoiceNumber: '',
    taxAmount: '',
    netAmount: ''
  });

  // Mock data - replace with actual API calls
  const mockPayments = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Jean Dupont',
      userAvatar: '/avatars/jean.jpg',
      missionId: 'mission1',
      missionTitle: 'Formation Football Jeunes',
      amount: 150.00,
      currency: 'EUR',
      status: 'completed',
      paymentMethod: 'bank_transfer',
      description: 'Paiement formation football',
      dueDate: '2024-01-15',
      paidDate: '2024-01-14',
      invoiceNumber: 'INV-2024-001',
      taxAmount: 30.00,
      netAmount: 120.00,
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Marie Martin',
      userAvatar: '/avatars/marie.jpg',
      missionId: 'mission2',
      missionTitle: 'Coaching Tennis Adultes',
      amount: 200.00,
      currency: 'EUR',
      status: 'pending',
      paymentMethod: 'credit_card',
      description: 'Paiement coaching tennis',
      dueDate: '2024-02-01',
      paidDate: null,
      invoiceNumber: 'INV-2024-002',
      taxAmount: 40.00,
      netAmount: 160.00,
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Pierre Durand',
      userAvatar: '/avatars/pierre.jpg',
      missionId: 'mission3',
      missionTitle: 'Arbitrage Match Basketball',
      amount: 75.00,
      currency: 'EUR',
      status: 'failed',
      paymentMethod: 'paypal',
      description: 'Paiement arbitrage basketball',
      dueDate: '2024-01-25',
      paidDate: null,
      invoiceNumber: 'INV-2024-003',
      taxAmount: 15.00,
      netAmount: 60.00,
      createdAt: '2024-01-22'
    }
  ];

  useEffect(() => {
    // Load payments data
    // dispatch(fetchPayments());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPayment) {
      // dispatch(updatePayment({ id: editingPayment.id, ...formData }));
      setSnackbar({ open: true, message: 'Paiement mis à jour avec succès', severity: 'success' });
    } else {
      // dispatch(createPayment(formData));
      setSnackbar({ open: true, message: 'Paiement créé avec succès', severity: 'success' });
    }
    
    handleClose();
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setFormData({
      ...payment,
      dueDate: payment.dueDate || '',
      paidDate: payment.paidDate || ''
    });
    setOpen(true);
  };

  const handleView = (payment) => {
    setViewingPayment(payment);
  };

  const handleDelete = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    // dispatch(deletePayment(deleteConfirm));
    setSnackbar({ open: true, message: 'Paiement supprimé avec succès', severity: 'success' });
    setDeleteConfirm(null);
  };

  const handleStatusChange = (id, newStatus) => {
    // dispatch(updatePaymentStatus({ id, status: newStatus }));
    setSnackbar({ open: true, message: `Statut du paiement mis à jour: ${newStatus}`, severity: 'success' });
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPayment(null);
    setFormData({
      id: '',
      userId: '',
      userName: '',
      missionId: '',
      missionTitle: '',
      amount: '',
      currency: 'EUR',
      status: 'pending',
      paymentMethod: 'bank_transfer',
      description: '',
      dueDate: '',
      paidDate: '',
      invoiceNumber: '',
      taxAmount: '',
      netAmount: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      case 'cancelled': return 'default';
      case 'refunded': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon />;
      case 'pending': return <PendingIcon />;
      case 'failed': return <CancelIcon />;
      case 'cancelled': return <CancelIcon />;
      case 'refunded': return <ReceiptIcon />;
      default: return <PendingIcon />;
    }
  };

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'bank_transfer': return 'Virement bancaire';
      case 'credit_card': return 'Carte de crédit';
      case 'paypal': return 'PayPal';
      case 'cash': return 'Espèces';
      case 'check': return 'Chèque';
      default: return method;
    }
  };

  const formatCurrency = (amount, currency = 'EUR') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const columns = [
    {
      field: 'invoiceNumber',
      headerName: 'N° Facture',
      width: 130,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ReceiptIcon color="primary" fontSize="small" />
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'userName',
      headerName: 'Utilisateur',
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            src={params.row.userAvatar}
            sx={{ width: 32, height: 32 }}
          >
            <PersonIcon />
          </Avatar>
          <Typography variant="body2">
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'missionTitle',
      headerName: 'Mission',
      width: 200,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography variant="body2" noWrap>
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: 'amount',
      headerName: 'Montant',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <EuroIcon color="primary" fontSize="small" />
          <Typography variant="body2" fontWeight="medium">
            {formatCurrency(params.value, params.row.currency)}
          </Typography>
        </Box>
      )
    },
    {
      field: 'status',
      headerName: 'Statut',
      width: 130,
      renderCell: (params) => (
        <Chip
          icon={getStatusIcon(params.value)}
          label={params.value === 'completed' ? 'Payé' :
                 params.value === 'pending' ? 'En attente' :
                 params.value === 'failed' ? 'Échec' :
                 params.value === 'cancelled' ? 'Annulé' :
                 params.value === 'refunded' ? 'Remboursé' : params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      )
    },
    {
      field: 'paymentMethod',
      headerName: 'Méthode',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2">
          {getPaymentMethodLabel(params.value)}
        </Typography>
      )
    },
    {
      field: 'dueDate',
      headerName: 'Échéance',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CalendarIcon color="action" fontSize="small" />
          <Typography variant="body2">
            {formatDate(params.value)}
          </Typography>
        </Box>
      )
    },
    {
      field: 'paidDate',
      headerName: 'Date de paiement',
      width: 140,
      renderCell: (params) => (
        <Typography variant="body2">
          {formatDate(params.value)}
        </Typography>
      )
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
              <Tooltip title="Voir les détails">
                <ViewIcon />
              </Tooltip>
            }
            label="Voir"
            onClick={() => handleView(row)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Modifier">
                <EditIcon />
              </Tooltip>
            }
            label="Modifier"
            onClick={() => handleEdit(row)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Télécharger la facture">
                <DownloadIcon />
              </Tooltip>
            }
            label="Télécharger"
            onClick={() => {
              setSnackbar({ open: true, message: 'Téléchargement de la facture...', severity: 'info' });
            }}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Supprimer">
                <DeleteIcon />
              </Tooltip>
            }
            label="Supprimer"
            onClick={() => handleDelete(params.id)}
            showInMenu
          />
        ];
      }
    }
  ];

  return (
    <div className="payments-page">
      <div className="payments-header">
        <Typography variant="h4" className="page-title">
          Gestion des Paiements
        </Typography>
        <div className="header-actions">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            className="add-button"
          >
            Nouveau Paiement
          </Button>
        </div>
      </div>

      <Paper className="payments-table-container">
        <DataGrid
          rows={mockPayments}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          loading={loading}
          className="data-grid"
          components={{
            Toolbar: GridToolbar
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }
            }
          }}
        />
      </Paper>

      {/* Add/Edit Payment Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        className="payment-dialog"
      >
        <DialogTitle>
          {editingPayment ? 'Modifier le Paiement' : 'Nouveau Paiement'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div className="dialog-form">
              <TextField
                name="invoiceNumber"
                label="Numéro de facture"
                value={formData.invoiceNumber}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="userName"
                label="Nom de l'utilisateur"
                value={formData.userName}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="missionTitle"
                label="Titre de la mission"
                value={formData.missionTitle}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                name="amount"
                label="Montant total"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                required
                fullWidth
                InputProps={{
                  startAdornment: <EuroIcon color="action" />
                }}
              />
              <TextField
                name="netAmount"
                label="Montant HT"
                type="number"
                value={formData.netAmount}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="taxAmount"
                label="Montant TVA"
                type="number"
                value={formData.taxAmount}
                onChange={handleInputChange}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  label="Statut"
                >
                  <MenuItem value="pending">En attente</MenuItem>
                  <MenuItem value="completed">Payé</MenuItem>
                  <MenuItem value="failed">Échec</MenuItem>
                  <MenuItem value="cancelled">Annulé</MenuItem>
                  <MenuItem value="refunded">Remboursé</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Méthode de paiement</InputLabel>
                <Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  label="Méthode de paiement"
                >
                  <MenuItem value="bank_transfer">Virement bancaire</MenuItem>
                  <MenuItem value="credit_card">Carte de crédit</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                  <MenuItem value="cash">Espèces</MenuItem>
                  <MenuItem value="check">Chèque</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="dueDate"
                label="Date d'échéance"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="paidDate"
                label="Date de paiement"
                type="date"
                value={formData.paidDate}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained">
              {editingPayment ? 'Mettre à jour' : 'Créer'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* View Payment Details Dialog */}
      <Dialog
        open={!!viewingPayment}
        onClose={() => setViewingPayment(null)}
        maxWidth="md"
        fullWidth
        className="payment-dialog"
      >
        <DialogTitle>
          Détails du Paiement - {viewingPayment?.invoiceNumber}
        </DialogTitle>
        <DialogContent>
          {viewingPayment && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Informations générales
                    </Typography>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon color="primary" />
                        <Typography><strong>Utilisateur:</strong> {viewingPayment.userName}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AssignmentIcon color="primary" />
                        <Typography><strong>Mission:</strong> {viewingPayment.missionTitle}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PaymentIcon color="primary" />
                        <Typography><strong>Méthode:</strong> {getPaymentMethodLabel(viewingPayment.paymentMethod)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getStatusIcon(viewingPayment.status)}
                        <Typography><strong>Statut:</strong></Typography>
                        <Chip
                          label={viewingPayment.status === 'completed' ? 'Payé' :
                                 viewingPayment.status === 'pending' ? 'En attente' :
                                 viewingPayment.status === 'failed' ? 'Échec' :
                                 viewingPayment.status === 'cancelled' ? 'Annulé' :
                                 viewingPayment.status === 'refunded' ? 'Remboursé' : viewingPayment.status}
                          color={getStatusColor(viewingPayment.status)}
                          size="small"
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Détails financiers
                    </Typography>
                    <Stack spacing={2}>
                      <Typography><strong>Montant HT:</strong> {formatCurrency(viewingPayment.netAmount)}</Typography>
                      <Typography><strong>TVA:</strong> {formatCurrency(viewingPayment.taxAmount)}</Typography>
                      <Divider />
                      <Typography variant="h6"><strong>Total TTC:</strong> {formatCurrency(viewingPayment.amount)}</Typography>
                      <Typography><strong>Date d'échéance:</strong> {formatDate(viewingPayment.dueDate)}</Typography>
                      {viewingPayment.paidDate && (
                        <Typography><strong>Date de paiement:</strong> {formatDate(viewingPayment.paidDate)}</Typography>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              {viewingPayment.description && (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Description
                      </Typography>
                      <Typography>{viewingPayment.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<DownloadIcon />}
            onClick={() => {
              setSnackbar({ open: true, message: 'Téléchargement de la facture...', severity: 'info' });
            }}
          >
            Télécharger la facture
          </Button>
          <Button
            startIcon={<SendIcon />}
            onClick={() => {
              setSnackbar({ open: true, message: 'Facture envoyée par email', severity: 'success' });
            }}
          >
            Envoyer par email
          </Button>
          <Button onClick={() => setViewingPayment(null)}>Fermer</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer ce paiement ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Annuler</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
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

export default Payments;