import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton,
        ListItemIcon, ListItemText, Box, Avatar} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import LogoutIcon from '@mui/icons-material/Logout';
import SecurityIcon from '@mui/icons-material/Security';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { authActions } from '../store/authSlice';
import { useEffect } from 'react';

function Menu() {

    // Estados del menu
    const [open, setOpen] = useState(false);

    // Componentes de navegación
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Abrimos el menú y creamos una condición booleana para determinar si está abierto o no 
    // mediante los estados del menú
    const abrirMenu = (openState: boolean) => () => {
        setOpen(openState);
    };

    // Fucnión para volver a la ruta padre (Login) y cerrar la aplicación
    const logout = () => {
        dispatch(authActions.logout());
        navigate('/');
    };

    // Cargamos los datos asociados a los usuarios de la base de datos mediante un selector
    const userData = useSelector((state: RootState) => state.authenticator);
    console.log("Cargando datos del usuario:", userData);

    // usuario logueado
    const isLoggedin = userData.isAuthenticated;

    // Controlamos que el usuario se ha logueado correctamente
    useEffect(() => {
        // Si los datos no coinciden no entra
        if (!isLoggedin) {
        navigate('/');
        }
        // en caso contrario navegamos a home
    }, [isLoggedin, navigate]);


    // Designamos un icono según el rol del usuario en la aplicación
    const rolIcon = userData.userRol === 'admin' ? <SecurityIcon /> : <Avatar />;

    // DrawerList (menú)
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={abrirMenu(false)}>
            <List>

                {/* Inicio */}
                <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Inicio" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                {/* Reportes */}
                {userData.userRol === 'admin' && (

                    <Link to="/reports" style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                            <ListItemIcon><TaskIcon /></ListItemIcon>
                            <ListItemText primary="Reportes" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                )}
                

                {/* Ayuda */}
                <Link to="/help" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
                        <ListItemText primary="Ayuda" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                {/* Salir */}
                <ListItem disablePadding onClick={logout}>
                    <ListItemButton>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Salir" />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    );

    return (
        <>
            {/* Tool Bar */}
            <AppBar position="static" sx={{ mb: 2, backgroundColor: 'primary.main' }}>
                <Toolbar>

                {/* BOTÓN DE HAMBURGUESA */}
                <IconButton edge="start" color="inherit" onClick={abrirMenu(true)}>
                    <MenuIcon />
                </IconButton>

                {/* IMPRIMIMOS NOMBRE DE USUARIO */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {userData.userName}
                </Typography>

                {/* IMPRIMIMOS SU ROL E ICONO CORRESPONDIENTES */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {rolIcon}
                    <Typography variant="body1">
                        ({userData.userRol})
                    </Typography>
                </Box>
                </Toolbar>
            </AppBar>

            {/* CONTROLAMOS LOS ESTADOS DEL MENÚ DRAWER */}
            <Drawer open={open} onClose={abrirMenu(false)}>
                {DrawerList}
            </Drawer>

        </>
    );
}

export default Menu;
