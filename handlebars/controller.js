let productos = [];

module.exports = function getProductos(){
    console.log("entro al getProductos");
    return productos;
}

module.exports = function getProducto(id){
    return productos.find(prod => prod.id === id) || { error: 'producto no encontrado' };
}

module.exports = function setProducto(objProducto) {
    console.log("entro al setproduct");
    if(productos.length == 0){
        objProducto.id = 1;
    }else{
        let id = productos[productos.length-1].id
        objProducto.id = id + 1;
    }
    console.log("objProducto: ", objProducto);
    console.log("producto: ", productos);
    productos.push(objProducto);
    console.log("productos nuevos: ", productos);

    return productos;
}

module.exports = function borrarProducto(id){
    const productosNuevos = productos.filter(prod => prod.id !== id);
    productos = productosNuevos;
    return productos;
}
