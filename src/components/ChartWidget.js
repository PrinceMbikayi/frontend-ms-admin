import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Skeleton
} from '@mui/material';
import {
  MoreVert,
  TrendingUp,
  TrendingDown,
  Remove,
  GetApp,
  Refresh
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './ChartWidget.css';

const ChartWidget = ({
  title,
  subtitle,
  data = [],
  type = 'line',
  height = 300,
  loading = false,
  error = null,
  color = 'primary',
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  dataKey,
  xAxisKey = 'name',
  yAxisKey = 'value',
  colors = [],
  trend,
  trendValue,
  actions = true,
  onRefresh,
  onExport,
  className = '',
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Default colors for different chart types
  const defaultColors = {
    primary: ['#1976d2', '#42a5f5', '#90caf9'],
    success: ['#2e7d32', '#4caf50', '#81c784'],
    warning: ['#ed6c02', '#ff9800', '#ffb74d'],
    error: ['#d32f2f', '#f44336', '#e57373'],
    info: ['#0288d1', '#03a9f4', '#4fc3f7']
  };

  const chartColors = colors.length > 0 ? colors : defaultColors[color];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    handleMenuClose();
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    }
    handleMenuClose();
  };

  const formatTooltipValue = (value, name) => {
    if (typeof value === 'number') {
      return [value.toLocaleString('fr-FR'), name];
    }
    return [value, name];
  };

  const renderChart = () => {
    if (loading) {
      return (
        <Box className="chart-widget__loading">
          <Skeleton variant="rectangular" width="100%" height={height} />
        </Box>
      );
    }

    if (error) {
      return (
        <Box className="chart-widget__error">
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </Box>
      );
    }

    if (!data || data.length === 0) {
      return (
        <Box className="chart-widget__empty">
          <Typography variant="body2" color="textSecondary">
            Aucune donnée disponible
          </Typography>
        </Box>
      );
    }

    const commonProps = {
      data,
      width: '100%',
      height
    };

    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer {...commonProps}>
            <AreaChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              {showTooltip && <Tooltip formatter={formatTooltipValue} />}
              {showLegend && <Legend />}
              <Area
                type="monotone"
                dataKey={dataKey || yAxisKey}
                stroke={chartColors[0]}
                fill={chartColors[0]}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer {...commonProps}>
            <BarChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              {showTooltip && <Tooltip formatter={formatTooltipValue} />}
              {showLegend && <Legend />}
              <Bar
                dataKey={dataKey || yAxisKey}
                fill={chartColors[0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer {...commonProps}>
            <PieChart>
              {showTooltip && <Tooltip formatter={formatTooltipValue} />}
              {showLegend && <Legend />}
              <Pie
                data={data}
                dataKey={dataKey || yAxisKey}
                nameKey={xAxisKey}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={chartColors[0]}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );

      default: // line
        return (
          <ResponsiveContainer {...commonProps}>
            <LineChart data={data}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              {showTooltip && <Tooltip formatter={formatTooltipValue} />}
              {showLegend && <Legend />}
              <Line
                type="monotone"
                dataKey={dataKey || yAxisKey}
                stroke={chartColors[0]}
                strokeWidth={2}
                dot={{ fill: chartColors[0] }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="chart-widget__trend-icon chart-widget__trend-icon--up" />;
      case 'down':
        return <TrendingDown className="chart-widget__trend-icon chart-widget__trend-icon--down" />;
      default:
        return <Remove className="chart-widget__trend-icon chart-widget__trend-icon--stable" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'success';
      case 'down':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card className={`chart-widget chart-widget--${color} ${className}`} {...props}>
      <CardHeader
        className="chart-widget__header"
        title={
          <Box className="chart-widget__title-section">
            <Typography variant="h6" className="chart-widget__title">
              {title}
            </Typography>
            {trend && trendValue && (
              <Chip
                icon={getTrendIcon()}
                label={`${trendValue}%`}
                size="small"
                color={getTrendColor()}
                variant="outlined"
                className="chart-widget__trend-chip"
              />
            )}
          </Box>
        }
        subheader={
          subtitle && (
            <Typography variant="body2" className="chart-widget__subtitle">
              {subtitle}
            </Typography>
          )
        }
        action={
          actions && (
            <>
              <IconButton
                onClick={handleMenuOpen}
                className="chart-widget__menu-button"
                disabled={loading}
                aria-label="Plus d'options"
              >
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                className="chart-widget__menu"
              >
                {onRefresh && (
                  <MenuItem onClick={handleRefresh} disabled={isRefreshing}>
                    <Refresh className="chart-widget__menu-icon" />
                    Actualiser
                  </MenuItem>
                )}
                {onExport && (
                  <MenuItem onClick={handleExport}>
                    <GetApp className="chart-widget__menu-icon" />
                    Exporter
                  </MenuItem>
                )}
              </Menu>
            </>
          )
        }
      />
      <CardContent className="chart-widget__content">
        {renderChart()}
      </CardContent>
    </Card>
  );
};

// Predefined chart widget variants
export const LineChartWidget = (props) => (
  <ChartWidget type="line" {...props} />
);

export const AreaChartWidget = (props) => (
  <ChartWidget type="area" {...props} />
);

export const BarChartWidget = (props) => (
  <ChartWidget type="bar" {...props} />
);

export const PieChartWidget = (props) => (
  <ChartWidget type="pie" showGrid={false} {...props} />
);

export default ChartWidget;