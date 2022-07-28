const express = require('express');
const { Router } = express;

//cargo el modulo handlebars
const handlebars = require("express-handlebars");

//instancia
const app = express();
const router = Router();

//espacio publico del servidor
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//requires propios
const modController = require('./controller');

//establecemoos la configuracion de handlebars
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    })
);

//establecemos el motor de platilla que se utiliza
app.set("view engine", "hbs");

//establecemos el directorio donde se encuentran los archivos de platilla
app.set("views", "./views");

//rutas y metodos
router.get("/", function (req, res) {
    console. log('GET request recibido');
    const productos = modController.getProductos();
    (productos.length > 0)
    ? res.render("main", { productList: productos, productExist:true })
    : res.render("main", { productList: productos, productExist:false })
}); 

router.post("/", function (req, res) {
    console.log('POST request recibido');
    const nuevoProducto = { 
        title: req.body.productoNombre,
        price: req.body.productoPrecio,
        thumbnail: req.body.productoImagen,
    };
    const newList = modController.setProducto(nuevoProducto);
    res.render("main", { productList: newList, productExist:true })
});


//configuro la ruta
app.use('/productos', router);

const server = app.listen(8080, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));