import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Container, CssBaseline, ThemeProvider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { customTheme } from '../Theme';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';

function Login() {

    // Estados del usuario campos en blanco por defecto
    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const Datos = (e: any) => {
        
        const { name, value, type, checked } = e.target;

        setData({
            ...data,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Componentes de navegación
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * FUNCIÓN PARA VERIFICAR LAS CREDENCIALES:
     * En esta función verificamos las credenciales del usuario.
     * 
     * Tuve que hacer unos cambios y validaciones previas respecto a la función original
     * ya que me daba una serie de errores de respuesta con el servidor.
     * 
     * @returns Usuario, contraseña y rol.
     */
    
    async function isVerifiedUser() {
        try {

            // Accedemos a la ruta donde se encuentran los usuarios registrados para comprobar si las credenciales coinciden
            const credenciales = await fetch(`http://localhost:3030/login?user=${data.username}&password=${data.password}`);

            // accedemos al fichero donde se encuentran los datos del usuario y comparamos
            const logearse = await credenciales.json();

            // Extraemos el usuario y sus datos asociados en una colección de arrays
            const usuarioArray = Array.isArray(logearse.data) ? logearse.data[0] : (logearse.data ?? logearse);

            console.log("Datos extraídos correctamente: ", usuarioArray);

            // Si las credenciales insertadas no se corresponden con las credenciales almacenadas rechazará la petición 
            if (!usuarioArray) {
                alert("Usuario o contraseña incorrectos");
                return;
            }

            // Buscamos el nombre dentro del array extraído de la base de datos
            const nameUser = usuarioArray.nombre ?? usuarioArray.user ?? usuarioArray.username ?? usuarioArray.name ?? usuarioArray.login;

            // Comparamos usuarios y roles correspondientes según los datos del array
            const rolUser = usuarioArray.rol ?? (nameUser === "patricia" ? "admin" : "usuario");

            // Si todo coincide, logueamos el usuario 
            dispatch(authActions.login({
                name: nameUser,
                rol: rolUser
            }));

            // Una vez el usuario se haya logueado correctamente, navegamos a home
            navigate('/home');

        } catch (err) {
            // Controlamos otros posibles errores lanzando una excepción
            console.error("Error al verificar el usuario ", err);
            alert("Error al verificar el usuario ");
        }
    }
    
    // Accedemos a la aplicación con una función de envío del formulario una vez el usuario se haya logueado
    const Acceder = (e: any) => {
        e.preventDefault();
        isVerifiedUser();
    };


// Vista gráfica de la página
return (
    <ThemeProvider theme={customTheme}>
    <CssBaseline />
    <Container
        component="main"
        maxWidth="sm"
        sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}
    >
        <Paper
        elevation={8}
        sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'background.paper',
            borderRadius: 2,
        }}
        >
        {/* Título principal */}
        <Typography
            component="h1"
            variant="h4"
            sx={{
            mb: 1,
            color: 'primary.main',
            }}
        >
            Bienvenido/a mi App
        </Typography>

        <FavoriteIcon
            sx={{
            fontSize: 40,
            color: 'secondary.main',
            mb: 2,
            }}
        />

        {/* Formulario de inserción de datos */}
        <Box component="form" onSubmit={Acceder} sx={{ width: '100%' }}>
            <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={data.username}
            onChange={Datos}
            sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'text.secondary' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                },
                '& .MuiInputLabel-root': { color: 'text.secondary' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
            }}
            />

            <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={Datos}
            sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'text.secondary' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                },
                '& .MuiInputLabel-root': { color: 'text.secondary' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
            }}
            />

            {/* Botón para acceder */}
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
                mt: 1,
                py: 1.5,
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.main', opacity: 0.9 },
                fontWeight: 'bold',
                fontSize: '1rem',
            }}
            >
            Acceder
            </Button>
        </Box>
        </Paper>
    </Container>
    </ThemeProvider>
);
}

export default Login;