const PRECIO_CERVEZA = 400;
const PRECIO_COCACOLA = 200;
const PRECIO_LEVITE = 180;
const DESCUENTO_POR_PAGO_EFECTIVO = 0.20;
const INTERES_POR_PAGO_EN_3_CUOTAS = 0.05;
const INTERES_POR_PAGO_EN_6_CUOTAS = 0.15;


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
let tipoDePago = "tipo de pago seleccionado por el usuario";
let cantidadCuotas = "cantidad de cuotas seleccionado por el usuario";
let recargoDescuento = "Recargo o descuento según tipo de pago y cuotas";


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
    for (i=1 ; i <= elementosInventario ; i ++){        
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
    tipoDePago = "Tarjeta";
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
    cantidadCuotas= (Number(document.querySelector("#cantidad_cuotas").value))
    calcularTotales()
    switch (cantidadCuotas){
        case 1:
            descuentoPagoefectivo()
            document.querySelector("#pago_final").innerHTML =`
                <h4>Pagando en 1 cuota tenés un ${DESCUENTO_POR_PAGO_EFECTIVO * 100}% de descuento </h4>
                <h4>En total pagarás $${totalPago}</h4>
                `
            break
        case 3:
            interesPagocuotas(INTERES_POR_PAGO_EN_3_CUOTAS);
            document.querySelector("#pago_final").innerHTML =`
                <h4>Pagando en 3 cuotas tenés un ${INTERES_POR_PAGO_EN_3_CUOTAS*100}% de interés </h4>
                <h4>Pagás 3 cuotas de ${totalPago / 3} cada una </h4>
                <h4>En total pagarás $${totalPago}</h4>
                `
            break    
        case 6:
            interesPagocuotas(INTERES_POR_PAGO_EN_6_CUOTAS);
            document.querySelector("#pago_final").innerHTML =`
                <h4>Pagando en 6 cuotas tenés un ${INTERES_POR_PAGO_EN_6_CUOTAS*100}% de interés </h4>
                <h4>Pagás 6 cuotas de ${totalPago / 6} cada una </h4>
                <h4>En total pagarás $${totalPago}</h4>
                `
            break
        default:
    }

}

function interesPagocuotas(interesSegunCantidadCuotas){
    totalPago = subTotal + (subTotal* interesSegunCantidadCuotas)
    recargoDescuento = `Recargo ${interesSegunCantidadCuotas*100}%`
}

function descuentoPagoefectivo(){
     totalPago = subTotal - (subTotal * DESCUENTO_POR_PAGO_EFECTIVO)
     recargoDescuento = `Dcto ${DESCUENTO_POR_PAGO_EFECTIVO * 100}%`;
}
function pagoEfectivo(){
    tipoDePago = "Efectivo";
    cantidadCuotas = "No aplica";
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

function imprimirTablaFactura(){
    document.querySelector(`#factura`).innerHTML=``;
    document.querySelector(`#factura`).innerHTML=`
        <table id= "tabla_factura">
            <tr id= "fila_cero_tabla_factura">
                <td>Producto</td>
                <td>Cantidad</td>
                <td>Costo Unid.</td>
                <td>Costo Total</td>
                <td>Tipo de pago</td>
                <td>Cuotas</td>
                <td>Recargo/Descuento</td>
            </tr>            
        </table>

    `;
}

function mostrarTotal(){
    document.querySelector(`#totalTotal`).innerHTML = `<h4> Total= $${totalPago}</h4><br>`       
}

function confirmaCompra(){
    
    imprimirTablaFactura()    
    for (i=1 ; i <= elementosInventario ; i ++){        
        if (i==1 & cantidadCerveza > 0 ){
            escribirProductoEnFactura("Cerveza Litro",cantidadCerveza,PRECIO_CERVEZA,total_cerveza,tipoDePago,cantidadCuotas,recargoDescuento)
        }
        else if (i==2 & cantidadCocacola > 0){
            escribirProductoEnFactura("Coca-Cola 2 Litros",cantidadCocacola,PRECIO_COCACOLA,total_cocacola,tipoDePago,cantidadCuotas,recargoDescuento)
        }
        else if (i==3 & cantidadLevite > 0){    
            escribirProductoEnFactura("Levité Manzana Litro",cantidadLevite,PRECIO_LEVITE,total_levite,tipoDePago,cantidadCuotas,recargoDescuento)
        }
        else if (i==4 & cantidadLevitePera > 0){
            escribirProductoEnFactura("Levité Pera Litro",cantidadLevitePera,PRECIO_LEVITE,total_levitePera,tipoDePago,cantidadCuotas,recargoDescuento)
        }    
        else {mostrarTotal()}
        
    };   
}
function escribirProductoEnFactura(nombreProducto,cantidadProducto,costoIndividual,costoTotal,tipoDePago,cuotas,recargo_Descuento){
    generarFilaEnTablaFactura()
    for(columna=1; columna < 8; columna ++){  
        switch (columna){
        case 1:
            document.querySelector(`#fact_col_${columna}_fila${i}`).innerHTML +=`
            ${nombreProducto}`
            break;
        case 2:
            document.querySelector(`#fact_col_${columna}_fila${i}`).innerHTML +=`
            ${cantidadProducto}`
            break;
        case 3:
            document.querySelector(`#fact_col_${columna}_fila${i}`).innerHTML +=`
            ${costoIndividual}`
            break;
        case 4:
            document.querySelector(`#fact_col_${columna}_fila${i}`).innerHTML +=`
            ${costoTotal}`
            break;
        case 5:
            document.querySelector(`#fact_col_${columna}_fila${i}`).innerHTML +=`
            ${tipoDePago}`
            break;
        case 6:
            document.querySelector(`#fact_col_${columna}_fila${i}`).innerHTML +=`
            ${cuotas}`
            break;
        case 7:
            document.querySelector(`#fact_col_${columna}_fila${i}`).innerHTML +=`
            ${recargo_Descuento}`
            break; 
        }
    }
}
function generarFilaEnTablaFactura(){
    document.querySelector("#tabla_factura").innerHTML+=`
        <tr>
            <td id= "fact_col_1_fila${i}"></td>
            <td id= "fact_col_2_fila${i}"></td>
            <td id= "fact_col_3_fila${i}"></td>
            <td id= "fact_col_4_fila${i}"></td>
            <td id= "fact_col_5_fila${i}"></td>
            <td id= "fact_col_6_fila${i}"></td>
            <td id= "fact_col_7_fila${i}"></td>
        </tr>
    `;
}