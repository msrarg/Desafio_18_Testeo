const CartService = require('../services/carrito.service');
const cartService = new CartService();

const newCart = async (req, res) => {
    const idNuevoCarrito = await cartService.save(req.body);
    res.status(200).json({id: idNuevoCarrito});
};

const deleteCart = async (req, res) => {
    const id = req.params.id;
    await cartService.deleteById(id);
    res.send("Carrito eliminado");
}

const getCarts = async (req, res) => {
    try {
        const id = req.params?.id ?? null;
        // console.log(id);
        let carts = [];
        let message;
        if(id == null) {
            carts = await cartService.getAll();
            message = "Carritos obtenidos con éxito";
        }
        else {
            carts = await cartService.getById(id);
            // console.log(carts);
            if(carts === null) {
                throw new Error('carrito no encontrado');
            }
            message = "Carrito obtenido con éxito";
        }
        rest.status(200).json({
            message,
            carts,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const getProducts = async (req, res) => {
    try {
        const id = req.params.id;
        const carritoC = await cartService.getById(id);
        if(carritoC === null) {
            throw new Error('carrito no encontrado');
        }
        res.status(200).json({
            message: "Productos obtenidos con éxito",
            products: carritoC.productos ?? carritoC.data.productos,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const addProduct = async (req, res) => {
    const idCarrito = req.params.id;
    const productos = req.body;
    try {
        const carritoC = await cartService.getById(idCarrito);
        // console.log("Init",carritoC);

        if(carritoC === null) {
            throw new Error('carrito no encontrado');
        }
        await cartService.addProduct(idCarrito, productos);

        res.send({
            message: "Productos agregados con éxito",
            products: productos
        });

    } catch (error) {
        res.send({
            message: error.message
        });
    }
}

const deleteProduct = async (req, res) => {
    const idCarrito = req.params.id;
    const idProd = req.params.idProd;
    try {
        const carritoC = await cartService.getById(idCarrito);
        if(carritoC === null) {
            throw new Error('carrito no encontrado');
        }

        await cartService.deleteProduct(idCarrito, idProd);

        res.send({
            message: "Producto eliminado con éxito"
        });
    } catch (error) {
        res.send({
            message: error.message
        })
    }
}

module.exports = {
    newCart, deleteCart, getProducts, getCarts, addProduct, deleteProduct
}