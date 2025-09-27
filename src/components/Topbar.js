import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { logoutAdmin } from '../redux/slices/authSlice';
import { refreshStats } from '../redux/slices/statsSlice';
import './Topbar.css';

const Topbar = ({ onMenuToggle, title = 'Dashboard' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { refreshing } = useSelector((state) => state.stats);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());
    handleProfileMenuClose();
    navigate('/admin/login');
  };

  const handleRefresh = () => {
    dispatch(refreshStats());
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      // Implement global search functionality
      console.log('Searching for:', searchValue);
    }
  };

  const mockNotifications = [
    {
      id: 1,
      title: 'Nouvelle inscription',
      message: 'Pierre Durand s\'est inscrit',
      time: 'Il y a 5 min',
      unread: true,
    },
    {
      id: 2,
      title: 'Mission en attente',
      message: 'Tournoi de Basketball nécessite une validation',
      time: 'Il y a 15 min',
      unread: true,
    },
    {
      id: 3,
      title: 'Paiement reçu',
      message: 'Paiement de 25€ pour cours de tennis',
      time: 'Il y a 1h',
      unread: false,
    },
  ];

  const unreadCount = mockNotifications.filter(n => n.unread).length;

  return (
    <AppBar 
      position="fixed" 
      className="topbar"
      elevation={0}
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)',
      }}
    >
      <Toolbar className="topbar-toolbar">
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            edge="start"
            onClick={onMenuToggle}
            className="menu-button"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Page Title */}
        <Typography variant="h6" className="page-title">
          {title}
        </Typography>

        {/* Search Bar */}
        <Box className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-wrapper">
              <SearchIcon className="search-icon" />
              <InputBase
                placeholder="Rechercher..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="search-input"
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </form>
        </Box>

        {/* Action Buttons */}
        <Box className="action-buttons">
          {/* Quick Actions */}
          <IconButton
            className="action-button"
            onClick={() => navigate('/admin/missions/new')}
            title="Nouvelle mission"
          >
            <AddIcon />
          </IconButton>

          {/* Refresh Button */}
          <IconButton
            className="action-button"
            onClick={handleRefresh}
            disabled={refreshing}
            title="Actualiser"
          >
            <RefreshIcon className={refreshing ? 'rotating' : ''} />
          </IconButton>

          {/* Notifications */}
          <IconButton
            className="action-button"
            onClick={handleNotificationMenuOpen}
            title="Notifications"
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <IconButton
            className="profile-button"
            onClick={handleProfileMenuOpen}
            title="Profil"
          >
            <Avatar
              src={user?.avatar}
              alt={user?.firstName}
              sx={{ width: 32, height: 32 }}
            >
              {user?.firstName?.[0]}
            </Avatar>
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          className="profile-menu"
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box className="profile-menu-header">
            <Avatar
              src={user?.avatar}
              alt={user?.firstName}
              sx={{ width: 40, height: 40, mb: 1 }}
            >
              {user?.firstName?.[0]}
            </Avatar>
            <Typography variant="subtitle1" className="profile-name">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" className="profile-email">
              {user?.email}
            </Typography>
            <Chip 
              label={user?.role} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          </Box>
          <Divider />
          <MenuItem onClick={() => { navigate('/admin/settings'); handleProfileMenuClose(); }}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paramètres</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Déconnexion</ListItemText>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationMenuClose}
          className="notifications-menu"
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: { width: 320, maxHeight: 400 }
          }}
        >
          <Box className="notifications-header">
            <Typography variant="h6">Notifications</Typography>
            {unreadCount > 0 && (
              <Chip 
                label={`${unreadCount} non lues`} 
                size="small" 
                color="error" 
                variant="outlined"
              />
            )}
          </Box>
          <Divider />
          {mockNotifications.map((notification) => (
            <MenuItem 
              key={notification.id} 
              className={`notification-item ${notification.unread ? 'unread' : ''}`}
              onClick={handleNotificationMenuClose}
            >
              <Box className="notification-content">
                <Typography variant="subtitle2" className="notification-title">
                  {notification.title}
                </Typography>
                <Typography variant="body2" className="notification-message">
                  {notification.message}
                </Typography>
                <Typography variant="caption" className="notification-time">
                  {notification.time}
                </Typography>
              </Box>
              {notification.unread && (
                <Box className="notification-dot" />
              )}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem className="view-all-notifications">
            <Typography variant="body2" color="primary">
              Voir toutes les notifications
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;