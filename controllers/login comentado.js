// URL de la API para login
const API = 'http://localhost:3000/api/login';

// Función asíncrona que se ejecuta al enviar el formulario de login
async function login(e) {
// Evita que el formulario se envíe y recargue la página
    e.preventDefault();

  // Obtiene el valor del campo de usuario (input con id="username")
    const username = document.getElementById('username').value;

 // Obtiene el valor del campo de contraseña (input con id="password")
    const password = document.getElementById('password').value;
// Selecciona el elemento que muestra el mensaje de error (div con id="errorMsg")
    const errorMsg = document.getElementById('errorMsg');

    try {
// Realiza una petición POST a la API de login con los datos ingresados
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Tipo de contenido enviado
            body: JSON.stringify({ username, password })  // Cuerpo de la solicitud convertido a JSON
        });

// Si la respuesta no es exitosa (por ejemplo, 401), lanza un error
        if (!res.ok) throw new Error('Credenciales incorrectas');

// Convierte la respuesta en formato JSON
        const data = await res.json();
   
// Guarda el token recibido en el almacenamiento local del navegador
        localStorage.setItem('token', data.token);

 // Guarda el nombre de usuario también en localStorage
        localStorage.setItem('username', data.username);

 // Redirige al usuario autenticado a la página del menú principal
        location.href = 'menu.html';
    } catch (error) {
 // Si ocurre un error, muestra el mensaje de error en pantalla
        errorMsg.style.display = 'block';
    }
}