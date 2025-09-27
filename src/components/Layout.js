import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.css';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 72;

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const drawerWidth = sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH;

  return (
    <Box className="layout-container">
      {/* Topbar */}
      <Topbar 
        onMenuToggle={handleDrawerToggle}
        title="Dashboard Admin"
      />

      {/* Sidebar */}
      <Box className="sidebar-container">
        {isMobile ? (
          <Sidebar
            variant="temporary"
            open={mobileOpen}
            onToggle={handleDrawerToggle}
          />
        ) : (
          <Sidebar
            variant="permanent"
            collapsed={sidebarCollapsed}
            onToggle={handleSidebarToggle}
          />
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        className="main-content"
        sx={{
          flexGrow: 1,
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          marginTop: '64px', // Height of topbar
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Box className="content-wrapper">
          <Outlet />
        </Box>
      </Box>

      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <Box
          className="mobile-overlay"
          onClick={handleDrawerToggle}
        />
      )}
    </Box>
  );
};

export default Layout;