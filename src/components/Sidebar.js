import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Payment as PaymentIcon,
  Subscriptions as SubscriptionsIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  SportsSoccer as SportsIcon,
} from '@mui/icons-material';
import './Sidebar.css';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 72;

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/admin/dashboard',
  },
  {
    text: 'Utilisateurs',
    icon: <PeopleIcon />,
    path: '/admin/users',
  },
  {
    text: 'Missions',
    icon: <AssignmentIcon />,
    path: '/admin/missions',
  },
  {
    text: 'Paiements',
    icon: <PaymentIcon />,
    path: '/admin/payments',
  },
  {
    text: 'Abonnements',
    icon: <SubscriptionsIcon />,
    path: '/admin/subscriptions',
  },
  {
    text: 'Rapports',
    icon: <AssessmentIcon />,
    path: '/admin/reports',
  },
  {
    text: 'Paramètres',
    icon: <SettingsIcon />,
    path: '/admin/settings',
  },
];

const Sidebar = ({ open, onToggle, variant = 'permanent' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    // Close mobile drawer after navigation
    if (isMobile && onToggle) {
      onToggle();
    }
  };

  const drawerWidth = collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH;

  const drawerContent = (
    <Box className="sidebar" sx={{ width: drawerWidth, height: '100%' }}>
      {/* Header */}
      <Box className="sidebar-header">
        <Box className="sidebar-logo">
          <SportsIcon className="logo-icon" />
          {!collapsed && (
            <Typography variant="h6" className="logo-text">
              Mission Sport
            </Typography>
          )}
        </Box>
        {!isMobile && (
          <IconButton
            onClick={handleToggleCollapse}
            className="collapse-button"
            size="small"
          >
            <ChevronLeftIcon 
              sx={{ 
                transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }} 
            />
          </IconButton>
        )}
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <Box className="sidebar-menu">
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleMenuItemClick(item.path)}
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  sx={{
                    minHeight: 48,
                    justifyContent: collapsed ? 'center' : 'initial',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    className="menu-icon"
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? 'auto' : 3,
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText 
                      primary={item.text} 
                      className="menu-text"
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      {!collapsed && (
        <Box className="sidebar-footer">
          <Typography variant="caption" className="version-text">
            Admin Panel v1.0
          </Typography>
        </Box>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            border: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant={variant}
      open={true}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;