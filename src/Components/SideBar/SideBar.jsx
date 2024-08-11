 import Drawer from '@mui/material/Drawer';
  import Toolbar from '@mui/material/Toolbar';
  import Divider from '@mui/material/Divider';
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import ListItemText from '@mui/material/ListItemText';
    
import { Diversity3, Favorite, Home, Logout, Stars } from '@mui/icons-material';
    const drawerWidth = 240;
  export default function SideBar() {
  return  <>
     <Drawer  
        sx={{
          width:   `${drawerWidth}px`,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width:  `${drawerWidth}px`,
            boxSizing: 'border-box',
            backgroundColor: '#D32F2F',  
            color: 'white', 
           },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
      
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Stars />
              </ListItemIcon>
              <ListItemText primary="My Heros" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Favorite />
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Diversity3 />
              </ListItemIcon>
              <ListItemText primary="Community" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
   </>
}
