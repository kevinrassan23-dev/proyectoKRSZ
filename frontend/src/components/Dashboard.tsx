import { useEffect, useState } from "react";

import { useSelector } from 'react-redux';

import type { RootState } from '../store';

import { Button, Container, TextField, Paper, Grid, 
        Table, TableRow, TableCell, TableBody, 
        TableContainer, TableHead} from '@mui/material';

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// Interfaz para importar y definir los items y su tipo
interface itemtype {
    id?: number;
    nombre: string;
    marca: string;
    tipo: string;
    precio: number;
}


// Inicializamos los items como campos vacíos a introducir por el usuario
const inicializarItem: itemtype = {
    nombre: "",
    marca: "",
    tipo:"",
    precio: 0,
}

function Dashboard() {

    // Estado global del item
    const [item, setItem] = useState<itemtype>(inicializarItem);

    // Estado global de la tabla
    const [tableData, setTableData] = useState<itemtype[]>([]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // Extraemos el nombre del item y sus valores

        const {name, value} = e.target;
    
        setItem({
            // Copiamos el estado actual
            ...item,
            // Actualizamos cada propiedad por nombre
            // El valor del campo de precio es el único que cambia, el resto se guarda como texto
            [name]: name == "precio" ? Number(value) : value,
        });
    };

    // LLamamos a la función para insertar los datos en la tabla
    const insertData = async () => {

        try {
            // Parámetros (items a insertar)
            const params = new URLSearchParams({
                nombre: item.nombre,
                marca: item.marca,
                tipo: item.tipo,
                precio: item.precio.toString(),
            });

            // Ruta donde se añadirán y almacenarán las colecciones
            const insertar = await fetch(`http://localhost:3030/addItem?${params}`);

            // Colección de datos a insertar
            const data = await insertar.json();

            // Insertamos los datos
            if (data.affectedRows > 0) {
                alert("Datos insertados correctamente");
                setItem(inicializarItem);
            } else {
                // Controlamos que los campos no puedan quedar vacíos
                alert("ERROR: los campos no pueden quedar vacíos");
            }

        } catch (error) {
            // Controlamos otros errores lanzando un mensaje de alerta
            console.error("Error al insertar item:", error);
            alert("ERROR: al insertar los datos");
        }
    };


    useEffect(() => {
        // Creamos una función para imprimir los datos en la tabla una vez insertados
        const mostrarItems = async () => {
            try {
                const datos = await fetch("http://localhost:3030/getItems");
                const registro = await datos.json();

                // Obtenemos los datos de la base de datos en formato de array
                if (Array.isArray(registro)) {
                    setTableData(registro);

                // También los obtenemos utilizando la extensión .data especificando los tipos datos en formato array
                } else if (Array.isArray(registro.data)) {
                    setTableData(registro.data);

                // Si no es ningún tipo válido, dará error
                } else {
                    console.error("ERROR: Al obtener los datos de la API");
                    setTableData([]);
                }

            } catch (error) {
                // Capturamos cualquier otro error lanzando una excepción
                console.error("ERROR: Al mostrar los datos: ", error);
                // Muestra la taba vacía
                setTableData([]);
            }
        };
        // Muestra la tabla con los datos
        mostrarItems();
    }, []);

    // LLamamos a la función para eliminar los datos de la tabla
    // Los datos los ordenamos y eliminamos por filas

    const deleteData = async (row: itemtype) => {
        // Utilizamos el componente window.confirm para que el usuario pueda controlar en todo momento si
        // desea borrar los datos
        if (!window.confirm(`¿Desea eliminar "${row.nombre}"?`)){ 
            // Devolvemos el resultado de la acción solicitada
            return;
        }

        try {
            // Ruta donde se encuentra la función para eliminar los items
            const eliminar = await fetch(`http://localhost:3030/deleteItem?id=${row.id}`);
            // Eliminamos el item del fichero json
            const result = await eliminar.json();

            // Eliminamos el item de la base de datos
            if (result.deleted > 0) {
                alert("Item eliminado correctamente");
                // Lo eliminamos de la tabla mostrada 
                setTableData(prev => prev.filter(item => item.id !== row.id));
            } else {
                // Controlamos acciones si no se pudo eliminar el item
                alert("No se pudo eliminar el item");
            }
        } catch (error) {
            // Controlamos otros errores
            console.error("Error al eliminar item:", error);
            alert("ERROR: Al eliminar el item");
        }
    };

    // LLamamos a la función imprimir la tabla en pantalla
    useEffect(() => {
        cargarTabla();
    }, []);

    // Función para obtener los datos de la base de datos e imprimirlos en una tabla
    const cargarTabla = async () => {

        try {
            // Ruta donde se ubica la función para obtener los datos almacenados
            const obtener = await fetch("http://localhost:3030/getItems");
            // Obtenemos los datos del fichero json
            const result = await obtener.json();  

            // Mostramos los datos en una tabla
            setTableData(result.data); 
            
        } catch (error) {
            console.error("ERROR: Al cargar la tabla y mostrar los items ", error);
        }
    };

    // Cargamos los datos asociados a los usuarios de la base de datos mediante un selector
    const userData = useSelector((state: RootState) => state.authenticator);
    console.log("Cargando datos del usuario:", userData);

    // Vista gráfica de la página home, formulario y tabla

    return (
        <>
            {/* FORMULARIO */}

            <Container maxWidth="lg" sx={{ mb: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 , md: 3 }}>
                            <TextField
                                label="Nombre"
                                name="nombre"
                                fullWidth
                                value={item.nombre}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 , md: 3 }}>
                            <TextField
                                label="Marca"
                                name="marca"
                                fullWidth
                                value={item.marca}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 , md: 3 }}>
                            <TextField
                                label="Tipo"
                                name="tipo"
                                fullWidth
                                value={item.tipo}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 , md: 3 }}>
                            <TextField
                                label="Precio"
                                name="precio"
                                type="number"
                                fullWidth
                                value={item.precio}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    {/* Botón para insertar */}
                    <Button
                        variant="contained"
                        sx={{ mt: 2, px:3, py: 1, fontWeight: "bold", alignSelf: "flex-start" }}
                        onClick={insertData}
                    >
                        INSERTAR REGISTRO
                    </Button>
                </Paper>
            </Container>

            <Container maxWidth="xl">
                <Paper sx={{ p: 2 }}>

                    {/* TABLA */}
                    <TableContainer>

                        <Table aria-label="Tabla colección">

                            {/* Encabezado de la tabla */}
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "primary.main" }}>

                                    {userData.userRol === 'admin' &&(
                                        <TableCell align="center" sx={{ color: "white" }}>Eliminar</TableCell>
                                    )}
                                    
                                    <TableCell align="center" sx={{ color: "white" }}>Nombre</TableCell>
                                    <TableCell align="center" sx={{ color: "white" }}>Marca</TableCell>
                                    <TableCell align="center" sx={{ color: "white" }}>Tipo</TableCell>
                                    <TableCell align="center" sx={{ color: "white" }}>Precio</TableCell>
                                </TableRow>
                            </TableHead>

                            {/* Cuerpo de la tabla */}
                            <TableBody>
                                {tableData.map((row: itemtype) => (
                                    <TableRow key={row.id}>
                                        
                                        {/* Botón icónico para eliminar por filas llamando a la función deleteData */}
                                        {userData.userRol === 'admin' &&(

                                            <TableCell align="center">
                                                <Button onClick={() => deleteData(row)}>
                                                    <DeleteForeverIcon color="primary" />
                                                </Button>
                                            </TableCell>
                                        )}
                                        
                                        <TableCell align="center">{row.nombre}</TableCell>
                                        <TableCell align="center">{row.marca}</TableCell>
                                        <TableCell align="center">{row.tipo}</TableCell>
                                        <TableCell align="center">{row.precio}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>

        </>
        
    );
}

export default Dashboard;
