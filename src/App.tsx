import React, { useState, useMemo } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Button,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  Menu as MenuIcon,
  Home,
  TrendingUp,
  Bookmark,
  Settings,
  HelpCircle,
  Bell,
  User,
  Filter,
  Grid3X3,
  List as ListIcon,
  ArrowUpDown,
  BookOpen,
} from 'lucide-react';
import { categories, mockKnowledgeItems, allTags } from './data/categories';
import { FilterState, KnowledgeCategory } from './types';
import { getIcon } from './utils/icons';
import KnowledgeCard from './components/KnowledgeCard';
import CategoryOverview from './components/CategoryOverview';

const drawerWidth = 280;

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState<FilterState>({
    category: 'all',
    subcategory: 'all',
    tags: [],
    searchQuery: '',
    sortBy: 'newest',
    viewMode: 'grid',
  });
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryChange = (category: KnowledgeCategory | 'all') => {
    setFilter(prev => ({ ...prev, category, subcategory: 'all' }));
    if (isMobile) setMobileOpen(false);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setFilter(prev => ({ ...prev, subcategory }));
    if (isMobile) setMobileOpen(false);
  };

  const handleTagToggle = (tag: string) => {
    setFilter(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, searchQuery: event.target.value }));
  };

  const filteredItems = useMemo(() => {
    let items = [...mockKnowledgeItems];

    if (filter.category !== 'all') {
      items = items.filter(item => item.category === filter.category);
    }

    if (filter.subcategory !== 'all') {
      items = items.filter(item => item.subcategory === filter.subcategory);
    }

    if (filter.tags.length > 0) {
      items = items.filter(item =>
        filter.tags.some(tag => item.tags.includes(tag))
      );
    }

    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    switch (filter.sortBy) {
      case 'newest':
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        items.sort((a, b) => b.views - a.views);
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return items;
  }, [filter]);

  const currentCategory = categories.find(c => c.id === filter.category);

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BookOpen size={24} color="white" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              知识库
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Knowledge Base
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
        <List sx={{ px: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
              selected={filter.category === 'all'}
              onClick={() => handleCategoryChange('all')}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Home size={20} />
              </ListItemIcon>
              <ListItemText primary="全部内容" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mb: 0.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <TrendingUp size={20} />
              </ListItemIcon>
              <ListItemText primary="热门内容" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 2,
                mb: 0.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Bookmark size={20} />
              </ListItemIcon>
              <ListItemText primary="我的收藏" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ my: 2, mx: 2 }} />

        <Typography
          variant="subtitle2"
          sx={{ px: 3, mb: 1, color: 'text.secondary', fontWeight: 600 }}
        >
          知识分类
        </Typography>

        <List sx={{ px: 2 }}>
          {categories.map((category) => {
            const Icon = getIcon(category.icon);
            return (
              <ListItem key={category.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={filter.category === category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  sx={{
                    borderRadius: 2,
                    '&.Mui-selected': {
                      backgroundColor: category.color,
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Icon size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={category.name} 
                    secondary={filter.category === category.id ? '' : `${mockKnowledgeItems.filter(i => i.category === category.id).length} 项`}
                    secondaryTypographyProps={{ fontSize: '0.75rem' }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {currentCategory && (
          <>
            <Divider sx={{ my: 2, mx: 2 }} />
            <Typography
              variant="subtitle2"
              sx={{ px: 3, mb: 1, color: 'text.secondary', fontWeight: 600 }}
            >
              {currentCategory.name} - 子分类
            </Typography>
            <List sx={{ px: 2 }}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={filter.subcategory === 'all'}
                  onClick={() => handleSubcategoryChange('all')}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemText primary="全部" />
                </ListItemButton>
              </ListItem>
              {currentCategory.subcategories.map((sub) => (
                <ListItem key={sub} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    selected={filter.subcategory === sub}
                    onClick={() => handleSubcategoryChange(sub)}
                    sx={{ borderRadius: 2 }}
                  >
                    <ListItemText primary={sub} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>

      {/* Bottom Actions */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <List sx={{ px: 0 }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: 2 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Settings size={20} />
              </ListItemIcon>
              <ListItemText primary="设置" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: 2 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <HelpCircle size={20} />
              </ListItemIcon>
              <ListItemText primary="帮助" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Search Bar */}
          <Paper
            component="form"
            elevation={0}
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'grey.50',
              borderRadius: 3,
              px: 2,
              py: 0.5,
              maxWidth: 600,
            }}
          >
            <Search size={20} color={theme.palette.text.secondary} />
            <InputBase
              placeholder="搜索知识库..."
              value={filter.searchQuery}
              onChange={handleSearchChange}
              sx={{ ml: 1.5, flex: 1, fontSize: '0.9375rem' }}
            />
          </Paper>

          <Box sx={{ flex: 1 }} />

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: 'text.secondary' }}>
              <Badge badgeContent={3} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                cursor: 'pointer',
              }}
            >
              <User size={18} />
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3, md: 4 },
          pt: { xs: 10, sm: 11 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* Category Overview */}
        {filter.category === 'all' && !filter.searchQuery && filter.tags.length === 0 && (
          <CategoryOverview categories={categories} items={mockKnowledgeItems} />
        )}

        {/* Filters & Sort */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {currentCategory ? currentCategory.name : '全部内容'}
            </Typography>
            <Typography color="text.secondary">
              共 {filteredItems.length} 项
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              startIcon={<Filter size={18} />}
              onClick={(e) => setSortAnchorEl(e.currentTarget)}
              sx={{ textTransform: 'none' }}
            >
              筛选
            </Button>
            <Button
              startIcon={<ArrowUpDown size={18} />}
              onClick={(e) => setSortAnchorEl(e.currentTarget)}
              sx={{ textTransform: 'none' }}
            >
              {filter.sortBy === 'newest' && '最新'}
              {filter.sortBy === 'popular' && '最热'}
              {filter.sortBy === 'rating' && '评分'}
              {filter.sortBy === 'name' && '名称'}
            </Button>
            <IconButton
              color={filter.viewMode === 'grid' ? 'primary' : 'default'}
              onClick={() => setFilter(prev => ({ ...prev, viewMode: 'grid' }))}
            >
              <Grid3X3 size={20} />
            </IconButton>
            <IconButton
              color={filter.viewMode === 'list' ? 'primary' : 'default'}
              onClick={() => setFilter(prev => ({ ...prev, viewMode: 'list' }))}
            >
              <ListIcon size={20} />
            </IconButton>
          </Box>
        </Box>

        {/* Tags Filter */}
        {filter.tags.length > 0 && (
          <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {filter.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleTagToggle(tag)}
                color="primary"
                size="small"
              />
            ))}
            <Chip
              label="清除全部"
              variant="outlined"
              size="small"
              onClick={() => setFilter(prev => ({ ...prev, tags: [] }))}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        )}

        {/* Popular Tags */}
        {!filter.searchQuery && filter.tags.length === 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.secondary' }}>
              热门标签
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {allTags.slice(0, 15).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  onClick={() => handleTagToggle(tag)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderColor: 'primary.main',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Content Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: filter.viewMode === 'grid'
              ? {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                  xl: 'repeat(4, 1fr)',
                }
              : '1fr',
            gap: 3,
          }}
        >
          {filteredItems.map((item) => (
            <KnowledgeCard
              key={item.id}
              item={item}
              viewMode={filter.viewMode}
            />
          ))}
        </Box>

        {filteredItems.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              color: 'text.secondary',
            }}
          >
            <Box sx={{ mb: 2, opacity: 0.5 }}>
              <Search size={48} />
            </Box>
            <Typography variant="h6" gutterBottom>
              未找到相关内容
            </Typography>
            <Typography>
              尝试调整搜索条件或筛选标签
            </Typography>
          </Box>
        )}
      </Box>

      {/* Sort Menu */}
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={() => setSortAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setFilter(prev => ({ ...prev, sortBy: 'newest' }));
            setSortAnchorEl(null);
          }}
          selected={filter.sortBy === 'newest'}
        >
          最新发布
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilter(prev => ({ ...prev, sortBy: 'popular' }));
            setSortAnchorEl(null);
          }}
          selected={filter.sortBy === 'popular'}
        >
          最受欢迎
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilter(prev => ({ ...prev, sortBy: 'rating' }));
            setSortAnchorEl(null);
          }}
          selected={filter.sortBy === 'rating'}
        >
          评分最高
        </MenuItem>
        <MenuItem
          onClick={() => {
            setFilter(prev => ({ ...prev, sortBy: 'name' }));
            setSortAnchorEl(null);
          }}
          selected={filter.sortBy === 'name'}
        >
          名称排序
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default App;
