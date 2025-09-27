import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
  Email as EmailIcon,
  Sms as SmsIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  AccountCircle as AccountCircleIcon,
  Business as BusinessIcon,
  Payment as PaymentIcon,
  Extension as IntegrationIcon,
  Backup as BackupIcon,
  CloudDownload as CloudDownloadIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../contexts/ThemeContext';
import './Settings.css';

const Settings = () => {
  const dispatch = useDispatch();
  const { settings, loading } = useSelector(state => state.settings || { settings: {}, loading: false });
  const { themeMode, toggleTheme, setThemeMode } = useTheme();
  
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, title: '', message: '', action: null });
  const [formData, setFormData] = useState({
    // General Settings
    siteName: 'Mission Sport Admin',
    siteDescription: 'Plateforme de gestion des missions sportives',
    contactEmail: 'admin@missionsport.fr',
    supportPhone: '+33 1 23 45 67 89',
    timezone: 'Europe/Paris',
    language: 'fr',
    currency: 'EUR',
    
    // Appearance
    theme: themeMode,
    primaryColor: '#1976d2',
    secondaryColor: '#dc004e',
    logoUrl: '',
    faviconUrl: '',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notifyNewUser: true,
    notifyNewMission: true,
    notifyPayment: true,
    notifySystemUpdates: false,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
    passwordRequireSpecialChars: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    maxLoginAttempts: 5,
    
    // Payment
    stripePublicKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    paypalClientSecret: '',
    defaultPaymentMethod: 'stripe',
    commissionRate: 5.0,
    
    // Email
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    smtpSecure: true,
    emailFromName: 'Mission Sport',
    emailFromAddress: 'noreply@missionsport.fr',
    
    // Storage
    maxFileSize: 10,
    allowedFileTypes: 'jpg,jpeg,png,pdf,doc,docx',
    storageProvider: 'local',
    awsAccessKey: '',
    awsSecretKey: '',
    awsBucket: '',
    
    // Backup
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    backupLocation: 'local'
  });

  useEffect(() => {
    // Load settings data
    // dispatch(fetchSettings());
  }, [dispatch]);
  
  // Synchroniser le formData avec le thème du contexte
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      theme: themeMode
    }));
  }, [themeMode]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Si c'est le thème qui change, mettre à jour le contexte global
    if (field === 'theme') {
      setThemeMode(value);
    }
  };

  const handleSave = () => {
    // dispatch(updateSettings(formData));
    setSnackbar({ open: true, message: 'Paramètres sauvegardés avec succès', severity: 'success' });
  };

  const handleReset = () => {
    setConfirmDialog({
      open: true,
      title: 'Réinitialiser les paramètres',
      message: 'Êtes-vous sûr de vouloir réinitialiser tous les paramètres ? Cette action est irréversible.',
      action: () => {
        // Reset to default values
        setSnackbar({ open: true, message: 'Paramètres réinitialisés', severity: 'info' });
        setConfirmDialog({ open: false, title: '', message: '', action: null });
      }
    });
  };

  const handleTestEmail = () => {
    setSnackbar({ open: true, message: 'Email de test envoyé', severity: 'info' });
  };

  const handleBackup = () => {
    setSnackbar({ open: true, message: 'Sauvegarde en cours...', severity: 'info' });
    // Simulate backup process
    setTimeout(() => {
      setSnackbar({ open: true, message: 'Sauvegarde terminée avec succès', severity: 'success' });
    }, 3000);
  };

  const handleRestore = () => {
    setConfirmDialog({
      open: true,
      title: 'Restaurer la sauvegarde',
      message: 'Êtes-vous sûr de vouloir restaurer la dernière sauvegarde ? Toutes les données actuelles seront remplacées.',
      action: () => {
        setSnackbar({ open: true, message: 'Restauration en cours...', severity: 'info' });
        setConfirmDialog({ open: false, title: '', message: '', action: null });
      }
    });
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );

  const renderGeneralSettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Informations générales
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Nom du site"
                value={formData.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                fullWidth
              />
              <TextField
                label="Description"
                value={formData.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Email de contact"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                fullWidth
              />
              <TextField
                label="Téléphone de support"
                value={formData.supportPhone}
                onChange={(e) => handleInputChange('supportPhone', e.target.value)}
                fullWidth
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Localisation
            </Typography>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Fuseau horaire</InputLabel>
                <Select
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  label="Fuseau horaire"
                >
                  <MenuItem value="Europe/Paris">Europe/Paris (UTC+1)</MenuItem>
                  <MenuItem value="Europe/London">Europe/London (UTC+0)</MenuItem>
                  <MenuItem value="America/New_York">America/New_York (UTC-5)</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>Langue</InputLabel>
                <Select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  label="Langue"
                >
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>Devise</InputLabel>
                <Select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  label="Devise"
                >
                  <MenuItem value="EUR">Euro (EUR)</MenuItem>
                  <MenuItem value="USD">Dollar US (USD)</MenuItem>
                  <MenuItem value="GBP">Livre Sterling (GBP)</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderAppearanceSettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Thème et couleurs
            </Typography>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Thème</InputLabel>
                <Select
                  value={formData.theme}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                  label="Thème"
                >
                  <MenuItem value="light">Clair</MenuItem>
                  <MenuItem value="dark">Sombre</MenuItem>
                  <MenuItem value="auto">Automatique</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Couleur primaire"
                type="color"
                value={formData.primaryColor}
                onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                fullWidth
              />
              
              <TextField
                label="Couleur secondaire"
                type="color"
                value={formData.secondaryColor}
                onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                fullWidth
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Logo et favicon
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="URL du logo"
                value={formData.logoUrl}
                onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                fullWidth
                placeholder="https://example.com/logo.png"
              />
              
              <TextField
                label="URL du favicon"
                value={formData.faviconUrl}
                onChange={(e) => handleInputChange('faviconUrl', e.target.value)}
                fullWidth
                placeholder="https://example.com/favicon.ico"
              />
              
              <Button variant="outlined" component="label">
                Télécharger un logo
                <input type="file" hidden accept="image/*" />
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderNotificationSettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Types de notifications
            </Typography>
            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.emailNotifications}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                  />
                }
                label="Notifications par email"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.smsNotifications}
                    onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                  />
                }
                label="Notifications par SMS"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.pushNotifications}
                    onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                  />
                }
                label="Notifications push"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Événements à notifier
            </Typography>
            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notifyNewUser}
                    onChange={(e) => handleInputChange('notifyNewUser', e.target.checked)}
                  />
                }
                label="Nouvel utilisateur"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notifyNewMission}
                    onChange={(e) => handleInputChange('notifyNewMission', e.target.checked)}
                  />
                }
                label="Nouvelle mission"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notifyPayment}
                    onChange={(e) => handleInputChange('notifyPayment', e.target.checked)}
                  />
                }
                label="Paiements"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notifySystemUpdates}
                    onChange={(e) => handleInputChange('notifySystemUpdates', e.target.checked)}
                  />
                }
                label="Mises à jour système"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderSecuritySettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Authentification
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.twoFactorAuth}
                    onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                  />
                }
                label="Authentification à deux facteurs"
              />
              
              <TextField
                label="Timeout de session (minutes)"
                type="number"
                value={formData.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                fullWidth
              />
              
              <TextField
                label="Tentatives de connexion max"
                type="number"
                value={formData.maxLoginAttempts}
                onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value))}
                fullWidth
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Politique de mot de passe
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Longueur minimale"
                type="number"
                value={formData.passwordMinLength}
                onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value))}
                fullWidth
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.passwordRequireSpecialChars}
                    onChange={(e) => handleInputChange('passwordRequireSpecialChars', e.target.checked)}
                  />
                }
                label="Caractères spéciaux requis"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.passwordRequireNumbers}
                    onChange={(e) => handleInputChange('passwordRequireNumbers', e.target.checked)}
                  />
                }
                label="Chiffres requis"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.passwordRequireUppercase}
                    onChange={(e) => handleInputChange('passwordRequireUppercase', e.target.checked)}
                  />
                }
                label="Majuscules requises"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderIntegrationSettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <PaymentIcon sx={{ mr: 2 }} />
            <Typography variant="h6">Paiements</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>Stripe</Typography>
                <Stack spacing={2}>
                  <TextField
                    label="Clé publique Stripe"
                    value={formData.stripePublicKey}
                    onChange={(e) => handleInputChange('stripePublicKey', e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Clé secrète Stripe"
                    type="password"
                    value={formData.stripeSecretKey}
                    onChange={(e) => handleInputChange('stripeSecretKey', e.target.value)}
                    fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>PayPal</Typography>
                <Stack spacing={2}>
                  <TextField
                    label="Client ID PayPal"
                    value={formData.paypalClientId}
                    onChange={(e) => handleInputChange('paypalClientId', e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Client Secret PayPal"
                    type="password"
                    value={formData.paypalClientSecret}
                    onChange={(e) => handleInputChange('paypalClientSecret', e.target.value)}
                    fullWidth
                  />
                </Stack>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <EmailIcon sx={{ mr: 2 }} />
            <Typography variant="h6">Email SMTP</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <TextField
                    label="Serveur SMTP"
                    value={formData.smtpHost}
                    onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Port SMTP"
                    type="number"
                    value={formData.smtpPort}
                    onChange={(e) => handleInputChange('smtpPort', parseInt(e.target.value))}
                    fullWidth
                  />
                  <TextField
                    label="Nom d'utilisateur"
                    value={formData.smtpUsername}
                    onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Mot de passe"
                    type="password"
                    value={formData.smtpPassword}
                    onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                    fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.smtpSecure}
                        onChange={(e) => handleInputChange('smtpSecure', e.target.checked)}
                      />
                    }
                    label="Connexion sécurisée (TLS)"
                  />
                  <TextField
                    label="Nom de l'expéditeur"
                    value={formData.emailFromName}
                    onChange={(e) => handleInputChange('emailFromName', e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Email de l'expéditeur"
                    type="email"
                    value={formData.emailFromAddress}
                    onChange={(e) => handleInputChange('emailFromAddress', e.target.value)}
                    fullWidth
                  />
                  <Button variant="outlined" onClick={handleTestEmail}>
                    Tester la configuration
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );

  const renderBackupSettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Configuration de sauvegarde
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.autoBackup}
                    onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
                  />
                }
                label="Sauvegarde automatique"
              />
              
              <FormControl fullWidth>
                <InputLabel>Fréquence</InputLabel>
                <Select
                  value={formData.backupFrequency}
                  onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                  label="Fréquence"
                >
                  <MenuItem value="daily">Quotidienne</MenuItem>
                  <MenuItem value="weekly">Hebdomadaire</MenuItem>
                  <MenuItem value="monthly">Mensuelle</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Rétention (jours)"
                type="number"
                value={formData.backupRetention}
                onChange={(e) => handleInputChange('backupRetention', parseInt(e.target.value))}
                fullWidth
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Actions de sauvegarde
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="contained"
                startIcon={<BackupIcon />}
                onClick={handleBackup}
                fullWidth
              >
                Créer une sauvegarde maintenant
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<CloudDownloadIcon />}
                onClick={handleRestore}
                fullWidth
              >
                Restaurer la dernière sauvegarde
              </Button>
              
              <Alert severity="info">
                Dernière sauvegarde: 15/01/2024 à 03:00
              </Alert>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <div className="settings-page">
      <div className="settings-header">
        <Typography variant="h4" className="page-title">
          Paramètres
        </Typography>
        <div className="header-actions">
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
          >
            Réinitialiser
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            className="save-button"
          >
            Sauvegarder
          </Button>
        </div>
      </div>

      <Paper className="settings-container">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          className="settings-tabs"
        >
          <Tab icon={<BusinessIcon />} label="Général" />
          <Tab icon={<PaletteIcon />} label="Apparence" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
          <Tab icon={<SecurityIcon />} label="Sécurité" />
          <Tab icon={<IntegrationIcon />} label="Intégrations" />
          <Tab icon={<BackupIcon />} label="Sauvegarde" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          {renderGeneralSettings()}
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          {renderAppearanceSettings()}
        </TabPanel>
        
        <TabPanel value={activeTab} index={2}>
          {renderNotificationSettings()}
        </TabPanel>
        
        <TabPanel value={activeTab} index={3}>
          {renderSecuritySettings()}
        </TabPanel>
        
        <TabPanel value={activeTab} index={4}>
          {renderIntegrationSettings()}
        </TabPanel>
        
        <TabPanel value={activeTab} index={5}>
          {renderBackupSettings()}
        </TabPanel>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, title: '', message: '', action: null })}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon color="warning" />
            {confirmDialog.title}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>{confirmDialog.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, title: '', message: '', action: null })}>
            Annuler
          </Button>
          <Button
            onClick={confirmDialog.action}
            color="warning"
            variant="contained"
          >
            Confirmer
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

export default Settings;