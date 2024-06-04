const empanadas = [
    { id: 0, sabor: 'Carne', descripcion: 'Carne picada, cebolla, morron, cebolla de verdeo.', ruta: "/img/carne.jpg" },
    { id: 1, sabor: 'Pollo con salsa blanca', descripcion: 'Pollo desmenuzado con cebolla de verdeo en salsa blanca.', ruta: "/img/pollooo.jpg" },
    { id: 2, sabor: 'Jamon y queso', descripcion: 'Jamón cocido natural y queso muzzarella.', ruta: "/img/jamonyqueso.jpg" },
    { id: 3, sabor: 'Tapa de asado', descripcion: 'Tapa de asado desmechada, cebolla, morron, vino tinto.', ruta: "/img/tapadeasado.jpg" },
    { id: 4, sabor: 'Cheeseburger', descripcion: 'Carne picada, queso cheddar, bacon salteado, cebolla, morron.', ruta: "/img/cheeseburger.jpg" },
    { id: 5, sabor: 'Verdura', descripcion: 'Acelga, cebolla, morron, salsa blanca y queso muzzarella.', ruta: "/img/verdura.jpg" },
    { id: 6, sabor: 'Brócoli', descripcion: 'Brocoli, salsa blanca, cebolla, morron.', ruta: "/img/brocoli.jpg" }
];

let mainsection=document.querySelector(".mainsection")
let container = document.querySelector("#container");
let header = document.querySelector(".header");

let header_div = document.createElement("div");
header_div.classList.add("header-div");
header.appendChild(header_div);

let header_logo = document.createElement("img");
header_logo.classList.add("logo");
header_logo.src = "/img/SABORCUYANOLOGO.jpg";
header_div.appendChild(header_logo);

let boton_empanadas = document.createElement("button");
boton_empanadas.textContent = "Empanadas";
boton_empanadas.id = "myboton_empanadas";
boton_empanadas.className = "boton_empanadas";
container.appendChild(boton_empanadas);
boton_empanadas.addEventListener("click", llamador_menu);
boton_empanadas.addEventListener("click", setear_datos_inputs_carrito);

let carrito_container = document.createElement("div");
carrito_container.classList.add("carrito_container");
header_div.appendChild(carrito_container);
carrito_container.style.cursor = "pointer";
carrito_container.addEventListener("click", setear_datos_carrito_desplegable);

let carrito_contador = document.createElement("div");
carrito_contador.classList.add("carrito_contador");
carrito_contador.innerHTML = 0;
carrito_contador.style.opacity = 0;
carrito_container.appendChild(carrito_contador);
carrito_contador.addEventListener("DOMContentLoaded", levantar_numeros_del_usuario);

let carrito_logo = document.createElement("img");
carrito_logo.src = "/img/carrito.jpg";
carrito_logo.classList.add("carrito");
carrito_container.appendChild(carrito_logo);

let carrito_desplegado_div = document.createElement("div");
carrito_desplegado_div.classList.add("carrito_desplegado_div");
container.appendChild(carrito_desplegado_div);

let lista_carrito = document.createElement("ul");
lista_carrito.classList.add("lista_carrito");
carrito_desplegado_div.appendChild(lista_carrito);


let finalizar_compra_btn = document.createElement("button");
finalizar_compra_btn.textContent = "Finalizar Compra";
finalizar_compra_btn.classList.add("finalizar_compra_btn");
carrito_desplegado_div.appendChild(finalizar_compra_btn);
finalizar_compra_btn.addEventListener("click",finalizar_compra_menu)



function plasmar_fotos(ruta, donde_append) {
    let foto = document.createElement("img");
    foto.src = ruta;
    foto.classList.add("foto-empanada");
    donde_append.appendChild(foto);
    foto.width = 90;
    foto.height = 70;
}

let menu_corriendo = false;




let total_carrito = document.createElement("div");
total_carrito.classList.add("total_carrito");
total_carrito.textContent = "Total: $0"; 
carrito_desplegado_div.insertBefore(total_carrito, finalizar_compra_btn); 


function actualizar_total_carrito() {
    let carrito = catchear_localstorage();
    let total = 0;


    let carrito_vacio = Object.keys(carrito).length === 0;

    if (!carrito_vacio) {
        for (let sabor in carrito) {
            let cantidad = carrito[sabor];
            total += cantidad * 1500;
        }
        
    }

    total_carrito.textContent = `Total: $${total}`;
}


let input_direccion = document.createElement("input");
input_direccion.type = "text";
input_direccion.placeholder = "Ingresa tu dirección";
input_direccion.classList.add("direccion_input");
carrito_desplegado_div.insertBefore(input_direccion, finalizar_compra_btn);

function finalizar_compra_menu() {
    const direccion_ingresada = input_direccion.value;
    const menu_final = catchear_localstorage()

    console.log(menu_final)
    if (Object.keys(menu_final).length !== 0 && direccion_ingresada !== ""){
        let msj_enviando_pedido = document.createElement("div");
        msj_enviando_pedido.textContent = `Perfecto, te enviaremos el pedido en aproximadamente 30 minutos a ${direccion_ingresada}. ¡Gracias!`
        msj_enviando_pedido.classList.add("mensaje_envio");
        carrito_desplegado_div.appendChild(msj_enviando_pedido);


        finalizar_compra_btn.style.display = "none";
        total_carrito.style.display = "none";
        input_direccion.style.display = "none";
        boton_empanadas.style.display="none"
        


        let inputs = document.querySelectorAll(".input_empanada");
        inputs.forEach(function(input) {
            input.value = 0;
        })
        
        let okey_div=document.createElement("img")
        okey_div.classList.add("okey_div")
        okey_div.src="/img/delivery.jpg"
        container.appendChild(okey_div)

        localStorage.removeItem("carrito");
        actualizar_interfaz_carrito();
    }
}



function desplegar_carrito() {
    if (lista_carrito.style.opacity === "1") {
        lista_carrito.style.opacity = "0";
        carrito_desplegado_div.style.opacity="0"
    } else {
        lista_carrito.style.opacity = "1";
        carrito_desplegado_div.style.opacity="1"
    }
}


function catchear_localstorage() {
    let carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : {};
}

function guardar_carrito_en_localstorage(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizar_interfaz_carrito() {
    let carrito = catchear_localstorage();
    let cantidades_empanadas = Object.values(carrito);
    let cantidadTotal = 0;
    actualizar_total_carrito();
    for (let cantidad of cantidades_empanadas) {
        cantidadTotal = cantidadTotal + cantidad;
    }
    carrito_contador.innerHTML = cantidadTotal;
    carrito_contador.style.opacity = cantidadTotal > 0 ? 1 : 0;

    lista_carrito.innerHTML = '';
    for (let sabor in carrito) {
        let cantidad = carrito[sabor];
        let item_subtotal = cantidad * 1500;
        let item_pedido = document.createElement("li");
        item_pedido.innerHTML = `${cantidad} x ${sabor} = $${item_subtotal}`;
        lista_carrito.appendChild(item_pedido);
    }
}

function levantar_numeros_del_usuario() {
    let carrito = catchear_localstorage();
    let inputs = document.querySelectorAll(".input_empanada");
    inputs.forEach(function(input) {
        let cantidad = parseInt(input.value);
        let sabor = input.id;
        if (!isNaN(cantidad)) {
            if (cantidad === 0) {
                delete carrito[sabor];
            } else {
                carrito[sabor] = cantidad;
            }
        }
    });
    guardar_carrito_en_localstorage(carrito);
    actualizar_interfaz_carrito();
}

function setear_datos_inputs_carrito() {
    let carrito = catchear_localstorage();
    for (let sabor in carrito) {
        let input = document.getElementById(sabor);
        if (input) {
            input.value = carrito[sabor];
        }
    }
    actualizar_interfaz_carrito();
}

function setear_datos_carrito_desplegable() {
    actualizar_interfaz_carrito();
    desplegar_carrito();
}

function mostrar_menu() {

        let lista_desordenada = document.createElement("div");
        lista_desordenada.classList.add("lista_desordenada");
        container.appendChild(lista_desordenada);
        let id_bloque_empanada = 0;

        empanadas.forEach(empanadaitem => {
            let bloque_empanada = document.createElement("div");
            bloque_empanada.classList.add("bloque_empanada");
            lista_desordenada.appendChild(bloque_empanada);

            let empanada_div = document.createElement("div");
            empanada_div.classList.add("empanada_div");
            bloque_empanada.appendChild(empanada_div);

            plasmar_fotos(empanadaitem.ruta, empanada_div);

            let sabor_descripcion_div = document.createElement("div");
            sabor_descripcion_div.classList.add("sabor_descripcion_div");
            empanada_div.appendChild(sabor_descripcion_div);

            let sabor_div = document.createElement("div");
            sabor_div.innerHTML = `${empanadaitem.sabor}`;
            sabor_div.classList.add("sabor_div");
            sabor_descripcion_div.appendChild(sabor_div);

            let descripcion_div = document.createElement("div");
            descripcion_div.innerHTML = `${empanadaitem.descripcion}`;
            descripcion_div.classList.add("descripcion_div");
            sabor_descripcion_div.appendChild(descripcion_div);

            let input_empanada = document.createElement("input");
            input_empanada.type = "number";
            input_empanada.classList.add("input_empanada");
            bloque_empanada.appendChild(input_empanada);
            input_empanada.min = 0;
            input_empanada.placeholder = 0;
            input_empanada.id = empanadas[id_bloque_empanada].sabor;
            id_bloque_empanada += 1;

            input_empanada.addEventListener("click", levantar_numeros_del_usuario);
        }
    );
}

function llamador_menu() {
    if (!menu_corriendo) {
        mostrar_menu();
        menu_corriendo = true;
    }
}

document.addEventListener("DOMContentLoaded", setear_datos_inputs_carrito);