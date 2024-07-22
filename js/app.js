/*-----------------  CODIGO PRINCIPAL ----------------------------------------------*/

// Para controlar que solo se ejecute el formateo la primera vez.
let formatearRightSideEjecutada = false;

// Reacomoda la ventana donde se mostrará el texto resultante solo una vez.
function formateadoRightSide() {
  if (!formatearRightSideEjecutada) {
    document.getElementById("subtitulo-resultado").style.display = "none";
    document.getElementById("texto-resultado").style.textAlign = "start";

    const boton_copiar = document.createElement("button");
    boton_copiar.textContent = "Copiar";
    boton_copiar.classList.add("boton-style");
    boton_copiar.id = "boton-copiar";

    boton_copiar.addEventListener("click", () => {
      copiarTextoPortapapeles();
    });

    document.getElementById("right-side").appendChild(boton_copiar);

    formatearRightSideEjecutada = true;
  }
}

// Muestra el texto pasado por parametros en el parrafo del RightSide.
function mostrarResultado(texto) {
  formateadoRightSide();

  document.getElementById("texto-resultado").innerText = texto;
}

// Muestra una alerta flotante en el centro indicando un
// mensaje en el tiempo pasado por parametros.
function mostrarAlertaFlotante(mensaje, duracion) {
  const alerta = document.createElement("div");
  alerta.textContent = mensaje;
  alerta.classList.add("alerta-flotante");
  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.style.opacity = 1;
  }, 10);

  setTimeout(() => {
    alerta.style.opacity = 0;
    setTimeout(() => {
      document.body.removeChild(alerta);
    }, 500);
  }, duracion);
}

function traerTextoEntrada() {
  const textarea = document.getElementById("texto-entrada");
  let texto_entrada = textarea.value;
  if (texto_entrada === "Ingrese el texto aquí" || texto_entrada === "") {
    mostrarAlertaFlotante("Debe rellenar el campo con algún mensaje.", 2500);
    return "";
  }
  textarea.value = "Ingrese el texto aquí";
  return texto_entrada;
}

// Encripta el texto ingresado en el textarea.
function encriptarTexto() {
  let texto_entrada = traerTextoEntrada();
  if (texto_entrada === "") {
    return;
  }

  const reemplazos = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };
  let palabra = "";
  let resultado = "";

  for (const caract of texto_entrada) {
    if ((caract >= "a" && caract <= "z") || caract === " ") {
      palabra = reemplazos[caract] || caract;
      resultado += palabra;
    } else {
      mostrarAlertaFlotante(
        "No se aceptan letras mayúsculas o caracteres especiales.",
        2500
      );
      return;
    }
  }
  mostrarResultado(resultado);
}

// Desencripta el texto ingresado en el textarea.
function desencriptarTexto() {
  let texto_entrada = traerTextoEntrada();
  if (texto_entrada === "") {
    return;
  }
  let resultado = "";

  for (const caract of texto_entrada) {
    if ((caract >= "a" && caract <= "z") || caract === " ") {
      continue;
    } else {
      mostrarAlertaFlotante(
        "No se aceptan letras mayúsculas o caracteres especiales.",
        2500
      );
      return;
    }
  }

  resultado = texto_entrada.replace(/ai/g, "a");
  resultado = resultado.replace(/enter/g, "e");
  resultado = resultado.replace(/imes/g, "i");
  resultado = resultado.replace(/ober/g, "o");
  resultado = resultado.replace(/ufat/g, "u");

  mostrarResultado(resultado);
}

function copiarTextoPortapapeles() {
  const texto = document.getElementById("texto-resultado").textContent;
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      mostrarAlertaFlotante("Copiado", 1500);
    })
    .catch((error) => {
      console.error("Error al copiar el texto: ", error);
    });
}

document.getElementById("boton-encriptar").addEventListener("click", () => {
  encriptarTexto();
});

document.getElementById("boton-desencriptar").addEventListener("click", () => {
  desencriptarTexto();
});

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
