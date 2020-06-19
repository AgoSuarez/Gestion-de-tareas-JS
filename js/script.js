window.addEventListener("load", iniciar);

//Obtenemos los datos del localStorage si existen
let tareas = [];
if (localStorage.getItem("tareas")) {
  tareas = JSON.parse(localStorage.getItem("tareas"));
}

function iniciar() {
  //Rellenamos las tablas
  RellenarTabla();
  const todo = document.getElementById("todo-body");
  const Ok = document.getElementById("ok-body");
  const check = document.getElementById("hecho");

  check.addEventListener("change", () => {
    const tareaInput = document.getElementById("tarea");
    if (check.checked) {
      tareaInput.setAttribute("disabled", true);
    } else {
      tareaInput.removeAttribute("disabled");
    }
  });

  todo.addEventListener("click", (e) => {
    //Obtenemos el id el elemento seleccionado de la tabla
    let id = parseInt(e.target.parentNode.querySelector("td").innerHTML);
    muestraTarea(id - 1);
  });

  Ok.addEventListener("click", (e) => {
    let id = parseInt(e.target.parentNode.querySelector("td").innerHTML);
    muestraTarea(id - 1);
  });

  const btn = document.getElementById("btnGuardar");
  btn.addEventListener("click", guardarElemento);
}

function RellenarTabla() {
  //Rellenamos las dos tablas con los elemento del array
  const todo = document.getElementById("todo-body");
  const Ok = document.getElementById("ok-body");
  let cuerpoTodo = "";
  let cuerpoOk = "";
  for (let i = 0; i < tareas.length; i++) {
    datos = tareas[i];
    // console.log(datos);
    if (datos.hecho) {
      cuerpoOk +=
        "<tr><td>" + datos.id + "</td><td>" + datos.tarea + "</td><tr>";
    } else {
      cuerpoTodo +=
        "<tr><td>" + datos.id + "</td><td>" + datos.tarea + "</td><tr>";
    }
  }
  todo.innerHTML = cuerpoTodo;
  Ok.innerHTML = cuerpoOk;
}

function muestraTarea(id) {
  const tareaInput = document.getElementById("tarea");
  if (tareas[id].hecho) {
    tareaInput.setAttribute("disabled", true);
  } else {
    tareaInput.removeAttribute("disabled");
  }
  document.getElementById("tarea").value = tareas[id].tarea;
  document.getElementById("index").value = tareas[id].id;
  document.getElementById("hecho").checked = tareas[id].hecho;
}

function guardarElemento() {
  let indice = document.getElementById("index").value;
  let tareaTxt = document.getElementById("tarea").value;
  let checkedTxt = document.getElementById("hecho").checked;
  if (tareaTxt != "") {
    if (indice != "") {
      swal({
        title: "Actualizar la tarea",
        text: "¿Desea guardar los datos modificados?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willUpdate) => {
        if (willUpdate) {
          indice = parseInt(indice - 1);
          tareas[indice].tarea = tareaTxt;
          tareas[indice].hecho = checkedTxt;
          localStorage.setItem("tareas", JSON.stringify(tareas));
          RellenarTabla();
          swal("La tarea ha sido actualizada", {
            icon: "success",
          });
          LimpiarFormulario();
        }
      });
    } else {
      let tarea = {};
      indice = tareas.length + 1;
      tarea["id"] = indice;
      tarea["tarea"] = document.getElementById("tarea").value;
      tarea["hecho"] = document.getElementById("hecho").checked;
      // console.log(tarea);
      tareas.push(tarea);
      swal({
        title: "Tarea creada con exito",
        text: tareaTxt + " fue creada correctamente",
        icon: "success",
      });
    }
    localStorage.setItem("tareas", JSON.stringify(tareas));
    LimpiarFormulario();
    RellenarTabla();
  } else {
    swal("Debe introducir una tarea");
  }
}

function LimpiarFormulario() {
  document.getElementById("tarea").value = "";
  tareaInput.removeAttribute("disabled");
  document.getElementById("index").value = "";
  document.getElementById("hecho").checked = false;
}
