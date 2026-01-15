// Datos de productos (ejemplo)
let productos = [
  {nombre:"Vape AMR 1", precio:350, descripcion:"Descripcion 1", imagenes:["assets/productos/p1.jpg"], stock:5},
  {nombre:"Vape AMR 2", precio:450, descripcion:"Descripcion 2", imagenes:["assets/productos/p2.jpg"], stock:3},
  {nombre:"Vape AMR 3", precio:500, descripcion:"Descripcion 3", imagenes:["assets/productos/p3.jpg"], stock:0}
];

window.addEventListener("load", ()=>{
  mostrarProductos();
  const cliente = localStorage.getItem("cliente");
  if(cliente){
    const bienvenidaDiv = document.querySelector(".bienvenida h2");
    if(bienvenidaDiv) bienvenidaDiv.textContent = `Bienvenido, ${cliente}!`;
  }
});

// Login cliente
document.getElementById("loginCliente")?.addEventListener("submit", e=>{
  e.preventDefault();
  const email = document.getElementById("email").value;
  localStorage.setItem("cliente", email);
  alert("Bienvenidos a AMR-HUMO lo mejor para los mejores🫡!");
  window.location.href="tienda.html";
});

// Mostrar productos
function mostrarProductos(){
  const parentDiv = document.getElementById("parentDiv");
  parentDiv.innerHTML="";
  productos.forEach((p,index)=>{
    const div = document.createElement("div");
    div.innerHTML=`<h3>${p.nombre}</h3><img src="${p.imagenes[0]}" width="100"><p>$${p.precio}</p>
      <button ${p.stock==0?"disabled":""} onclick="comprarProducto(${index})">${p.stock==0?"Agotado":"Comprar"}</button>`;
    parentDiv.appendChild(div);
  });
}

// Modal
function abrirModal(index){
  const modal = document.getElementById("modalProducto");
  modal.style.display="block";
  document.getElementById("modalNombre").textContent=productos[index].nombre;
  document.getElementById("modalDescripcion").textContent=productos[index].descripcion;
  document.getElementById("modalPrecio").textContent="$"+productos[index].precio;
  document.getElementById("modalStock").textContent="Stock: "+productos[index].stock;
  const imgsDiv = document.getElementById("modalImagenes");
  imgsDiv.innerHTML="";
  productos[index].imagenes.forEach(img=>{
    const i = document.createElement("img"); i.src=img; i.width=80;
    imgsDiv.appendChild(i);
  });
  document.getElementById("modalComprar").onclick=()=>comprarProducto(index);
}
function cerrarModal(){document.getElementById("modalProducto").style.display="none";}

// Comprar producto
function comprarProducto(index){
  const p=productos[index];
  if(p.stock>0){
    p.stock--;
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
    registrarPedido(p.nombre,1,p.precio);
    abrirWhatsApp(p.nombre,p.precio);
  }
}

// Registrar pedido
function registrarPedido(nombreProducto,cantidad,precioUnitario){
  let pedidos = JSON.parse(localStorage.getItem("pedidos"))||[];
  const total = cantidad*precioUnitario;
  const cliente = localStorage.getItem("cliente")||"Cliente";
  pedidos.push({cliente,producto:nombreProducto,cantidad,total});
  localStorage.setItem("pedidos",JSON.stringify(pedidos));
}

// WhatsApp
function abrirWhatsApp(nombre,precio){
  const mensaje=`Hola!, AMR-HUMO quiero comprar: ${nombre} - $${precio}`;
  window.open(`https://wa.me/524141402904?text=${encodeURIComponent(mensaje)}`,"_blank");
}

// Contacto WhatsApp
function contactoWhatsApp(){
  window.open(`https://wa.me/524141402904?text=${encodeURIComponent("Hola, quiero contactarme con la tienda AMR-HUMO")}`,"_blank");
}