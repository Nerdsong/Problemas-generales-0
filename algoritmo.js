const PRECIO_CERVEZA = 400;
const PRECIO_COCACOLA = 200;
const PRECIO_LEVITE = 180;
const DESCUENTO_POR_PAGO_EFECTIVO = 0.20;

let cantidadCerveza = 0 //"cantidades de cerveza";
let cantidadCocacola = 0//"cantidades de cocacola";
let cantidadLevite = 0//"cantidades de levite manzana";
let cantidadLevitePera = 0//"cantidades de levite pera";
let cantidadTotalProductos = 0//"total de la cantidad de productos";

let total_cerveza = 0
let total_cocacola = 0
let total_levite = 0
let total_levitePera = 0
let subTotal = 0
let TotalPago = 0

let elementosInventario = 1;
let elemento = "valor booleano";

//cuenta los elementos que hay en el inventario
function calcularElementosInventario(){

    do {elemento = !!document.getElementById(`cantidades_${elementosInventario}`);
        elementosInventario ++;}
    while (elemento == true);
    
    elementosInventario = elementosInventario - 1 };    

//Este bucle genera las listas para seleccionar la candidad de productos
function generadorlistas(){
    calcularElementosInventario()
    for (i=1 ; i < elementosInventario ; i ++){
        for (k=0 ; k < 11 ; k ++){
        document.querySelector(`#cantidades_${i}`).innerHTML +=`
            <option value = "${k}"> ${k} </option> `
    }
}};

generadorlistas();

function asignarCantidades(id){
    switch (id){
        case "boton_cantidades_1":
            cantidadCerveza = Number (document.querySelector("#cantidades_1").value);
            break
        case "boton_cantidades_2":
            cantidadCocacola = Number (document.querySelector("#cantidades_2").value);
            break
        case "boton_cantidades_3":
            cantidadLevite = Number (document.querySelector("#cantidades_3").value);
            break
        case "boton_cantidades_4":
            cantidadLevitePera = Number (document.querySelector("#cantidades_4").value);
            break
    }
}
function calcularTotales(){
    total_cerveza = cantidadCerveza * PRECIO_CERVEZA;
    total_cocacola = cantidadCocacola * PRECIO_COCACOLA;
    total_levite = cantidadLevite * PRECIO_LEVITE;
    total_levitePera = cantidadLevitePera * PRECIO_LEVITE;
    subTotal = (total_cerveza + total_cocacola + total_levite + total_levitePera);
    cantidadTotalProductos = (cantidadCerveza + cantidadCocacola + cantidadLevite + cantidadLevitePera) ;
    totalPago = subTotal;
}
function generarEspaciosCarrito(){
    for (i=1 ; i < elementosInventario ; i ++){
        document.querySelector(`#carrito_de_compra_total`).innerHTML +=`
        <h6 id="carrito_de_compra_${i}"></h6>
        
        `;
    }
}
function generarFilaEnTablaCarrito(){
    document.querySelector("#tabla_carrito").innerHTML+=`
        <tr>
            <td id= "col_1_fila${i}"></td>
            <td id= "col_2_fila${i}"></td>
            <td id= "col_3_fila${i}"></td>
        </tr>
    `;
}
function escribirProductoEnCarrito(nombreProducto,cantidadProducto,total_producto){
    generarFilaEnTablaCarrito()
    for(columna=1; columna < 4; columna ++){  
        switch (columna){
        case 1:
            document.querySelector(`#col_${columna}_fila${i}`).innerHTML +=`
            ${nombreProducto}`
            break;
        case 2:
            document.querySelector(`#col_${columna}_fila${i}`).innerHTML +=`
            ${cantidadProducto}`
            break;
        case 3:
            document.querySelector(`#col_${columna}_fila${i}`).innerHTML +=`
            ${total_producto}`
            break;
        }
    }
}
function verCarritoDeCompra(){
    imprimirTablaCarrito()
    calcularTotales()
    for (i=1 ; i < elementosInventario ; i ++){        
        if (i==1 & cantidadCerveza > 0 ){
            escribirProductoEnCarrito("Cerveza Litro",cantidadCerveza,total_cerveza)
        }
        else if (i==2 & cantidadCocacola > 0){
            escribirProductoEnCarrito("Coca-Cola 2 Litros",cantidadCocacola,total_cocacola)
        }
        else if (i==3 & cantidadLevite > 0){    
            escribirProductoEnCarrito("Levité Manzana Litro",cantidadLevite,total_levite)
        }
        else if (i==4 & cantidadLevitePera > 0){
            escribirProductoEnCarrito("Levité Pera Litro",cantidadLevitePera,total_levitePera)
        }    
        else {mostrarSubTotal()}
        
    };
}
function mostrarSubTotal(){
    document.querySelector(`#sub_total`).innerHTML = `<h4> Sub total= $${subTotal}</h4><br>`; 

}
function vaciarCarrito(){
    document.querySelector(`#carrito_de_compra_total`).innerHTML = ``;
    document.querySelector("#sub_total").innerHTML = ``;
    subTotal = 0
}

function pagoTarjeta (){
    
    if(cantidadTotalProductos < 3){
        
        document.querySelector("#pago_final").innerHTML=`
            
            <label>Cantidad de cuotas
                <select id = "cantidad_cuotas" onchange = "cuotasSeleccionadas()">
                    <option value = 0 > </option>
                    <option value = 1 >1 cuota </option>
                </select>
            </label>
    
        `}
        else if(cantidadTotalProductos < 7 ){
            document.querySelector("#pago_final").innerHTML=`
            
            <label>Cantidad de cuotas
                <select id = "cantidad_cuotas" onchange = "cuotasSeleccionadas()">
                    <option value = 0 > </option>
                    <option value = 1 >1 cuota </option>
                    <option value = 3 >3 cuotas </option>
                </select>
            </label>`
        }
        else if(cantidadTotalProductos >= 7 ){
            document.querySelector("#pago_final").innerHTML=`
            
            <label>Cantidad de cuotas
                <select id= "cantidad_cuotas" onchange = "cuotasSeleccionadas()">
                    <option value = 0 > </option>    
                    <option value = 1 >1 cuota </option>
                    <option value = 3 >3 cuotas </option>
                    <option value = 6 >6 cuotas </option>
                </select>
            </label>`
    }
}
function cuotasSeleccionadas(){
    calcularTotales()
    switch (Number(document.querySelector("#cantidad_cuotas").value)){
        case 1:
            descuentoPagoefectivo()
            document.querySelector("#pago_final").innerHTML =`
                <h4>Pagando en 1 cuota tenés un ${DESCUENTO_POR_PAGO_EFECTIVO * 100}% de descuento </h4>
                <h4>En total pagarás $${totalPago}</h4>
                `
            break
        case 3:
            document.querySelector("#pago_final").innerHTML =`
                <h4>Pagás 3 cuotas de ${totalPago / 3} cada una </h4>
                <h4>En total pagarás $${totalPago}</h4>
                `
            break    
        case 6:
            document.querySelector("#pago_final").innerHTML =`
                <h4>Pagás 6 cuotas de ${totalPago / 6} cada una </h4>
                <h4>En total pagarás $${totalPago}</h4>
                `
            break
        default:
    }

}
function descuentoPagoefectivo(){
     totalPago = subTotal - (subTotal * DESCUENTO_POR_PAGO_EFECTIVO)
}
function pagoEfectivo(){
    descuentoPagoefectivo()
    document.querySelector("#pago_final").innerHTML=`
    <h4> Pagando con efectivo tenés un ${DESCUENTO_POR_PAGO_EFECTIVO * 100}% de descuento</h4>
    <h4> En total, pagarás $${totalPago}</h4>
    `;
}

function imprimirTablaCarrito(){
    document.querySelector(`#carrito_de_compra_total`).innerHTML=``;
    document.querySelector(`#carrito_de_compra_total`).innerHTML=`
        <table id= "tabla_carrito">
            <tr>
                <td>Producto</td>
                <td>Cantidad</td>
                <td></td>
            </tr>            
        </table>

    `;
}

