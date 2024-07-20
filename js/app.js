/* --------------------------- CÓDIGO DEL TEXTAREA ------------------------------*/
const textarea = document.getElementById("texto-entrada");
const placeHolder = "Ingrese el texto aquí";

textarea.value = "Ingrese el texto aquí";

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
