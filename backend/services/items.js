const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// ------------------------------------------------------
// INSERTAR DATOS EN LA BASE DE DATOS
// ------------------------------------------------------
async function insertData(req, res) {

    // Los datos llegan desde req.query
    const data = req.query;

    // Consulta SQL para insertar datos en la tabla coleccion
    const result = await db.query(
        `
        INSERT INTO coleccion (nombre, marca, tipo, precio)
        VALUES (?, ?, ?, ?)
        `,
        [data.nombre, data.marca, data.tipo, data.precio]
    );

    // AffectedRows indica si se produjo correctamente el INSERT
    return result.affectedRows;
}

// ------------------------------------------------------
// OBTENER TODOS LOS DATOS DE LA TABLA (SELECT * FROM)
// ------------------------------------------------------
async function getData() {
    const rows = await db.query(`
        SELECT * FROM coleccion
    `);

    // Si no hay datos, helper retorna un array vacío
    const data = helper.emptyOrRows(rows);

    return {
        data
    };
}

// ------------------------------------------------------
// BORRAR UN REGISTRO POR ID
// ------------------------------------------------------
async function deleteData(id) {
    
    const result = await db.query(`DELETE FROM coleccion WHERE id = ?`, [id]);
    return result.affectedRows;

}

// ------------------------------------------------------
// EXPORTAMOS LAS FUNCIONES
// ------------------------------------------------------
module.exports = {
    getData,
    insertData,
    deleteData
};
