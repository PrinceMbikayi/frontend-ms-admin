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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  Divider,
  Stack,
  LinearProgress,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Euro as EuroIcon,
  CalendarToday as CalendarIcon,
  Assessment as AssessmentIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  FilterList as FilterIcon,
  DateRange as DateRangeIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import './Reports.css';

const Reports = () => {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector(state => state.reports || { reports: {}, loading: false });
  
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [reportType, setReportType] = useState('overview');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - replace with actual API calls
  const mockReportsData = {
    overview: {
      totalUsers: 1250,
      totalMissions: 89,
      totalRevenue: 45680.50,
      completedMissions: 67,
      userGrowth: 12.5,
      missionGrowth: 8.3,
      revenueGrowth: 15.7,
      completionRate: 75.3
    },
    userStats: {
      newUsers: [
        { month: 'Jan', count: 45 },
        { month: 'Fév', count: 52 },
        { month: 'Mar', count: 38 },
        { month: 'Avr', count: 61 },
        { month: 'Mai', count: 49 },
        { month: 'Jun', count: 73 }
      ],
      usersByRole: [
        { name: 'Coachs', value: 450, color: '#8884d8' },
        { name: 'Arbitres', value: 320, color: '#82ca9d' },
        { name: 'Organisateurs', value: 280, color: '#ffc658' },
        { name: 'Participants', value: 200, color: '#ff7300' }
      ],
      topUsers: [
        { id: 1, name: 'Jean Dupont', missions: 15, revenue: 2250, avatar: '/avatars/jean.jpg' },
        { id: 2, name: 'Marie Martin', missions: 12, revenue: 1800, avatar: '/avatars/marie.jpg' },
        { id: 3, name: 'Pierre Durand', missions: 10, revenue: 1500, avatar: '/avatars/pierre.jpg' }
      ]
    },
    missionStats: {
      missionsByMonth: [
        { month: 'Jan', created: 12, completed: 10, cancelled: 2 },
        { month: 'Fév', created: 15, completed: 13, cancelled: 1 },
        { month: 'Mar', created: 8, completed: 7, cancelled: 1 },
        { month: 'Avr', created: 18, completed: 15, cancelled: 2 },
        { month: 'Mai', created: 14, completed: 12, cancelled: 1 },
        { month: 'Jun', created: 22, completed: 20, cancelled: 1 }
      ],
      missionsByCategory: [
        { name: 'Football', value: 35, color: '#8884d8' },
        { name: 'Basketball', value: 25, color: '#82ca9d' },
        { name: 'Tennis', value: 15, color: '#ffc658' },
        { name: 'Natation', value: 10, color: '#ff7300' },
        { name: 'Autres', value: 4, color: '#0088fe' }
      ],
      avgDuration: 2.5,
      avgParticipants: 12.8
    },
    financialStats: {
      revenueByMonth: [
        { month: 'Jan', revenue: 6500, expenses: 2200, profit: 4300 },
        { month: 'Fév', revenue: 7200, expenses: 2400, profit: 4800 },
        { month: 'Mar', revenue: 5800, expenses: 2100, profit: 3700 },
        { month: 'Avr', revenue: 8900, expenses: 2800, profit: 6100 },
        { month: 'Mai', revenue: 7600, expenses: 2500, profit: 5100 },
        { month: 'Jun', revenue: 9600, expenses: 3000, profit: 6600 }
      ],
      paymentMethods: [
        { name: 'Virement', value: 45, color: '#8884d8' },
        { name: 'Carte', value: 35, color: '#82ca9d' },
        { name: 'PayPal', value: 15, color: '#ffc658' },
        { name: 'Espèces', value: 5, color: '#ff7300' }
      ],
      avgTransactionValue: 156.75,
      totalTransactions: 342
    }
  };

  useEffect(() => {
    // Load reports data
    // dispatch(fetchReports({ dateRange, reportType }));
  }, [dispatch, dateRange, reportType]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      setSnackbar({ open: true, message: 'Rapports mis à jour', severity: 'success' });
    }, 2000);
  };

  const handleExport = (format) => {
    setSnackbar({ open: true, message: `Export ${format.toUpperCase()} en cours...`, severity: 'info' });
    // Implement export logic
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const StatCard = ({ title, value, icon, trend, color = 'primary' }) => (
    <Card className="stat-card">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" className="stat-value">
              {value}
            </Typography>
            {trend !== undefined && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {trend > 0 ? (
                  <TrendingUpIcon color="success" fontSize="small" />
                ) : (
                  <TrendingDownIcon color="error" fontSize="small" />
                )}
                <Typography
                  variant="body2"
                  color={trend > 0 ? 'success.main' : 'error.main'}
                  sx={{ ml: 0.5 }}
                >
                  {formatPercentage(trend)}
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const ChartCard = ({ title, children, actions }) => (
    <Card className="chart-card">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {actions && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {actions}
            </Box>
          )}
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  const renderOverviewReport = () => {
    const { overview } = mockReportsData;
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Utilisateurs"
            value={overview.totalUsers.toLocaleString()}
            icon={<PeopleIcon />}
            trend={overview.userGrowth}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Missions"
            value={overview.totalMissions}
            icon={<AssignmentIcon />}
            trend={overview.missionGrowth}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Chiffre d'Affaires"
            value={formatCurrency(overview.totalRevenue)}
            icon={<EuroIcon />}
            trend={overview.revenueGrowth}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Taux de Réussite"
            value={`${overview.completionRate}%`}
            icon={<AssessmentIcon />}
            trend={2.1}
            color="info"
          />
        </Grid>
        
        <Grid item xs={12} md={8}>
          <ChartCard title="Évolution du Chiffre d'Affaires">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockReportsData.financialStats.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  name="Revenus"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stackId="2"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  name="Bénéfices"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ChartCard title="Répartition des Utilisateurs">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockReportsData.userStats.usersByRole}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockReportsData.userStats.usersByRole.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    );
  };

  const renderUserReport = () => {
    const { userStats } = mockReportsData;
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ChartCard title="Nouveaux Utilisateurs par Mois">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userStats.newUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Nouveaux utilisateurs" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card className="top-users-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Utilisateurs
              </Typography>
              <List>
                {userStats.topUsers.map((user, index) => (
                  <ListItem key={user.id} divider={index < userStats.topUsers.length - 1}>
                    <ListItemAvatar>
                      <Avatar src={user.avatar}>
                        <PeopleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {user.missions} missions
                          </Typography>
                          <Typography variant="body2" color="primary">
                            {formatCurrency(user.revenue)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const renderMissionReport = () => {
    const { missionStats } = mockReportsData;
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ChartCard title="Missions par Mois">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={missionStats.missionsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="created"
                  stroke="#8884d8"
                  name="Créées"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#82ca9d"
                  name="Terminées"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="cancelled"
                  stroke="#ff7300"
                  name="Annulées"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ChartCard title="Missions par Catégorie">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={missionStats.missionsByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {missionStats.missionsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StatCard
            title="Durée Moyenne (heures)"
            value={missionStats.avgDuration}
            icon={<CalendarIcon />}
            color="info"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StatCard
            title="Participants Moyens"
            value={missionStats.avgParticipants}
            icon={<PeopleIcon />}
            color="warning"
          />
        </Grid>
      </Grid>
    );
  };

  const renderFinancialReport = () => {
    const { financialStats } = mockReportsData;
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ChartCard title="Analyse Financière Mensuelle">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={financialStats.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenus" />
                <Bar dataKey="expenses" fill="#ff7300" name="Dépenses" />
                <Bar dataKey="profit" fill="#82ca9d" name="Bénéfices" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <ChartCard title="Méthodes de Paiement">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={financialStats.paymentMethods}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {financialStats.paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StatCard
                title="Valeur Moyenne Transaction"
                value={formatCurrency(financialStats.avgTransactionValue)}
                icon={<EuroIcon />}
                color="success"
              />
            </Grid>
            <Grid item xs={12}>
              <StatCard
                title="Total Transactions"
                value={financialStats.totalTransactions}
                icon={<AssessmentIcon />}
                color="primary"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderReport = () => {
    switch (reportType) {
      case 'users':
        return renderUserReport();
      case 'missions':
        return renderMissionReport();
      case 'financial':
        return renderFinancialReport();
      default:
        return renderOverviewReport();
    }
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <Typography variant="h4" className="page-title">
          Rapports et Analyses
        </Typography>
        <div className="header-actions">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type de rapport</InputLabel>
            <Select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              label="Type de rapport"
            >
              <MenuItem value="overview">Vue d'ensemble</MenuItem>
              <MenuItem value="users">Utilisateurs</MenuItem>
              <MenuItem value="missions">Missions</MenuItem>
              <MenuItem value="financial">Financier</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Date de début"
            type="date"
            size="small"
            value={dateRange.startDate}
            onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            label="Date de fin"
            type="date"
            size="small"
            value={dateRange.endDate}
            onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          
          <Tooltip title="Actualiser">
            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              color="primary"
            >
              {refreshing ? <CircularProgress size={24} /> : <RefreshIcon />}
            </IconButton>
          </Tooltip>
          
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport('excel')}
          >
            Export Excel
          </Button>
        </div>
      </div>

      {loading && (
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress />
        </Box>
      )}

      <div className="reports-content">
        {renderReport()}
      </div>

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

export default Reports;