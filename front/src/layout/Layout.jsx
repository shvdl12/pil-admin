import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducer/auth";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout() {
  const navigate = useNavigate();
  const userChecker = useSelector(state => state.auth.user)
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogout = () => {
	dispatch(logout())  
	navigate('/')
  }

  return (
    <Box sx={{ display: 'flex' }}>
    	<CssBaseline />
    	<AppBar position="fixed" open>
    		<Toolbar>
    					{/* <Typography variant="h6" noWrap component="div">
    						PIL Admin
    					</Typography>
					<IconButton color="inherit" aria-label="logout" onClick={handleLogout} edge="end">
						<LogoutIcon />
					</IconButton> */}
				
				<Grid container alignItems="center" justifyContent="space-between">
					<Grid item >
						<Typography variant="h6" noWrap component="div">
    						PIL Admin
    					</Typography>
					</Grid>
					<Grid item>
					<IconButton justifyContent="center" color="inherit" aria-label="logout" onClick={handleLogout} edge="end">
						<LogoutIcon  hover/>
					</IconButton>
					</Grid>
				</Grid>
    			

				
    		</Toolbar>
    	</AppBar>


    	<Drawer sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box',
						},
					}} variant="persistent" anchor="left" open>
    		<DrawerHeader>
			<Grid container alignItems= "center" justifyContent="center">
				<Grid item>
					<Typography variant="h6"> {userChecker.id} / {userChecker.grade} </Typography>
				</Grid>
			</Grid>
			
    		</DrawerHeader>
    		<Divider />
    		<List>
				<ListItem disablePadding>
					<ListItemButton
						onClick={ () => { navigate('/mypage')}}
					>
						<ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
						<ListItemText primary='내 정보'></ListItemText>
					</ListItemButton>
				</ListItem>
				{/* <Divider /> */}
				<ListItem disablePadding>
					<ListItemButton
						onClick={ () => { navigate('/account/management')}}
					>
						<ListItemIcon> <PeopleIcon /> </ListItemIcon>
						<ListItemText primary='계정 관리'></ListItemText>
					</ListItemButton>
				</ListItem>
    		</List>
    		
    	</Drawer>

    	<Main open={true}>
    		<DrawerHeader />
    		<Outlet />
    	</Main>
    </Box>
  );
}
