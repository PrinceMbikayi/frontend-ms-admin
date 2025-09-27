import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Alert,
  Fade
} from '@mui/material';
import {
  People,
  Assignment,
  Payment,
  TrendingUp,
  Refresh,
  DateRange,
  FilterList
} from '@mui/icons-material';
import KpiCard, { UserKpiCard, RevenueKpiCard, ConversionKpiCard, MissionKpiCard } from '../components/KpiCard';
import ChartWidget, { LineChartWidget, AreaChartWidget, BarChartWidget, PieChartWidget } from '../components/ChartWidget';
import { fetchStats, setDateRange } from '../redux/slices/statsSlice';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error, dateRange } = useSelector(state => state.stats);
  const { user } = useSelector(state => state.auth);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch, dateRange]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchStats()).unwrap();
    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDateRangeChange = (range) => {
    dispatch(setDateRange(range));
  };

  // Mock data for charts
  const userGrowthData = [
    { name: 'Jan', value: 400, previous: 350 },
    { name: 'Fév', value: 300, previous: 280 },
    { name: 'Mar', value: 500, previous: 450 },
    { name: 'Avr', value: 280, previous: 300 },
    { name: 'Mai', value: 590, previous: 520 },
    { name: 'Jun', value: 320, previous: 280 },
    { name: 'Jul', value: 700, previous: 650 }
  ];

  const revenueData = [
    { name: 'Jan', value: 12000, missions: 45 },
    { name: 'Fév', value: 19000, missions: 52 },
    { name: 'Mar', value: 15000, missions: 48 },
    { name: 'Avr', value: 25000, missions: 61 },
    { name: 'Mai', value: 22000, missions: 58 },
    { name: 'Jun', value: 30000, missions: 72 },
    { name: 'Jul', value: 28000, missions: 68 }
  ];

  const missionStatusData = [
    { name: 'Actives', value: 45, color: '#4caf50' },
    { name: 'En attente', value: 23, color: '#ff9800' },
    { name: 'Terminées', value: 156, color: '#2196f3' },
    { name: 'Annulées', value: 8, color: '#f44336' }
  ];

  const topSportsData = [
    { name: 'Football', value: 89 },
    { name: 'Basketball', value: 67 },
    { name: 'Tennis', value: 45 },
    { name: 'Natation', value: 34 },
    { name: 'Course', value: 28 }
  ];

  const dateRangeOptions = [
    { label: '7 jours', value: '7d' },
    { label: '30 jours', value: '30d' },
    { label: '3 mois', value: '3m' },
    { label: '6 mois', value: '6m' },
    { label: '1 an', value: '1y' }
  ];

  return (
    <Box className="dashboard">
      {/* Header */}
      <Box className="dashboard__header">
        <Box className="dashboard__title-section">
          <Typography variant="h4" className="dashboard__title">
            Tableau de bord
          </Typography>
          <Typography variant="body1" className="dashboard__subtitle">
            Bonjour {user?.name || 'Admin'}, voici un aperçu de votre plateforme
          </Typography>
        </Box>
        
        <Box className="dashboard__actions">
          <Box className="dashboard__date-filters">
            {dateRangeOptions.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                onClick={() => handleDateRangeChange(option.value)}
                color={dateRange === option.value ? 'primary' : 'default'}
                variant={dateRange === option.value ? 'filled' : 'outlined'}
                className="dashboard__date-chip"
              />
            ))}
          </Box>
          
          <IconButton
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="dashboard__refresh-button"
            aria-label="Actualiser les données"
          >
            <Refresh className={refreshing ? 'rotating' : ''} />
          </IconButton>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Fade in={Boolean(error)}>
          <Alert 
            severity="error" 
            className="dashboard__error"
            action={
              <Button color="inherit" size="small" onClick={handleRefresh}>
                Réessayer
              </Button>
            }
          >
            {error}
          </Alert>
        </Fade>
      )}

      {/* KPI Cards */}
      <Grid container spacing={3} className="dashboard__kpi-section">
        <Grid item xs={12} sm={6} md={3}>
          <UserKpiCard
            title="Utilisateurs actifs"
            subtitle="Total des utilisateurs inscrits"
            value={stats.totalUsers || 1247}
            previousValue={1180}
            icon={People}
            loading={loading}
            trend="up"
            trendValue="5.7"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MissionKpiCard
            title="Missions actives"
            subtitle="Missions en cours"
            value={stats.activeMissions || 68}
            previousValue={72}
            icon={Assignment}
            loading={loading}
            trend="down"
            trendValue="5.6"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <RevenueKpiCard
            title="Revenus du mois"
            subtitle="Chiffre d'affaires mensuel"
            value={stats.monthlyRevenue || 28500}
            previousValue={25200}
            icon={Payment}
            loading={loading}
            trend="up"
            trendValue="13.1"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <ConversionKpiCard
            title="Taux de conversion"
            subtitle="Missions réussies / Total"
            value={stats.conversionRate || 87.5}
            previousValue={84.2}
            icon={TrendingUp}
            loading={loading}
            trend="up"
            trendValue="3.9"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} className="dashboard__charts-section">
        {/* User Growth Chart */}
        <Grid item xs={12} lg={8}>
          <LineChartWidget
            title="Croissance des utilisateurs"
            subtitle="Évolution du nombre d'utilisateurs inscrits"
            data={userGrowthData}
            dataKey="value"
            height={350}
            color="primary"
            trend="up"
            trendValue="12.5"
            loading={loading}
            onRefresh={() => dispatch(fetchStats())}
          />
        </Grid>
        
        {/* Mission Status Pie Chart */}
        <Grid item xs={12} lg={4}>
          <PieChartWidget
            title="Statut des missions"
            subtitle="Répartition par statut"
            data={missionStatusData}
            height={350}
            color="info"
            loading={loading}
            onRefresh={() => dispatch(fetchStats())}
          />
        </Grid>
        
        {/* Revenue Chart */}
        <Grid item xs={12} lg={6}>
          <AreaChartWidget
            title="Revenus mensuels"
            subtitle="Évolution du chiffre d'affaires"
            data={revenueData}
            dataKey="value"
            height={300}
            color="success"
            trend="up"
            trendValue="18.2"
            loading={loading}
            onRefresh={() => dispatch(fetchStats())}
          />
        </Grid>
        
        {/* Top Sports Chart */}
        <Grid item xs={12} lg={6}>
          <BarChartWidget
            title="Sports populaires"
            subtitle="Nombre de missions par sport"
            data={topSportsData}
            dataKey="value"
            height={300}
            color="warning"
            loading={loading}
            onRefresh={() => dispatch(fetchStats())}
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper className="dashboard__quick-actions">
        <Typography variant="h6" className="dashboard__section-title">
          Actions rapides
        </Typography>
        
        <Box className="dashboard__actions-grid">
          <Button
            variant="outlined"
            startIcon={<People />}
            className="dashboard__action-button"
            href="/admin/users"
          >
            Gérer les utilisateurs
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Assignment />}
            className="dashboard__action-button"
            href="/admin/missions"
          >
            Voir les missions
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Payment />}
            className="dashboard__action-button"
            href="/admin/payments"
          >
            Gérer les paiements
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<DateRange />}
            className="dashboard__action-button"
            href="/admin/reports"
          >
            Voir les rapports
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;