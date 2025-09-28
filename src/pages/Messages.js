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
  ListItemSecondaryAction,
  Badge,
  Menu,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar
} from '@mui/x-data-grid';
import {
  Message as MessageIcon,
  Send as SendIcon,
  Archive as ArchiveIcon,
  Unarchive as UnarchiveIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Flag as FlagIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  PriorityHigh as PriorityIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Attachment as AttachmentIcon,
  Download as DownloadIcon,
  ExpandMore as ExpandMoreIcon,
  Label as LabelIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedConversation,
  archiveConversation,
  unarchiveConversation,
  deleteConversation,
  updateConversationPriority,
  addConversationTag,
  removeConversationTag,
  addMessage,
  deleteMessage,
  editMessage,
  setSelectedReport,
  updateReportStatus,
  deleteReport,
  setSearchQuery,
  setFilters,
  setReportFilters,
  clearFilters,
  clearReportFilters,
  setPagination,
  setSortModel,
  setSelectedTab,
  setLoading,
  setError,
  clearError,
  updateStats
} from '../redux/slices/messagesSlice';
import './Messages.css';

const Messages = () => {
  const dispatch = useDispatch();
  const { 
    conversations,
    filteredConversations,
    selectedConversation,
    reports,
    filteredReports,
    selectedReport,
    loading,
    error,
    searchQuery,
    filters,
    reportFilters,
    pagination,
    sortModel,
    selectedTab,
    stats
  } = useSelector(state => state.messages);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('view'); // 'view', 'compose', 'report'
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  
  const [messageForm, setMessageForm] = useState({
    content: '',
    type: 'text',
    attachments: []
  });

  const [reportForm, setReportForm] = useState({
    reason: '',
    description: '',
    priority: 'medium'
  });

  const priorityColors = {
    high: 'error',
    normal: 'primary',
    low: 'default'
  };

  const statusColors = {
    active: 'success',
    archived: 'default'
  };

  const reportStatusColors = {
    pending: 'warning',
    resolved: 'success',
    dismissed: 'default'
  };

  const reportReasons = [
    { value: 'inappropriate_content', label: 'Contenu inapproprié' },
    { value: 'spam', label: 'Spam' },
    { value: 'harassment', label: 'Harcèlement' },
    { value: 'fraud', label: 'Fraude' },
    { value: 'other', label: 'Autre' }
  ];

  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(updateStats());
    }, 1000);
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    dispatch(setSelectedTab(newValue));
  };

  const handleOpenDialog = (mode, item = null) => {
    setDialogMode(mode);
    if (mode === 'view' && item) {
      dispatch(setSelectedConversation(item));
    } else if (mode === 'report' && item) {
      dispatch(setSelectedReport(item));
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMessageForm({ content: '', type: 'text', attachments: [] });
    setReportForm({ reason: '', description: '', priority: 'medium' });
    dispatch(setSelectedConversation(null));
    dispatch(setSelectedReport(null));
    dispatch(clearError());
  };

  const handleSendMessage = () => {
    if (!messageForm.content.trim()) {
      setSnackbar({
        open: true,
        message: 'Veuillez saisir un message',
        severity: 'error'
      });
      return;
    }

    try {
      dispatch(addMessage({
        conversationId: selectedConversation.id,
        senderId: 'admin',
        senderName: 'Administrateur',
        senderType: 'admin',
        content: messageForm.content,
        type: messageForm.type,
        attachments: messageForm.attachments
      }));
      
      setMessageForm({ content: '', type: 'text', attachments: [] });
      setSnackbar({
        open: true,
        message: 'Message envoyé avec succès',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de l\'envoi du message',
        severity: 'error'
      });
    }
  };

  const handleArchiveConversation = (id) => {
    try {
      dispatch(archiveConversation(id));
      setSnackbar({
        open: true,
        message: 'Conversation archivée',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de l\'archivage',
        severity: 'error'
      });
    }
  };

  const handleUnarchiveConversation = (id) => {
    try {
      dispatch(unarchiveConversation(id));
      setSnackbar({
        open: true,
        message: 'Conversation désarchivée',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors du désarchivage',
        severity: 'error'
      });
    }
  };

  const handleDeleteConversation = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette conversation ?')) {
      try {
        dispatch(deleteConversation(id));
        setSnackbar({
          open: true,
          message: 'Conversation supprimée',
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

  const handleUpdatePriority = (id, priority) => {
    try {
      dispatch(updateConversationPriority({ id, priority }));
      setSnackbar({
        open: true,
        message: `Priorité mise à jour vers ${priority}`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la mise à jour',
        severity: 'error'
      });
    }
  };

  const handleReportAction = (id, status, resolution = null) => {
    try {
      dispatch(updateReportStatus({ 
        id, 
        status, 
        resolution,
        reviewedBy: 'admin'
      }));
      setSnackbar({
        open: true,
        message: `Signalement ${status === 'resolved' ? 'résolu' : 'rejeté'}`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la mise à jour',
        severity: 'error'
      });
    }
  };

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  const handleFilterChange = (filterName, value) => {
    if (selectedTab === 0) {
      dispatch(setFilters({ [filterName]: value }));
    } else {
      dispatch(setReportFilters({ [filterName]: value }));
    }
  };

  const handleClearFilters = () => {
    if (selectedTab === 0) {
      dispatch(clearFilters());
    } else {
      dispatch(clearReportFilters());
    }
  };

  const conversationColumns = [
    {
      field: 'participants',
      headerName: 'Participants',
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Stack direction="row" spacing={-1}>
            {params.value.map((participant, index) => (
              <Avatar
                key={participant.id}
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: participant.type === 'professional' ? 'primary.main' : 'secondary.main',
                  zIndex: params.value.length - index
                }}
              >
                {participant.type === 'professional' ? <PersonIcon /> : <BusinessIcon />}
              </Avatar>
            ))}
          </Stack>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {params.value.map(p => p.name).join(' & ')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.missionTitle}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'lastMessage',
      headerName: 'Dernier message',
      width: 300,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" noWrap>
            {params.value.content}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(params.value.timestamp).toLocaleString()}
          </Typography>
        </Box>
      )
    },
    {
      field: 'unreadCount',
      headerName: 'Non lus',
      width: 100,
      renderCell: (params) => (
        params.value > 0 ? (
          <Badge badgeContent={params.value} color="error">
            <MessageIcon />
          </Badge>
        ) : (
          <MessageIcon color="disabled" />
        )
      )
    },
    {
      field: 'priority',
      headerName: 'Priorité',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={priorityColors[params.value]}
          icon={<PriorityIcon />}
        />
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
          variant={params.value === 'archived' ? 'outlined' : 'filled'}
        />
      )
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {params.value.slice(0, 2).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          ))}
          {params.value.length > 2 && (
            <Chip
              label={`+${params.value.length - 2}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          )}
        </Box>
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
          icon={params.row.archived ? <UnarchiveIcon /> : <ArchiveIcon />}
          label={params.row.archived ? "Désarchiver" : "Archiver"}
          onClick={() => params.row.archived ? 
            handleUnarchiveConversation(params.row.id) : 
            handleArchiveConversation(params.row.id)
          }
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Supprimer"
          onClick={() => handleDeleteConversation(params.row.id)}
          showInMenu
        />
      ]
    }
  ];

  const reportColumns = [
    {
      field: 'reporterName',
      headerName: 'Signalé par',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'warning.main' }}>
            {params.row.reporterType === 'professional' ? <PersonIcon /> : <BusinessIcon />}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.reporterType}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'reportedUserName',
      headerName: 'Utilisateur signalé',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'error.main' }}>
            {params.row.reportedUserType === 'professional' ? <PersonIcon /> : <BusinessIcon />}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.reportedUserType}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'reason',
      headerName: 'Motif',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={reportReasons.find(r => r.value === params.value)?.label || params.value}
          size="small"
          color="warning"
          variant="outlined"
        />
      )
    },
    {
      field: 'priority',
      headerName: 'Priorité',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={priorityColors[params.value]}
          icon={<PriorityIcon />}
        />
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
          color={reportStatusColors[params.value]}
        />
      )
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
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
          onClick={() => handleOpenDialog('report', params.row)}
        />,
        <GridActionsCellItem
          icon={<CheckCircleIcon />}
          label="Résoudre"
          onClick={() => handleReportAction(params.row.id, 'resolved', 'Signalement traité par l\'administration')}
          disabled={params.row.status !== 'pending'}
        />,
        <GridActionsCellItem
          icon={<CancelIcon />}
          label="Rejeter"
          onClick={() => handleReportAction(params.row.id, 'dismissed', 'Signalement non fondé')}
          disabled={params.row.status !== 'pending'}
          showInMenu
        />
      ]
    }
  ];

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`messages-tabpanel-${index}`}
      aria-labelledby={`messages-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box className="messages-page">
      {/* En-tête */}
      <Box className="header-section">
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion des Messages
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Surveillez et gérez les communications entre utilisateurs
        </Typography>
      </Box>

      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <MessageIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">{stats.totalConversations}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Conversations totales
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <CheckCircleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">{stats.activeConversations}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Conversations actives
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <FlagIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">{stats.pendingReports}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Signalements en attente
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <ScheduleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">{stats.averageResponseTime}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Temps de réponse moyen
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Onglets */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab 
            label={
              <Badge badgeContent={stats.unreadMessages} color="error">
                Conversations
              </Badge>
            } 
          />
          <Tab 
            label={
              <Badge badgeContent={stats.pendingReports} color="warning">
                Signalements
              </Badge>
            } 
          />
        </Tabs>

        {/* Onglet Conversations */}
        <TabPanel value={selectedTab} index={0}>
          {/* Filtres pour conversations */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Rechercher une conversation..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
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
                    <MenuItem value="archived">Archivé</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Priorité</InputLabel>
                  <Select
                    value={filters.priority}
                    label="Priorité"
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                  >
                    <MenuItem value="all">Toutes</MenuItem>
                    <MenuItem value="high">Haute</MenuItem>
                    <MenuItem value="normal">Normale</MenuItem>
                    <MenuItem value="low">Basse</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={filters.unreadOnly}
                      onChange={(e) => handleFilterChange('unreadOnly', e.target.checked)}
                    />
                  }
                  label="Non lus uniquement"
                />
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
            </Grid>
          </Paper>

          {/* Tableau des conversations */}
          <Paper sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredConversations}
              columns={conversationColumns}
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
        </TabPanel>

        {/* Onglet Signalements */}
        <TabPanel value={selectedTab} index={1}>
          {/* Filtres pour signalements */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Statut</InputLabel>
                  <Select
                    value={reportFilters.status}
                    label="Statut"
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <MenuItem value="all">Tous</MenuItem>
                    <MenuItem value="pending">En attente</MenuItem>
                    <MenuItem value="resolved">Résolu</MenuItem>
                    <MenuItem value="dismissed">Rejeté</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Priorité</InputLabel>
                  <Select
                    value={reportFilters.priority}
                    label="Priorité"
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                  >
                    <MenuItem value="all">Toutes</MenuItem>
                    <MenuItem value="high">Haute</MenuItem>
                    <MenuItem value="medium">Moyenne</MenuItem>
                    <MenuItem value="low">Basse</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Motif</InputLabel>
                  <Select
                    value={reportFilters.reason}
                    label="Motif"
                    onChange={(e) => handleFilterChange('reason', e.target.value)}
                  >
                    <MenuItem value="all">Tous</MenuItem>
                    {reportReasons.map((reason) => (
                      <MenuItem key={reason.value} value={reason.value}>
                        {reason.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3}>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  size="small"
                  fullWidth
                >
                  Effacer les filtres
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Tableau des signalements */}
          <Paper sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredReports}
              columns={reportColumns}
              loading={loading}
              paginationModel={pagination}
              onPaginationModelChange={(model) => dispatch(setPagination(model))}
              sortModel={sortModel}
              onSortModelChange={(model) => dispatch(setSortModel(model))}
              slots={{ toolbar: GridToolbar }}
              disableRowSelectionOnClick
              sx={{
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none'
                }
              }}
            />
          </Paper>
        </TabPanel>
      </Paper>

      {/* Dialog pour voir une conversation */}
      <Dialog
        open={openDialog && dialogMode === 'view'}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Conversation - {selectedConversation?.missionTitle}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {selectedConversation && (
            <>
              {/* Informations de la conversation */}
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Participants
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {selectedConversation.participants.map((participant) => (
                          <Chip
                            key={participant.id}
                            label={participant.name}
                            avatar={
                              <Avatar>
                                {participant.type === 'professional' ? <PersonIcon /> : <BusinessIcon />}
                              </Avatar>
                            }
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Priorité
                      </Typography>
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                          value={selectedConversation.priority}
                          onChange={(e) => handleUpdatePriority(selectedConversation.id, e.target.value)}
                        >
                          <MenuItem value="high">Haute</MenuItem>
                          <MenuItem value="normal">Normale</MenuItem>
                          <MenuItem value="low">Basse</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Zone de réponse */}
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Envoyer un message
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Tapez votre message..."
                    value={messageForm.content}
                    onChange={(e) => setMessageForm({ ...messageForm, content: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      startIcon={<AttachmentIcon />}
                      size="small"
                      variant="outlined"
                    >
                      Joindre un fichier
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<SendIcon />}
                      onClick={handleSendMessage}
                    >
                      Envoyer
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog pour voir un signalement */}
      <Dialog
        open={openDialog && dialogMode === 'report'}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Détails du signalement
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {selectedReport && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Informations du signalement
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Signalé par
                      </Typography>
                      <Typography variant="body1">
                        {selectedReport.reporterName} ({selectedReport.reporterType})
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Utilisateur signalé
                      </Typography>
                      <Typography variant="body1">
                        {selectedReport.reportedUserName} ({selectedReport.reportedUserType})
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Motif
                      </Typography>
                      <Chip
                        label={reportReasons.find(r => r.value === selectedReport.reason)?.label}
                        color="warning"
                        size="small"
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Description
                      </Typography>
                      <Typography variant="body1">
                        {selectedReport.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Actions
                    </Typography>
                    {selectedReport.status === 'pending' && (
                      <Stack spacing={2}>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleReportAction(selectedReport.id, 'resolved', 'Signalement traité par l\'administration')}
                          fullWidth
                        >
                          Résoudre le signalement
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={() => handleReportAction(selectedReport.id, 'dismissed', 'Signalement non fondé')}
                          fullWidth
                        >
                          Rejeter le signalement
                        </Button>
                      </Stack>
                    )}
                    {selectedReport.status !== 'pending' && (
                      <Alert severity={selectedReport.status === 'resolved' ? 'success' : 'info'}>
                        <Typography variant="body2">
                          <strong>Statut :</strong> {selectedReport.status}
                        </Typography>
                        {selectedReport.resolution && (
                          <Typography variant="body2">
                            <strong>Résolution :</strong> {selectedReport.resolution}
                          </Typography>
                        )}
                        <Typography variant="body2">
                          <strong>Traité le :</strong> {new Date(selectedReport.reviewedAt).toLocaleString()}
                        </Typography>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
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

export default Messages;