import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faTicket, faUser, faBriefcase, faBook } from '@fortawesome/free-solid-svg-icons';
import { removeToken } from '../services/authService';

const drawerWidth = "w-60"; // Tailwind class for width (240px)

const Basic = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const updateDrawerState = () => {
      setDrawerOpen(window.innerWidth >= 1024); // Tailwind breakpoint 'lg'
    };

    updateDrawerState();
    window.addEventListener('resize', updateDrawerState);
    return () => window.removeEventListener('resize', updateDrawerState);
  }, []);

  const pathname = useLocation().pathname;

  return (
    <div className="flex w-full">
      {/* Header */}
      <header className="fixed z-10 w-full bg-[#00008B] text-white shadow-md" >
        <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-6">
                  <IconButton
                    onClick={handleDrawerToggle}
                    className="lg:hidden text-white"
                    aria-label="Toggle Sidebar"
                >
                    <MenuIcon sx={{ color: 'white' }}/>
                </IconButton>
            </div>
            <div className="flex items-center">
              <span className="px-4 text-center">{user.email}</span>
              <FontAwesomeIcon icon={faUserCircle} size="2x" onClick={handleMenuOpen} className="cursor-pointer mr-3" />
            </div>
            
        </div>
        
      </header>
        <div className="mt-3 mr-4">
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <span className="px-4 text-center">{user.name}</span>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-md transition-transform ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full px-4">
          <div className="p-4 text-center text-xl font-bold shadow-lg">
            App Name
          </div>
          <nav className="flex-1">
            <List>
              <ListItem className={`cursor-pointer hover:bg-gray-100 ${pathname === '/' ? 'bg-gray-100' : ''}`}>
                <div className="flex items-center" onClick={() => navigate('/')}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faUser} />
                    </ListItemIcon>
                    <ListItemText primary="User" />
                </div>
              </ListItem>
              <ListItem className={`cursor-pointer hover:bg-gray-100 ${pathname === '/worklog' ? 'bg-gray-100' : ''}`}>
                <div className="flex items-center" onClick={() => navigate('/worklog')}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faBriefcase} />
                    </ListItemIcon>
                    <ListItemText primary="WorkLogs"/>
                </div>
              </ListItem>
              <ListItem className={`cursor-pointer hover:bg-gray-100 ${pathname === '/project' ? 'bg-gray-100' : ''}`}>
                <div className="flex items-center" onClick={() => navigate('/project')}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faBook} />
                    </ListItemIcon>
                    <ListItemText primary="Project"/>
                </div>
              </ListItem>
            </List>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 w-full bg-gray-100 transition-all ${
          drawerOpen ? 'lg:ml-60' : 'ml-0'
        } pt-16 h-full`}
      >
        <div className="p-4">
          <Outlet /> {/* Render child routes */}
        </div>
      </main>
    </div>
  );
};

export default Basic;
