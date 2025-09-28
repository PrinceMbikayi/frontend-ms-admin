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
  Rating,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress
} from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar
} from '@mui/x-data-grid';
import {
  Support as SupportIcon,
  HelpOutline as HelpIcon,
  MenuBook as GuideIcon,
  Assignment as TicketIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  PriorityHigh as PriorityIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Attachment as AttachmentIcon,
  Download as DownloadIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Star as StarIcon,
  Publish as PublishIcon,
  VisibilityOff as UnpublishedIcon,
  AssignmentInd as AssignIcon,
  ExpandMore as ExpandMoreIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedTicket,
  addTicket,
  updateTicket,
  updateTicketStatus,
  assignTicket,
  addTicketResponse,
  deleteTicket,
  setSelectedFaqArticle,
  addFaqArticle,
  updateFaqArticle,
  deleteFaqArticle,
  setSelectedGuide,
  addGuide,
  updateGuide,
  deleteGuide,
  setSearchQuery,
  setFilters,
  setFaqFilters,
  setGuideFilters,
  clearFilters,
  clearFaqFilters,
  clearGuideFilters,
  setPagination,
  setSortModel,
  setSelectedTab,
  setLoading,
  setError,
  clearError,
  updateStats
} from '../redux/slices/supportSlice';
import './Support.css';

const Support = () => {
  const dispatch = useDispatch();
  const { 
    tickets,
    filteredTickets,
    selectedTicket,
    faqArticles,
    filteredFaqArticles,
    selectedFaqArticle,
    guides,
    filteredGuides,
    selectedGuide,
    loading,
    error,
    searchQuery,
    filters,
    faqFilters,
    guideFilters,
    pagination,
    sortModel,
    selectedTab,
    stats
  } = useSelector(state => state.support);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('view'); // 'view', 'add', 'edit'
  const [dialogType, setDialogType] = useState('ticket'); // 'ticket', 'faq', 'guide'
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    category: 'technical',
    priority: 'medium',
    assignedTo: '',
    assignedToName: ''
  });

  const [faqForm, setFaqForm] = useState({
    title: '',
    content: '',
    category: 'account',
    subcategory: '',
    tags: [],
    isPublished: false
  });

  const [guideForm, setGuideForm] = useState({
    title: '',
    description: '',
    content: '',
    category: 'professional',
    difficulty: 'beginner',
    estimatedReadTime: 10,
    isPublished: false,
    tags: []
  });

  const [responseForm, setResponseForm] = useState({
    content: '',
    isInternal: false
  });

  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'success'
  };

  const statusColors = {
    open: 'error',
    in_progress: 'warning',
    resolved: 'success',
    closed: 'default'
  };

  const categoryLabels = {
    technical: 'Technique',
    billing: 'Facturation',
    account: 'Compte',
    bug: 'Bug',
    feature: 'Fonctionnalité',
    other: 'Autre'
  };

  const difficultyLabels = {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé'
  };

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

  const handleOpenDialog = (mode, type, item = null) => {
    setDialogMode(mode);
    setDialogType(type);
    
    if (mode === 'view' || mode === 'edit') {
      if (type === 'ticket' && item) {
        dispatch(setSelectedTicket(item));
        if (mode === 'edit') {
          setTicketForm({
            title: item.title,
            description: item.description,
            category: item.category,
            priority: item.priority,
            assignedTo: item.assignedTo || '',
            assignedToName: item.assignedToName || ''
          });
        }
      } else if (type === 'faq' && item) {
        dispatch(setSelectedFaqArticle(item));
        if (mode === 'edit') {
          setFaqForm({
            title: item.title,
            content: item.content,
            category: item.category,
            subcategory: item.subcategory,
            tags: item.tags,
            isPublished: item.isPublished
          });
        }
      } else if (type === 'guide' && item) {
        dispatch(setSelectedGuide(item));
        if (mode === 'edit') {
          setGuideForm({
            title: item.title,
            description: item.description,
            content: item.content,
            category: item.category,
            difficulty: item.difficulty,
            estimatedReadTime: item.estimatedReadTime,
            isPublished: item.isPublished,
            tags: item.tags
          });
        }
      }
    }
    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTicketForm({
      title: '',
      description: '',
      category: 'technical',
      priority: 'medium',
      assignedTo: '',
      assignedToName: ''
    });
    setFaqForm({
      title: '',
      content: '',
      category: 'account',
      subcategory: '',
      tags: [],
      isPublished: false
    });
    setGuideForm({
      title: '',
      description: '',
      content: '',
      category: 'professional',
      difficulty: 'beginner',
      estimatedReadTime: 10,
      isPublished: false,
      tags: []
    });
    setResponseForm({
      content: '',
      isInternal: false
    });
    dispatch(setSelectedTicket(null));
    dispatch(setSelectedFaqArticle(null));
    dispatch(setSelectedGuide(null));
    dispatch(clearError());
  };

  const handleSaveTicket = () => {
    if (!ticketForm.title.trim() || !ticketForm.description.trim()) {
      setSnackbar({
        open: true,
        message: 'Veuillez remplir tous les champs obligatoires',
        severity: 'error'
      });
      return;
    }

    try {
      if (dialogMode === 'add') {
        dispatch(addTicket({
          ...ticketForm,
          userId: 999,
          userName: 'Utilisateur Test',
          userEmail: 'test@email.com',
          userType: 'professional',
          status: 'open'
        }));
        setSnackbar({
          open: true,
          message: 'Ticket créé avec succès',
          severity: 'success'
        });
      } else {
        dispatch(updateTicket({
          id: selectedTicket.id,
          updates: ticketForm
        }));
        setSnackbar({
          open: true,
          message: 'Ticket mis à jour avec succès',
          severity: 'success'
        });
      }
      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la sauvegarde',
        severity: 'error'
      });
    }
  };

  const handleSaveFaqArticle = () => {
    if (!faqForm.title.trim() || !faqForm.content.trim()) {
      setSnackbar({
        open: true,
        message: 'Veuillez remplir tous les champs obligatoires',
        severity: 'error'
      });
      return;
    }

    try {
      if (dialogMode === 'add') {
        dispatch(addFaqArticle({
          ...faqForm,
          authorId: 'admin',
          authorName: 'Administrateur'
        }));
        setSnackbar({
          open: true,
          message: 'Article FAQ créé avec succès',
          severity: 'success'
        });
      } else {
        dispatch(updateFaqArticle({
          id: selectedFaqArticle.id,
          updates: faqForm
        }));
        setSnackbar({
          open: true,
          message: 'Article FAQ mis à jour avec succès',
          severity: 'success'
        });
      }
      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la sauvegarde',
        severity: 'error'
      });
    }
  };

  const handleSaveGuide = () => {
    if (!guideForm.title.trim() || !guideForm.content.trim()) {
      setSnackbar({
        open: true,
        message: 'Veuillez remplir tous les champs obligatoires',
        severity: 'error'
      });
      return;
    }

    try {
      if (dialogMode === 'add') {
        dispatch(addGuide({
          ...guideForm,
          authorId: 'admin',
          authorName: 'Administrateur'
        }));
        setSnackbar({
          open: true,
          message: 'Guide créé avec succès',
          severity: 'success'
        });
      } else {
        dispatch(updateGuide({
          id: selectedGuide.id,
          updates: guideForm
        }));
        setSnackbar({
          open: true,
          message: 'Guide mis à jour avec succès',
          severity: 'success'
        });
      }
      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la sauvegarde',
        severity: 'error'
      });
    }
  };

  const handleAddResponse = () => {
    if (!responseForm.content.trim()) {
      setSnackbar({
        open: true,
        message: 'Veuillez saisir une réponse',
        severity: 'error'
      });
      return;
    }

    try {
      dispatch(addTicketResponse({
        ticketId: selectedTicket.id,
        response: {
          ...responseForm,
          authorId: 'admin',
          authorName: 'Administrateur',
          authorType: 'admin'
        }
      }));
      setResponseForm({ content: '', isInternal: false });
      setSnackbar({
        open: true,
        message: 'Réponse ajoutée avec succès',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de l\'ajout de la réponse',
        severity: 'error'
      });
    }
  };

  const handleUpdateTicketStatus = (id, status) => {
    try {
      dispatch(updateTicketStatus({
        id,
        status,
        resolvedAt: status === 'resolved' ? new Date().toISOString() : null
      }));
      setSnackbar({
        open: true,
        message: `Ticket ${status === 'resolved' ? 'résolu' : 'mis à jour'}`,
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

  const handleAssignTicket = (id, assignedTo, assignedToName) => {
    try {
      dispatch(assignTicket({ id, assignedTo, assignedToName }));
      setSnackbar({
        open: true,
        message: 'Ticket assigné avec succès',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de l\'assignation',
        severity: 'error'
      });
    }
  };

  const handleDeleteItem = (type, id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      try {
        if (type === 'ticket') {
          dispatch(deleteTicket(id));
        } else if (type === 'faq') {
          dispatch(deleteFaqArticle(id));
        } else if (type === 'guide') {
          dispatch(deleteGuide(id));
        }
        setSnackbar({
          open: true,
          message: 'Élément supprimé avec succès',
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

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  const handleFilterChange = (filterName, value) => {
    if (selectedTab === 0) {
      dispatch(setFilters({ [filterName]: value }));
    } else if (selectedTab === 1) {
      dispatch(setFaqFilters({ [filterName]: value }));
    } else {
      dispatch(setGuideFilters({ [filterName]: value }));
    }
  };

  const handleClearFilters = () => {
    if (selectedTab === 0) {
      dispatch(clearFilters());
    } else if (selectedTab === 1) {
      dispatch(clearFaqFilters());
    } else {
      dispatch(clearGuideFilters());
    }
  };

  const ticketColumns = [
    {
      field: 'ticketNumber',
      headerName: 'N° Ticket',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="medium" color="primary">
          {params.value}
        </Typography>
      )
    },
    {
      field: 'title',
      headerName: 'Titre',
      width: 250,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="medium" noWrap>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {categoryLabels[params.row.category]}
          </Typography>
        </Box>
      )
    },
    {
      field: 'userName',
      headerName: 'Utilisateur',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            {params.row.userType === 'professional' ? <PersonIcon /> : <BusinessIcon />}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.userType}
            </Typography>
          </Box>
        </Box>
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
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={statusColors[params.value]}
          icon={
            params.value === 'open' ? <PendingIcon /> :
            params.value === 'in_progress' ? <ScheduleIcon /> :
            <CheckCircleIcon />
          }
        />
      )
    },
    {
      field: 'assignedToName',
      headerName: 'Assigné à',
      width: 150,
      renderCell: (params) => (
        params.value ? (
          <Chip
            label={params.value}
            size="small"
            variant="outlined"
            icon={<AssignIcon />}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Non assigné
          </Typography>
        )
      )
    },
    {
      field: 'createdAt',
      headerName: 'Créé le',
      width: 130,
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
          onClick={() => handleOpenDialog('view', 'ticket', params.row)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Modifier"
          onClick={() => handleOpenDialog('edit', 'ticket', params.row)}
        />,
        <GridActionsCellItem
          icon={<CheckCircleIcon />}
          label="Résoudre"
          onClick={() => handleUpdateTicketStatus(params.row.id, 'resolved')}
          disabled={params.row.status === 'resolved'}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Supprimer"
          onClick={() => handleDeleteItem('ticket', params.row.id)}
          showInMenu
        />
      ]
    }
  ];

  const faqColumns = [
    {
      field: 'title',
      headerName: 'Titre',
      width: 300,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {categoryLabels[params.row.category]}
          </Typography>
        </Box>
      )
    },
    {
      field: 'views',
      headerName: 'Vues',
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <VisibilityIcon fontSize="small" color="action" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      )
    },
    {
      field: 'helpful',
      headerName: 'Utile',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ThumbUpIcon fontSize="small" color="success" />
            <Typography variant="body2">{params.value}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ThumbDownIcon fontSize="small" color="error" />
            <Typography variant="body2">{params.row.notHelpful}</Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'isPublished',
      headerName: 'Publié',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Publié' : 'Brouillon'}
          size="small"
          color={params.value ? 'success' : 'default'}
          icon={params.value ? <PublishIcon /> : <UnpublishedIcon />}
        />
      )
    },
    {
      field: 'updatedAt',
      headerName: 'Mis à jour',
      width: 130,
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
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="Voir"
          onClick={() => handleOpenDialog('view', 'faq', params.row)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Modifier"
          onClick={() => handleOpenDialog('edit', 'faq', params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Supprimer"
          onClick={() => handleDeleteItem('faq', params.row.id)}
          showInMenu
        />
      ]
    }
  ];

  const guideColumns = [
    {
      field: 'title',
      headerName: 'Titre',
      width: 250,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.category} • {difficultyLabels[params.row.difficulty]}
          </Typography>
        </Box>
      )
    },
    {
      field: 'estimatedReadTime',
      headerName: 'Temps de lecture',
      width: 140,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <TimeIcon fontSize="small" color="action" />
          <Typography variant="body2">{params.value} min</Typography>
        </Box>
      )
    },
    {
      field: 'views',
      headerName: 'Vues',
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <VisibilityIcon fontSize="small" color="action" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      )
    },
    {
      field: 'downloads',
      headerName: 'Téléchargements',
      width: 140,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <GetAppIcon fontSize="small" color="action" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      )
    },
    {
      field: 'rating',
      headerName: 'Note',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Rating value={params.value} readOnly size="small" />
          <Typography variant="caption">({params.row.ratingCount})</Typography>
        </Box>
      )
    },
    {
      field: 'isPublished',
      headerName: 'Publié',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Publié' : 'Brouillon'}
          size="small"
          color={params.value ? 'success' : 'default'}
          icon={params.value ? <PublishIcon /> : <UnpublishedIcon />}
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ViewIcon />}
          label="Voir"
          onClick={() => handleOpenDialog('view', 'guide', params.row)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Modifier"
          onClick={() => handleOpenDialog('edit', 'guide', params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Supprimer"
          onClick={() => handleDeleteItem('guide', params.row.id)}
          showInMenu
        />
      ]
    }
  ];

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`support-tabpanel-${index}`}
      aria-labelledby={`support-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box className="support-page">
      {/* En-tête */}
      <Box className="header-section">
        <Typography variant="h4" component="h1" gutterBottom>
          Gestion de l'Aide & Support
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Gérez les tickets de support, la FAQ et les guides utilisateurs
        </Typography>
      </Box>

      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <TicketIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">{stats.openTickets}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tickets ouverts
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
                  <ScheduleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">{stats.averageResolutionTime}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Temps de résolution moyen
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
                  <StarIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">{stats.satisfactionScore}/5</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Satisfaction client
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
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">{stats.totalViews}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Vues totales FAQ/Guides
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Onglets */}
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab 
              label={
                <Badge badgeContent={stats.openTickets} color="error">
                  Tickets de Support
                </Badge>
              } 
            />
            <Tab label={`FAQ (${stats.publishedFaqArticles})`} />
            <Tab label={`Guides (${stats.publishedGuides})`} />
          </Tabs>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('add', selectedTab === 0 ? 'ticket' : selectedTab === 1 ? 'faq' : 'guide')}
          >
            {selectedTab === 0 ? 'Nouveau Ticket' : selectedTab === 1 ? 'Nouvel Article' : 'Nouveau Guide'}
          </Button>
        </Box>

        {/* Onglet Tickets */}
        <TabPanel value={selectedTab} index={0}>
          {/* Filtres pour tickets */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Rechercher un ticket..."
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
                    <MenuItem value="open">Ouvert</MenuItem>
                    <MenuItem value="in_progress">En cours</MenuItem>
                    <MenuItem value="resolved">Résolu</MenuItem>
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
                    <MenuItem value="medium">Moyenne</MenuItem>
                    <MenuItem value="low">Basse</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={filters.category}
                    label="Catégorie"
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <MenuItem value="all">Toutes</MenuItem>
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <MenuItem key={key} value={key}>{label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Assigné à</InputLabel>
                  <Select
                    value={filters.assignedTo}
                    label="Assigné à"
                    onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
                  >
                    <MenuItem value="all">Tous</MenuItem>
                    <MenuItem value="unassigned">Non assigné</MenuItem>
                    <MenuItem value="admin1">Sophie Dubois</MenuItem>
                    <MenuItem value="admin2">Thomas Bernard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  size="small"
                  fullWidth
                >
                  Effacer
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Tableau des tickets */}
          <Paper sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredTickets}
              columns={ticketColumns}
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

        {/* Onglet FAQ */}
        <TabPanel value={selectedTab} index={1}>
          {/* Filtres pour FAQ */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={faqFilters.category}
                    label="Catégorie"
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <MenuItem value="all">Toutes</MenuItem>
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <MenuItem key={key} value={key}>{label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Statut</InputLabel>
                  <Select
                    value={faqFilters.isPublished}
                    label="Statut"
                    onChange={(e) => handleFilterChange('isPublished', e.target.value)}
                  >
                    <MenuItem value="all">Tous</MenuItem>
                    <MenuItem value="published">Publié</MenuItem>
                    <MenuItem value="draft">Brouillon</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  size="small"
                >
                  Effacer les filtres
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Tableau des articles FAQ */}
          <Paper sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredFaqArticles}
              columns={faqColumns}
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

        {/* Onglet Guides */}
        <TabPanel value={selectedTab} index={2}>
          {/* Filtres pour guides */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={guideFilters.category}
                    label="Catégorie"
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <MenuItem value="all">Toutes</MenuItem>
                    <MenuItem value="professional">Professionnel</MenuItem>
                    <MenuItem value="organization">Organisation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Difficulté</InputLabel>
                  <Select
                    value={guideFilters.difficulty}
                    label="Difficulté"
                    onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  >
                    <MenuItem value="all">Toutes</MenuItem>
                    {Object.entries(difficultyLabels).map(([key, label]) => (
                      <MenuItem key={key} value={key}>{label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Statut</InputLabel>
                  <Select
                    value={guideFilters.isPublished}
                    label="Statut"
                    onChange={(e) => handleFilterChange('isPublished', e.target.value)}
                  >
                    <MenuItem value="all">Tous</MenuItem>
                    <MenuItem value="published">Publié</MenuItem>
                    <MenuItem value="draft">Brouillon</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  size="small"
                >
                  Effacer les filtres
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Tableau des guides */}
          <Paper sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredGuides}
              columns={guideColumns}
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

      {/* Dialog pour tickets */}
      <Dialog
        open={openDialog && dialogType === 'ticket'}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              {dialogMode === 'view' ? 'Détails du ticket' : 
               dialogMode === 'add' ? 'Nouveau ticket' : 'Modifier le ticket'}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {dialogMode === 'view' && selectedTicket ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {selectedTicket.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedTicket.description}
                    </Typography>
                    
                    {selectedTicket.responses.length > 0 && (
                      <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Réponses
                        </Typography>
                        <List>
                          {selectedTicket.responses.map((response) => (
                            <ListItem key={response.id} alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar>
                                  {response.authorType === 'admin' ? 'A' : 'U'}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="subtitle2">
                                      {response.authorName}
                                    </Typography>
                                    {response.isInternal && (
                                      <Chip label="Interne" size="small" color="warning" />
                                    )}
                                    <Typography variant="caption" color="text.secondary">
                                      {new Date(response.createdAt).toLocaleString()}
                                    </Typography>
                                  </Box>
                                }
                                secondary={response.content}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}
                    
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Ajouter une réponse
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Tapez votre réponse..."
                      value={responseForm.content}
                      onChange={(e) => setResponseForm({ ...responseForm, content: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={responseForm.isInternal}
                            onChange={(e) => setResponseForm({ ...responseForm, isInternal: e.target.checked })}
                          />
                        }
                        label="Note interne"
                      />
                      <Button
                        variant="contained"
                        startIcon={<SendIcon />}
                        onClick={handleAddResponse}
                      >
                        Envoyer
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Informations
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        N° Ticket
                      </Typography>
                      <Typography variant="body1">
                        {selectedTicket.ticketNumber}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Statut
                      </Typography>
                      <Chip
                        label={selectedTicket.status}
                        size="small"
                        color={statusColors[selectedTicket.status]}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Priorité
                      </Typography>
                      <Chip
                        label={selectedTicket.priority}
                        size="small"
                        color={priorityColors[selectedTicket.priority]}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Utilisateur
                      </Typography>
                      <Typography variant="body1">
                        {selectedTicket.userName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedTicket.userEmail}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Assigné à
                      </Typography>
                      <Typography variant="body1">
                        {selectedTicket.assignedToName || 'Non assigné'}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Créé le
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedTicket.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Stack spacing={1} sx={{ width: '100%' }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'resolved')}
                        disabled={selectedTicket.status === 'resolved'}
                      >
                        Marquer comme résolu
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<AssignIcon />}
                        onClick={() => handleAssignTicket(selectedTicket.id, 'admin1', 'Sophie Dubois')}
                      >
                        Assigner
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Titre"
                  value={ticketForm.title}
                  onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={ticketForm.category}
                    label="Catégorie"
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                  >
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <MenuItem key={key} value={key}>{label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Priorité</InputLabel>
                  <Select
                    value={ticketForm.priority}
                    label="Priorité"
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                  >
                    <MenuItem value="low">Basse</MenuItem>
                    <MenuItem value="medium">Moyenne</MenuItem>
                    <MenuItem value="high">Haute</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        {dialogMode !== 'view' && (
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              Annuler
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveTicket}
            >
              {dialogMode === 'add' ? 'Créer' : 'Sauvegarder'}
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* Dialog pour FAQ */}
      <Dialog
        open={openDialog && dialogType === 'faq'}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              {dialogMode === 'view' ? 'Article FAQ' : 
               dialogMode === 'add' ? 'Nouvel article FAQ' : 'Modifier l\'article FAQ'}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {dialogMode === 'view' && selectedFaqArticle ? (
            <Box>
              <Typography variant="h5" gutterBottom>
                {selectedFaqArticle.title}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={categoryLabels[selectedFaqArticle.category]}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={selectedFaqArticle.isPublished ? 'Publié' : 'Brouillon'}
                  size="small"
                  color={selectedFaqArticle.isPublished ? 'success' : 'default'}
                />
              </Box>
              <Typography variant="body1" paragraph>
                {selectedFaqArticle.content}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">{selectedFaqArticle.views}</Typography>
                    <Typography variant="caption">Vues</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">{selectedFaqArticle.helpful}</Typography>
                    <Typography variant="caption">Utile</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">{selectedFaqArticle.notHelpful}</Typography>
                    <Typography variant="caption">Pas utile</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Titre"
                  value={faqForm.title}
                  onChange={(e) => setFaqForm({ ...faqForm, title: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contenu"
                  multiline
                  rows={6}
                  value={faqForm.content}
                  onChange={(e) => setFaqForm({ ...faqForm, content: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={faqForm.category}
                    label="Catégorie"
                    onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                  >
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <MenuItem key={key} value={key}>{label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Sous-catégorie"
                  value={faqForm.subcategory}
                  onChange={(e) => setFaqForm({ ...faqForm, subcategory: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={faqForm.isPublished}
                      onChange={(e) => setFaqForm({ ...faqForm, isPublished: e.target.checked })}
                    />
                  }
                  label="Publier l'article"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>

        {dialogMode !== 'view' && (
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              Annuler
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveFaqArticle}
            >
              {dialogMode === 'add' ? 'Créer' : 'Sauvegarder'}
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* Dialog pour guides */}
      <Dialog
        open={openDialog && dialogType === 'guide'}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              {dialogMode === 'view' ? 'Guide utilisateur' : 
               dialogMode === 'add' ? 'Nouveau guide' : 'Modifier le guide'}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {dialogMode === 'view' && selectedGuide ? (
            <Box>
              <Typography variant="h5" gutterBottom>
                {selectedGuide.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {selectedGuide.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={selectedGuide.category}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={difficultyLabels[selectedGuide.difficulty]}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={`${selectedGuide.estimatedReadTime} min`}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={selectedGuide.isPublished ? 'Publié' : 'Brouillon'}
                  size="small"
                  color={selectedGuide.isPublished ? 'success' : 'default'}
                />
              </Box>
              <Typography variant="body1" paragraph>
                {selectedGuide.content}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">{selectedGuide.views}</Typography>
                    <Typography variant="caption">Vues</Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">{selectedGuide.downloads}</Typography>
                    <Typography variant="caption">Téléchargements</Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">{selectedGuide.rating}</Typography>
                    <Typography variant="caption">Note moyenne</Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">{selectedGuide.ratingCount}</Typography>
                    <Typography variant="caption">Évaluations</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Titre"
                  value={guideForm.title}
                  onChange={(e) => setGuideForm({ ...guideForm, title: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={2}
                  value={guideForm.description}
                  onChange={(e) => setGuideForm({ ...guideForm, description: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contenu"
                  multiline
                  rows={8}
                  value={guideForm.content}
                  onChange={(e) => setGuideForm({ ...guideForm, content: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={guideForm.category}
                    label="Catégorie"
                    onChange={(e) => setGuideForm({ ...guideForm, category: e.target.value })}
                  >
                    <MenuItem value="professional">Professionnel</MenuItem>
                    <MenuItem value="organization">Organisation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Difficulté</InputLabel>
                  <Select
                    value={guideForm.difficulty}
                    label="Difficulté"
                    onChange={(e) => setGuideForm({ ...guideForm, difficulty: e.target.value })}
                  >
                    {Object.entries(difficultyLabels).map(([key, label]) => (
                      <MenuItem key={key} value={key}>{label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Temps de lecture (min)"
                  type="number"
                  value={guideForm.estimatedReadTime}
                  onChange={(e) => setGuideForm({ ...guideForm, estimatedReadTime: parseInt(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={guideForm.isPublished}
                      onChange={(e) => setGuideForm({ ...guideForm, isPublished: e.target.checked })}
                    />
                  }
                  label="Publier le guide"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>

        {dialogMode !== 'view' && (
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              Annuler
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveGuide}
            >
              {dialogMode === 'add' ? 'Créer' : 'Sauvegarder'}
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Indicateur de chargement */}
      {loading && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};

export default Support;