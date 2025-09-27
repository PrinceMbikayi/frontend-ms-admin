import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  MoreVert,
  InfoOutlined
} from '@mui/icons-material';
import './KpiCard.css';

const KpiCard = ({
  title,
  value,
  previousValue,
  icon: Icon,
  color = 'primary',
  format = 'number',
  trend,
  trendValue,
  subtitle,
  loading = false,
  onClick,
  actions = false,
  className = '',
  ...props
}) => {
  // Calculate trend if not provided
  const calculatedTrend = trend || (previousValue ? 
    (value > previousValue ? 'up' : value < previousValue ? 'down' : 'stable') 
    : null
  );

  // Calculate trend percentage if not provided
  const calculatedTrendValue = trendValue || (previousValue ? 
    Math.abs(((value - previousValue) / previousValue) * 100).toFixed(1)
    : null
  );

  // Format value based on type
  const formatValue = (val) => {
    if (loading) return '---';
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(val);
      case 'percentage':
        return `${val}%`;
      case 'compact':
        if (val >= 1000000) {
          return `${(val / 1000000).toFixed(1)}M`;
        } else if (val >= 1000) {
          return `${(val / 1000).toFixed(1)}K`;
        }
        return val.toLocaleString('fr-FR');
      default:
        return val.toLocaleString('fr-FR');
    }
  };

  const getTrendIcon = () => {
    switch (calculatedTrend) {
      case 'up':
        return <TrendingUp className="trend-icon trend-up" />;
      case 'down':
        return <TrendingDown className="trend-icon trend-down" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (calculatedTrend) {
      case 'up':
        return 'success';
      case 'down':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      className={`kpi-card kpi-card--${color} ${loading ? 'kpi-card--loading' : ''} ${className}`}
      onClick={onClick}
      sx={{ cursor: onClick ? 'pointer' : 'default' }}
      {...props}
    >
      <CardContent className="kpi-card__content">
        {/* Header */}
        <Box className="kpi-card__header">
          <Box className="kpi-card__title-section">
            {Icon && (
              <Box className={`kpi-card__icon kpi-card__icon--${color}`}>
                <Icon />
              </Box>
            )}
            <Box>
              <Typography 
                variant="body2" 
                className="kpi-card__title"
                component="h3"
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography 
                  variant="caption" 
                  className="kpi-card__subtitle"
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>
          
          {actions && (
            <IconButton 
              size="small" 
              className="kpi-card__menu"
              aria-label="Plus d'options"
            >
              <MoreVert />
            </IconButton>
          )}
        </Box>

        {/* Value */}
        <Box className="kpi-card__value-section">
          <Typography 
            variant="h4" 
            className={`kpi-card__value ${loading ? 'kpi-card__value--loading' : ''}`}
            component="div"
          >
            {loading ? (
              <Box className="kpi-card__skeleton" />
            ) : (
              formatValue(value)
            )}
          </Typography>

          {/* Trend */}
          {calculatedTrend && calculatedTrendValue && !loading && (
            <Box className="kpi-card__trend">
              <Chip
                icon={getTrendIcon()}
                label={`${calculatedTrendValue}%`}
                size="small"
                color={getTrendColor()}
                variant="outlined"
                className={`kpi-card__trend-chip kpi-card__trend-chip--${calculatedTrend}`}
              />
            </Box>
          )}
        </Box>

        {/* Previous value comparison */}
        {previousValue && !loading && (
          <Typography 
            variant="caption" 
            className="kpi-card__comparison"
          >
            Précédent: {formatValue(previousValue)}
          </Typography>
        )}

        {/* Loading skeleton for trend */}
        {loading && (
          <Box className="kpi-card__trend-skeleton" />
        )}
      </CardContent>
    </Card>
  );
};

// Predefined KPI card variants
export const UserKpiCard = (props) => (
  <KpiCard
    color="primary"
    format="compact"
    {...props}
  />
);

export const RevenueKpiCard = (props) => (
  <KpiCard
    color="success"
    format="currency"
    {...props}
  />
);

export const ConversionKpiCard = (props) => (
  <KpiCard
    color="warning"
    format="percentage"
    {...props}
  />
);

export const MissionKpiCard = (props) => (
  <KpiCard
    color="info"
    format="number"
    {...props}
  />
);

export default KpiCard;