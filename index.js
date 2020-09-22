const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let datos = null;
let asc = true;
let temp = -1;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    datos = data;
    process(datos);
  });

let process = (data) => {
  let str = "";
  let i = 0;
  data.map((item) => {
    str += `<div class="card">
            
    </div>`;
    i++;
  });
  document.getElementById("rows").innerHTML = str;
};

