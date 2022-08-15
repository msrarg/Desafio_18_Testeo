const ProductService = require('../services/producto.service');
const productService = new ProductService();

const getProducts = async (req, res) => {
    try {
        const id = req.params?.id ?? null;
        // console.log(id);
        let productos = [];
        let message;
        if(id == null) {
            productos = await productService.getAll();
            message = "Productos obtenidos con éxito";
        }
        else {
            productos = await productService.getById(id);
            if(productos === null) {
                throw new Error('Producto no encontrado');
            }
            message = "Producto obtenido con éxito";
        }
        return res.status(200).json({
            message,
            productos,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const postProduct = async (req, res) => {
    const product = await productService.save(req.body);
    res.status(200).json({
        message: "Producto creado con éxito",
        product
    });
}

const editProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    // console.log(data);
    const product = await productService.updateById(id, data);
    res.status(200).json({
        message: "Producto actualizado con éxito",
        product
    })
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    await productService.deleteById(id);
    res.status(200).json({
        message: "Producto eliminado con éxito"
    });
}

module.exports = {
    getProducts, postProduct, editProduct, deleteProduct
}