import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Link,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  SportsSoccer as SportsIcon,
} from '@mui/icons-material';
import { loginAdmin, clearError } from '../redux/slices/authSlice';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear global error
    if (error) {
      dispatch(clearError());
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password) {
      errors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    dispatch(loginAdmin(formData));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'admin@missionsport.com',
      password: '123456'
    });
    setValidationErrors({});
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <Box className="login-container">
      {/* Background */}
      <Box className="login-background" />
      
      {/* Login Card */}
      <Card className="login-card">
        <CardContent className="login-content">
          {/* Header */}
          <Box className="login-header">
            <Box className="login-logo">
              <SportsIcon className="logo-icon" />
              <Typography variant="h4" className="logo-text">
                Mission Sport
              </Typography>
            </Box>
            <Typography variant="h5" className="login-title">
              Administration
            </Typography>
            <Typography variant="body2" className="login-subtitle">
              Connectez-vous à votre espace d'administration
            </Typography>
          </Box>

          {/* Demo Credentials Alert */}
          <Alert 
            severity="info" 
            className="demo-alert"
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={fillDemoCredentials}
                disabled={loading}
              >
                Utiliser
              </Button>
            }
          >
            <strong>Identifiants de démonstration :</strong><br />
            Email: admin@missionsport.com<br />
            Mot de passe: 123456
          </Alert>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" className="error-alert">
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Adresse email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon className="input-icon" />
                  </InputAdornment>
                ),
              }}
              className="login-input"
            />

            <TextField
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Mot de passe"
              value={formData.password}
              onChange={handleInputChange}
              error={!!validationErrors.password}
              helperText={validationErrors.password}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon className="input-icon" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      disabled={loading}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className="login-input"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              className="login-button"
            >
              {loading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span style={{ marginLeft: 8 }}>Connexion...</span>
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>

          <Divider className="login-divider">
            <Typography variant="body2" color="textSecondary">
              ou
            </Typography>
          </Divider>

          {/* Register Link */}
          <Box className="register-section">
            <Typography variant="body2" className="register-text">
              Pas encore de compte administrateur ?
            </Typography>
            <Link 
              href="#" 
              className="register-link"
              onClick={(e) => {
                e.preventDefault();
                // Navigate to register page (UI only)
                console.log('Navigate to register page');
              }}
            >
              Demander un accès
            </Link>
          </Box>

          {/* Footer */}
          <Box className="login-footer">
            <Typography variant="caption" className="footer-text">
              © 2024 Mission Sport. Tous droits réservés.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;