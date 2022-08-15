const path = require("path");
const request = require("supertest");
const { describe, it } = require("mocha");
const { expect } = require("chai");
const app = require(path.join(__dirname, "../../", "index.js"));

describe('API de productos', () => {
    it("Should get a list of products", async () => {
        const response = await request(app).get("/api/productos");
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Productos obtenidos con éxito");
        expect(response.body.productos).to.be.an("array");
    });

    it("Should get a product by id", async () => {
        const response = await request(app).get("/api/productos/5clKHEN8kczjIfwNHDjW");
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Producto obtenido con éxito");
        expect(response.body.productos).to.be.an("object");
    });
    
    it("Should get an error", async () => {
        const response = await request(app).get("/api/productos/testfallo");
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal("Producto no encontrado");
    });

    it("Should create a product", async () => {
        const response = await request(app).post("/api/productos").send({
            nombre: "PROD NUEVO",
            descripcion: "Producto de prueba",
            codigo: "COD TEST",
            foto: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            precio: 100,
            stock: 10,
        });
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Producto creado con éxito");
        expect(response.body.product).to.be.a("object");
        expect(response.body).to.include.keys('nombre', 'descripcion', 'codigo', 'foto', 'precio', 'stock');
    });

    it("Should edit a product", async () => {
        const response = await request(app).put("/api/productos/5clKHEN8kczjIfwNHDjW").send({
            nombre: "PROD NUEVO",
            descripcion: "Producto de prueba",
            codigo: "COD TEST",
            foto: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            precio: 100,
            stock: 10,
        });
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Producto actualizado con éxito");
        expect(response.body.product).to.be.a("object");
    });

    it("Should delete a product", async () => {
        const response = await request(app).delete("/api/productos/5clKHEN8kczjIfwNHDjW");
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Producto eliminado con éxito");
    });

});