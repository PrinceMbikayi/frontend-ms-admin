import React, { useState, useCallback, useMemo } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  gridClasses
} from '@mui/x-data-grid';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Paper,
  Typography,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import './DataTable.css';

const DataTable = ({
  rows = [],
  columns = [],
  loading = false,
  error = null,
  title = '',
  onAdd = null,
  onEdit = null,
  onDelete = null,
  onView = null,
  onRefresh = null,
  searchable = true,
  exportable = true,
  selectable = false,
  pagination = true,
  pageSize = 25,
  pageSizeOptions = [10, 25, 50, 100],
  height = 600,
  density = 'standard',
  checkboxSelection = false,
  disableSelectionOnClick = true,
  hideFooter = false,
  hideFooterPagination = false,
  hideFooterSelectedRowCount = false,
  autoHeight = false,
  rowHeight = 52,
  headerHeight = 56,
  customToolbar = null,
  customActions = [],
  filters = [],
  sortModel = [],
  onSortModelChange = null,
  onFilterModelChange = null,
  onSelectionModelChange = null,
  selectedRows = [],
  getRowId = null,
  rowsPerPageOptions = [10, 25, 50, 100],
  noRowsOverlay = null,
  noResultsOverlay = null,
  loadingOverlay = null,
  errorOverlay = null,
  className = '',
  sx = {},
  ...props
}) => {
  const [searchText, setSearchText] = useState('');
  const [quickFilterText, setQuickFilterText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSize
  });

  // Filter rows based on search text
  const filteredRows = useMemo(() => {
    if (!searchText.trim()) return rows;
    
    return rows.filter(row => {
      return Object.values(row).some(value => {
        if (value === null || value === undefined) return false;
        return value.toString().toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }, [rows, searchText]);

  // Enhanced columns with actions
  const enhancedColumns = useMemo(() => {
    const baseColumns = columns.map(col => ({
      ...col,
      sortable: col.sortable !== false,
      filterable: col.filterable !== false,
      hideable: col.hideable !== false,
      resizable: col.resizable !== false,
    }));

    // Add actions column if any action handlers are provided
    if (onEdit || onDelete || onView || customActions.length > 0) {
      baseColumns.push({
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        filterable: false,
        hideable: false,
        disableExport: true,
        renderCell: (params) => (
          <Box className="actions-cell">
            {onView && (
              <Tooltip title="Voir">
                <IconButton
                  size="small"
                  onClick={() => onView(params.row)}
                  className="action-button view-button"
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onEdit && (
              <Tooltip title="Modifier">
                <IconButton
                  size="small"
                  onClick={() => onEdit(params.row)}
                  className="action-button edit-button"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Supprimer">
                <IconButton
                  size="small"
                  onClick={() => onDelete(params.row)}
                  className="action-button delete-button"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {customActions.length > 0 && (
              <Tooltip title="Plus d'actions">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    setSelectedRowsData([params.row]);
                  }}
                  className="action-button more-button"
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )
      });
    }

    return baseColumns;
  }, [columns, onEdit, onDelete, onView, customActions]);

  // Custom toolbar component
  const CustomToolbar = useCallback(() => {
    if (customToolbar) {
      return customToolbar;
    }

    return (
      <GridToolbarContainer className="data-table-toolbar">
        <Box className="toolbar-left">
          {title && (
            <Typography variant="h6" className="table-title">
              {title}
              {filteredRows.length !== rows.length && (
                <Chip
                  label={`${filteredRows.length}/${rows.length}`}
                  size="small"
                  color="primary"
                  className="filter-chip"
                />
              )}
            </Typography>
          )}
        </Box>
        
        <Box className="toolbar-center">
          {searchable && (
            <TextField
              size="small"
              placeholder="Rechercher..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchText && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchText('')}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              className="search-field"
            />
          )}
        </Box>
        
        <Box className="toolbar-right">
          <GridToolbarFilterButton />
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          {exportable && <GridToolbarExport />}
          
          {onRefresh && (
            <Tooltip title="Actualiser">
              <IconButton onClick={onRefresh} disabled={loading}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}
          
          {onAdd && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAdd}
              className="add-button"
            >
              Ajouter
            </Button>
          )}
        </Box>
      </GridToolbarContainer>
    );
  }, [title, searchText, filteredRows.length, rows.length, onAdd, onRefresh, loading, searchable, exportable, customToolbar]);

  // Handle selection change
  const handleSelectionChange = useCallback((newSelection) => {
    const selectedData = newSelection.map(id => 
      filteredRows.find(row => (getRowId ? getRowId(row) : row.id) === id)
    ).filter(Boolean);
    
    setSelectedRowsData(selectedData);
    
    if (onSelectionModelChange) {
      onSelectionModelChange(newSelection, selectedData);
    }
  }, [filteredRows, getRowId, onSelectionModelChange]);

  // Handle pagination change
  const handlePaginationModelChange = useCallback((newModel) => {
    setPaginationModel(newModel);
  }, []);

  // Custom overlays
  const NoRowsOverlay = () => (
    <Box className="no-rows-overlay">
      <Typography variant="h6" color="textSecondary">
        Aucune donnée disponible
      </Typography>
      {onAdd && (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{ mt: 2 }}
        >
          Ajouter le premier élément
        </Button>
      )}
    </Box>
  );

  const NoResultsOverlay = () => (
    <Box className="no-results-overlay">
      <Typography variant="h6" color="textSecondary">
        Aucun résultat trouvé
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Essayez de modifier vos critères de recherche
      </Typography>
      <Button
        variant="outlined"
        startIcon={<ClearIcon />}
        onClick={() => setSearchText('')}
        sx={{ mt: 2 }}
      >
        Effacer la recherche
      </Button>
    </Box>
  );

  const LoadingOverlay = () => (
    <Box className="loading-overlay">
      <CircularProgress />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Chargement des données...
      </Typography>
    </Box>
  );

  const ErrorOverlay = () => (
    <Box className="error-overlay">
      <Alert severity="error" sx={{ mb: 2 }}>
        {error || 'Une erreur est survenue lors du chargement des données'}
      </Alert>
      {onRefresh && (
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
        >
          Réessayer
        </Button>
      )}
    </Box>
  );

  if (error) {
    return (
      <Paper className={`data-table-container error ${className}`} sx={sx}>
        <ErrorOverlay />
      </Paper>
    );
  }

  return (
    <Paper className={`data-table-container ${className}`} sx={sx}>
      <DataGrid
        rows={filteredRows}
        columns={enhancedColumns}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick={disableSelectionOnClick}
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectedRows}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        onFilterModelChange={onFilterModelChange}
        getRowId={getRowId}
        density={density}
        autoHeight={autoHeight}
        rowHeight={rowHeight}
        columnHeaderHeight={headerHeight}
        hideFooter={hideFooter}
        hideFooterPagination={hideFooterPagination}
        hideFooterSelectedRowCount={hideFooterSelectedRowCount}
        slots={{
          toolbar: CustomToolbar,
          noRowsOverlay: noRowsOverlay || NoRowsOverlay,
          noResultsOverlay: noResultsOverlay || NoResultsOverlay,
          loadingOverlay: loadingOverlay || LoadingOverlay
        }}
        sx={{
          height: autoHeight ? 'auto' : height,
          '& .MuiDataGrid-cell:focus': {
            outline: 'none'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.04)'
          },
          [`& .${gridClasses.cell}`]: {
            borderBottom: '1px solid #e0e0e0'
          },
          [`& .${gridClasses.columnHeaders}`]: {
            backgroundColor: '#fafafa',
            borderBottom: '2px solid #e0e0e0'
          },
          ...sx
        }}
        {...props}
      />

      {/* Custom Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          className: 'actions-menu'
        }}
      >
        {customActions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.onClick(selectedRowsData[0]);
              setAnchorEl(null);
            }}
            disabled={action.disabled}
          >
            {action.icon && (
              <ListItemIcon>
                {action.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={action.label} />
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
};

export default DataTable;