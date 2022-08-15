const express = require('express');
const path = require('path');
const PORT = 8080;
global.ADMIN = true;
// MONGODB: MONGO. FIRESTORE: FIRESTORE

const productosRouter = require('./src/routes/producto');
const carritoRouter   = require('./src/routes/carrito');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productosRouter);
app.use('/api/carrito',   carritoRouter);

/** comodín */
app.use('*', function(req, res){
    const path   = req.originalUrl;
    const method = req.method;
    res.status(401).json({
        error: -2,
        descripcion:`ruta ${path} método ${method} no implementada`
    });
});

// Conexión al puerto
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

module.exports = app;
