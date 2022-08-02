const express = require('express');
const { Router } = express;

//instancia
const app = express();
const router = Router();

//espacio publico del servidor
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//requires propios
const modController = require('./controller');

//establecemos el motor de platilla que se utiliza
app.set("view engine", "ejs");

//establecemos el directorio donde se encuentran los archivos de platilla
app.set("views", "./views");

//rutas y metodos
router.get("/", function (req, res) {
    console. log('GET request recibido');
    const productos = modController.getProductos();
    (productos.length > 0)
    ? res.render("layouts/index", { productList: productos, productExist:true })
    : res.render("layouts/index", { productList: productos, productExist:false })
}); 

router.post("/", function (req, res) {
    console.log('POST request recibido');
    const nuevoProducto = {
        title: req.body.productoNombre,
        price: req.body.productoPrecio,
        thumbnail: req.body.productoImagen,
    };
    const newList = modController.setProducto(nuevoProducto);
    res.render("layouts/index", { productList: newList, productExist:true })
});


//configuro la ruta
app.use('/productos', router);

const server = app.listen(8080, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));