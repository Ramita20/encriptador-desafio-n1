/*-----------------  CODIGO PRINCIPAL ----------------------------------------------*/

// Para controlar que solo se ejecute el formateo la primera vez.
let formatearRightSideEjecutada = false;

// Reacomoda la ventana donde se mostrará el texto resultante.
function formatearRightSide() {
  document.getElementById("subtitulo-resultado").style.display = "none";
  document.getElementById("texto-resultado").style.textAlign = "start";

  const boton_copiar = document.createElement("button");
  boton_copiar.textContent = 'Copiar';
  boton_copiar.classList.add("boton-style");
  boton_copiar.id = 'boton-copiar';

  document.getElementById("right-side").appendChild(boton_copiar);
}

function mostrarResultado() {
  formatearRightSide();

  let texto_entrada = document.getElementById("texto-entrada").value;

  document.getElementById("texto-resultado").innerText = texto_entrada;
}

function encriptarTexto() {
  const textarea = document.getElementById("texto-entrada");
  let texto_entrada = textarea.value;
  textarea.value = "Ingrese el texto aquí";

  const reemplazos = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
  }
  let palabra = '';
  let resultado = '';

  if(/[a-z]/.test(texto_entrada)){
    for(const caract of texto_entrada){
      palabra = reemplazos[caract] || caract;
      resultado += palabra;
    }

    document.getElementById("texto-resultado").innerText = resultado;
  } else {
    return;
  }
}

document.getElementById("boton-encriptar").addEventListener("click", () => {
  if(!formatearRightSideEjecutada) {
    formatearRightSide();
    formatearRightSideEjecutada = true;
  }
  encriptarTexto();
});

/*document.getElementById('boton-desencriptar').addEventListener('click', () => {});

document.getElementById('boton-copiar').addEventListener('click', () => {});*/

/* --------------------------- CÓDIGO PROPIO DEL TEXTAREA ------------------------------*/
const textarea = document.getElementById("texto-entrada");
const placeHolder = "Ingrese el texto aquí";

textarea.value = placeHolder;

// Redimenciona verticalmente el textarea a medida que se escribe en él.
textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
});

// Elimina el placeholder del campo si se selecciona para escribir.
textarea.addEventListener("focus", () => {
  if (textarea.value === placeHolder) {
    textarea.value = "";
  }
});

// Reescribe el placeholder en el campo, si el mismo esta vacío.
textarea.addEventListener("blur", () => {
  if (textarea.value.trim() === "") {
    textarea.value = placeHolder;
  }
});
