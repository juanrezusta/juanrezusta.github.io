
//ARRANCAMOS EL ENTREGABLE 1

const almacen = [
    {nombre: "Fideos 500gr", precio: 1250},
    {nombre: "Harina 1kg", precio: 699},
    {nombre: "Arroz 1kg", precio: 2300},
    {nombre: "Aceite 1.5lts", precio: 1550},
    {nombre: "Azúcar 1kg", precio: 900},

];

const frescos = [
    {nombre: "Huevo 12u", precio: 2450},
    {nombre: "Salchichas x6u", precio: 1600},
    {nombre: "Morcilla x4u", precio: 2200},
    {nombre: "Chorizo x3u", precio: 2500},
    {nombre: "Queso 1kg", precio: 7800},
];

const bebidas = [
    {nombre: "Agua mineral 2lts", precio: 1100},
    {nombre: "Gaseosa cola 2.25lts", precio: 1950},
    {nombre: "Gaseosa naranja 2.25lts", precio: 1900},
    {nombre: "Cerveza 1lts", precio: 1730},
    {nombre: "Vino tinto 750ml", precio: 3400},
];



function cantidad_de_producto(item){
    mensaje="Cuantas unidades de "+item.nombre+" queres? $"+item.precio + " cuesta cada uno."
    return mensaje
} 
function agregar_carrito(item,cantidad){
    let producto ={
        nombre:item.nombre,
        cantidad:cantidad,
        precio:item.precio
    }
    carrito.push(producto)
}    

function total_valor_item(item,cantidad){
    let total_item=item.precio*cantidad
    return total_item
}

function valor_total_carrito(){
    let total_valor=0
    for (let item of carrito){
        total_valor += (item.cantidad*item.precio)
    }
    return total_valor
}

function facturar(){
    let mensaje_factura="Esta es su factura:\n"
    let total_mensaje=`\nMonto total a abonar : $${valor_total_carrito()}\n`
    for (let item of carrito){
        mensaje_factura += ` ${item.cantidad}u. ${item.nombre} $${item.precio} c/u  \n     total item: $${total_valor_item(item, item.cantidad)}\n`;
    }
    let mensajazo=mensaje_factura+total_mensaje
    return mensajazo
}


function confirmar_agregacion(item,cantidad){
    let total=item.precio*cantidad
    let mensaje="Confirma que quieres agregar "+cantidad+" de "+item.nombre+" por $"+total
    return mensaje
}

function mostrar_carrito(){
    for (let i of carrito){
        console.log(i)
    }
}



function mostrar_categoria(categoria){
    let contador_id=1
    let menu_detallado=""
    
    for (let item of categoria){
        menu_detallado += "["+contador_id+"] "+ item.nombre + " Precio: " + item.precio + " Stock: " + item.stock +"\n";
        contador_id += 1
    }    
    while (true) { 
        let opcion_producto_elegido=prompt("Elige una opcion con su identificador:\n\n"+menu_detallado)
    
        opcion_producto_elegido = parseInt(opcion_producto_elegido)
        if (opcion_producto_elegido >= 0 && opcion_producto_elegido <= contador_id-1) {
            let producto_elegido= categoria[opcion_producto_elegido-1]
            return producto_elegido
            break
        } else {
            alert("Ingresaste cualquier verdura, va de nuevo...")
        }
    }   
}    



let carrito=[]

function main() {
    let terminarCompra = false;

    while (true) {
        let primer_opcion = parseInt(prompt("Bienvenido a MercaditoSape:\n\nQue deseas llevar:\n[1] Almacen\n[2] Frescos\n[3] Bebidas\n[4] Terminar compra"));

        switch(primer_opcion) {
            case 1:
                {let producto_elegido_almacen = mostrar_categoria(almacen);
                let cantidad_producto_elegido;
                do {
                    cantidad_producto_elegido = prompt(cantidad_de_producto(producto_elegido_almacen))
                    if (cantidad_producto_elegido === null){
                        break
                    } else if (!isNaN(cantidad_producto_elegido) && parseInt(cantidad_producto_elegido)>=0){
                        if (confirm(confirmar_agregacion(producto_elegido_almacen, cantidad_producto_elegido))) {
                            agregar_carrito(producto_elegido_almacen, cantidad_producto_elegido)
                            mostrar_carrito()
                    }
                    break
                } else {
                    alert("Por favor, ingresa un numero positivo.")
                }
                }while (true)
                break;
                }   
            case 2:
                {let producto_elegido_frescos = mostrar_categoria(frescos);
                let cantidad_producto_elegido;
                do {
                    cantidad_producto_elegido = prompt(cantidad_de_producto(producto_elegido_frescos))
                    if (cantidad_producto_elegido === null){
                        break
                    } else if (!isNaN(cantidad_producto_elegido) && parseInt(cantidad_producto_elegido)>=0){
                        if (confirm(confirmar_agregacion(producto_elegido_frescos, cantidad_producto_elegido))) {
                            agregar_carrito(producto_elegido_frescos, cantidad_producto_elegido)
                            mostrar_carrito()
                    }
                    break
                } else {
                    alert("Por favor, ingresa un numero positivo.")
                }
                }while (true)
                break;
                }   
            case 3:
                {let producto_elegido_bebidas = mostrar_categoria(bebidas);
                let cantidad_producto_elegido;
                do {
                    cantidad_producto_elegido = prompt(cantidad_de_producto(producto_elegido_bebidas))
                    if (cantidad_producto_elegido === null){
                        break
                    } else if (!isNaN(cantidad_producto_elegido) && parseInt(cantidad_producto_elegido)>=0){
                        if (confirm(confirmar_agregacion(producto_elegido_frescos, cantidad_producto_elegido))) {
                            agregar_carrito(producto_elegido_bebidas, cantidad_producto_elegido)
                            mostrar_carrito()
                    }
                    break
                } else {
                    alert("Por favor, ingresa un numero positivo.")
                }
                }while (true)
    
                break;
                }   
            case 4:
                if (carrito.length === 0) { 
                    alert("NO COMPRASTE NADA, GRACIAS VUELVA PRONTO");
                    break;
                } else { 
                    terminarCompra = confirm("Deseas terminar la compra?");
                    if (terminarCompra){
                        console.log(facturar());
                        alert(facturar());
                        carrito = []
                        break;
                    }else{
                        break;
                    }

                }
            default:
                alert("No ingresaste una opción válida");
        }
    }
}

main()