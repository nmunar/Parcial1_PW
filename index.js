const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let datos = null;
let pedido = new Map();
let act = false;
let op = 1;
let cantProd = 0;
let infotemp = new Map();
let arrayDef = [];
let noItem = 0;
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    datos = data;
  });

let process = (data) => {
  let str = "";
  let i = 0;
  data.map((item) => {
    infotemp.set(i, item);
    str += `<div class="col">
                <div class="card" style="width: 15rem;">
                    <img src="${item.image}" class="card-img-top" alt="img">
                    <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text">$ ${item.price}</p>
                    <button type="button" class="btn btn-dark" onclick="add_car(${i})">Add to car</button>
                    </div>
                </div>
            </div>`;
    i++;
  });
  document.getElementById("contenido").innerHTML = str;
  if (act == true && op == 0) {
    act = false;
    document.getElementById("item").innerHTML = "";
    document.getElementById("qty").innerHTML = "";
    document.getElementById("description").innerHTML = "";
    document.getElementById("unitplace").innerHTML = "";
    document.getElementById("amount").innerHTML = "";
    document.getElementById("form1").innerHTML = "";
    document.getElementById("titulo").innerHTML = "";
    op = 1;
  }
  act = true;
};

let add_car = (item) => {
  let text = document.getElementById("cantProd").innerHTML;
  cantProd = parseInt(text.split(" ")[0]);
  cantProd += 1;
  document.getElementById("cantProd").innerHTML = cantProd + " items";
  let iformacionPedido = infotemp.get(item);
  if (pedido.get(iformacionPedido.name) == null) {
    noItem += 1;
    pedido.set(
      iformacionPedido.name,
      noItem +
        " " +
        iformacionPedido.price +
        " " +
        iformacionPedido.price +
        " " +
        cantProd
    );
  } else {
    // cantProd -= 1;
    let info = pedido.get(iformacionPedido.name).split(" ");
    let cant = parseInt(info[3]);
    let price = parseFloat(info[1]);
    let acum = parseFloat(info[2]);
    let itemNo = parseInt(info[0]);
    cant += 1;
    acum += price;

    pedido.set(
      iformacionPedido.name,
      itemNo + " " + price + " " + acum + " " + cant
    );
  }
  console.log(pedido);

  // infotemp = null;
};

let processPedidos = (data) => {
  for (var [key, value] of data) {
    let info = value.split(" ");
    let cant = parseInt(info[3]);
    let price = parseFloat(info[1]);
    let acum = parseFloat(info[2]);
    let itemNo = parseInt(info[0]);

    arrayDef.push({
      name: itemNo,
      value: cant + "/" + key + "/" + price + "/" + acum,
    });
  }
  var sorted = arrayDef.sort(function (a, b) {
    return a.name < b.name ? 1 : b.name > a.name ? -1 : 0;
  });

  console.log(sorted);

  let str = "";
  for (let i = 0; i < sorted.length; i++) {
    let info = sorted[i].value.split("/");
    let cant = parseInt(info[0]);
    let desc = info[1];
    let price = parseFloat(info[2]);
    let acum = parseFloat(info[3]);
    str += `<tr>
    <td>${sorted[i].name}</td>
    <td>${cant}</td>
    <td>${desc}</td>
    <td>${price}</td>
    <td>${acum}</td>
    </tr>`;
  }
  document.getElementById("contenidoTabla").innerHTML = str;
};

document.getElementById("b").addEventListener("click", () => {
  process(datos[0].products);
  document.getElementById("titulo").innerHTML = datos[0].name;
});
document.getElementById("t").addEventListener("click", () => {
  process(datos[1].products);
  document.getElementById("titulo").innerHTML = datos[1].name;
});
document.getElementById("s").addEventListener("click", () => {
  process(datos[2].products);
  document.getElementById("titulo").innerHTML = datos[2].name;
});
document.getElementById("d").addEventListener("click", () => {
  process(datos[3].products);
  document.getElementById("titulo").innerHTML = datos[3].name;
});
document.getElementById("dys").addEventListener("click", () => {
  process(datos[4].products);
  document.getElementById("titulo").innerHTML = datos[4].name;
});
document.getElementById("carritoC").addEventListener("click", () => {
  op = 0;
  if (act == true) {
    document.getElementById("contenido").innerHTML = "";
    document.getElementById("titulo").innerHTML = "";
  }
  document.getElementById("item").innerHTML = "Item";
  document.getElementById("qty").innerHTML = "Qty.";
  document.getElementById("description").innerHTML = "Description";
  document.getElementById("unitplace").innerHTML = "Unit Price";
  document.getElementById("amount").innerHTML = "Amount";
  document.getElementById("form1").innerHTML = `<h1>Total:</h1>
    <div class="row-cols" id="form2">
      <div class="col"><button type="button" class="btn btn-danger">Cancel</button></div>
      <div class="col"></div><button type="button" class="btn btn-warning">Confirm Order</button></div>
    </div>
  </div>`;
  document.getElementById("titulo").innerHTML = "Oreder detail";
  processPedidos(pedido);
});
