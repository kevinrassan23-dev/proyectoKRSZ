import { Typography, Box, Container } from '@mui/material';

import Menu from '../components/Menu';

function Help() {
return (
    <>

    <Menu />
    
    <Container>
        <Box sx={{ mt: 4 }}>
            <Typography variant="h3" component="h1">
                Bienvenido/a a la página de ayuda
            </Typography>
            
            <Typography variant="body1">
                En esta página encontrarás todo lo que necesisas
            </Typography>
        </Box>
    </Container>
    </>
);
}

export default Help;