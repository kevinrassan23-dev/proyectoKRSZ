import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/index';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import Dashboard from '../components/Dashboard';
import { useEffect } from 'react';

function Home() {

    //Componentes de navegación
    const navigate = useNavigate();


    // Leer y seleccionar datos
    const userData = useSelector((state: RootState) => state.authenticator);
    console.log(userData);

    const isLoggedin = userData.isAuthenticated
    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        }

    }, [isLoggedin, navigate])

    // Vista gráfica de la página
return (
    <>
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>

            <Menu />
            <Dashboard />
        </Container>


    </>
);
}

export default Home;
