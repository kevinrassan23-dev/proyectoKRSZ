import { Box, Container, Button, Tooltip } from '@mui/material';
import { useState } from 'react';
import Menu from '../components/Menu';
import InformeColeccion from '../components/InformeColeccion';

function Reports() {

    const [getInformeColeccion, setInformeColeccion] = useState(false);

    const [key, setKey] = useState(0);

    const handleMostrarInformeColeccion = () => {
        setKey(prev => prev + 1); 
        setInformeColeccion(true);
    };



return (
    <>
        <Menu />
        
        <Container>
            <Box sx={{ mt: 4 }}>

                <Tooltip title="Generar infomre de consolas" arrow placement='bottom'>

                    <Button
                        variant="contained"
                        sx={{ mt: 2, px:3, py: 1, fontWeight: "bold", alignSelf: "flex-start" }}
                        onClick={handleMostrarInformeColeccion}
                    >
                        Generar informe
                    </Button>
                    
                </Tooltip>
            </Box>
        </Container>

        <Box sx={{ mt: 4 }}>
            {getInformeColeccion && <InformeColeccion key={key} />}
        </Box>

    </>
);
}

export default Reports;
