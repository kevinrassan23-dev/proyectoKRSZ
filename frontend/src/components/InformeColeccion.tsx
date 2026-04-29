import { useEffect, useState } from "react";
import MaterialTable, { type Column } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

interface ItemType {
    id?: number;
    nombre: string;
    marca: string;
    tipo: string;
    precio: number;
}

function InformeColeccion() {

    const [tableData, setTableData] = useState<ItemType[]>([]);

    // ---------------------------------------------------
    // FUNCION QUE PIDE LOS ITEMS AL BACKEND (SELECT *)
    // ---------------------------------------------------
    const getItems = async () => {
        try {
            const obtener = await fetch("http://localhost:3030/getItems");
            const data = await obtener.json();

            let items: ItemType[] = [];

            if (Array.isArray(data)) {
                items = data;
            } else if (Array.isArray(data.data)) {
                items = data.data;
            } else {
                console.error("La API no devolvió un array");
            }

            setTableData(items);
            // Calculamos el total justo cuando llegan los datos
            const total = items.reduce((acc, item) => acc + (Number(item.precio) || 0), 0);
            setPrecioTotal(total);

        } catch (err) {
            console.error("Error obteniendo items:", err);
        }
    };

    // ---------------------------------------------------
    // LLAMAMOS A LA API AL ENTRAR EN EL COMPONENTE
    // ---------------------------------------------------
    useEffect(() => {
        getItems();
    }, []);

    // ---------------------------------------------------
    // DEFINICIÓN DE LAS COLUMNAS DE LA TABLA
    // ---------------------------------------------------
    const columnas: Array<Column<ItemType>> = [
        { title: "Nombre", field: "nombre", filtering: false },
        { title: "Marca", field: "marca", filtering: true },
        { title: "Tipo", field: "tipo", filtering: true },
        { title: "Precio", field: "precio", type: "numeric", filtering: false }
    ];

    // ---------------------------------------------------
    // SUMATORIA DE PRECIOS
    // ---------------------------------------------------
    const [precioTotal, setPrecioTotal] = useState(0);

    useEffect(() => {
        const total = tableData.reduce((acc, item) => acc + (Number(item.precio) || 0), 0);
        setPrecioTotal(total);
    }, [tableData]);


    // ---------------------------------------------------
    // FILA DEL TOTAL ADICIONAL
    // ---------------------------------------------------
    const filaTotal: ItemType = {
        nombre: "TOTAL",
        marca: "",
        tipo: "",
        precio: precioTotal,
    };

    // ---------------------------------------------------
    // VISTA GRÁFICA CON RENDERIZADO CONDICIONAL
    // ---------------------------------------------------
    return (
        <div>
            <MaterialTable
                columns={columnas}
                data={tableData}
                title="Consolas"
                options={{
                    headerStyle: {
                        backgroundColor: "theme.palette.primary.main",
                        color: "#fff",
                    },
                    filtering: true,
                    columnsButton: true,
                    exportMenu: [
                        {
                            label: "Exportar a PDF",
                            exportFunc: (cols, datas) => {
                                // Añadimos fila de total al export
                                ExportPdf(cols, [...datas, filaTotal], "Informe_Consolas");
                            },
                        },
                        {
                            label: "Exportar a CSV",
                            exportFunc: (cols, datas) => {
                                ExportCsv(cols, [...datas, filaTotal], "Informe_Consolas");
                            },
                        },
                    ],
                }}
            />

            <div style={{ padding: "10px", textAlign: "right", fontSize: "18px" }}>
                <strong>
                    Precio Total: {precioTotal.toFixed(2)} €
                </strong>
            </div>
        </div>
    );
}

export default InformeColeccion;
