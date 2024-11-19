document.querySelector('.filter-btn').addEventListener('click', () => {
    const categoria = document.getElementById('categoryFilter').value;
    const precioRange = document.getElementById('priceFilter').value;

    // Realizar la solicitud al backend
    fetch(`http://localhost:3000/api/productos?categoria=${categoria}&precioRange=${precioRange}`)
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
        })
        .catch(err => console.error('Error al obtener los productos:', err));
});

//Funcion para obtener la busqueda del usuario 
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.trim(); // Captura el término de búsqueda

    if (searchTerm) {
        // Realizar la solicitud al backend con el término de búsqueda
        fetch(`/api/buscar-productos?query=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())  // Convertir la respuesta en formato JSON
            .then(data => {
                console.log(data);  // Mostrar los datos en la consola para depuración
                displayProducts(data);  // Función para mostrar los productos en la página
            })
            .catch(error => console.error('Error:', error));  // Captura cualquier error
    } else {
        console.log('Por favor, ingrese un término de búsqueda.');
    }
}
// Función para obtener todos los productos
function cargarProductos() {
    fetch('http://localhost:3000/api/productos')
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
        })
        .catch(err => console.error('Error al cargar los productos:', err));
}

// Función para mostrar los productos en la página (ya existente)
function mostrarProductos(productos) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = ''; // Limpiar productos anteriores

    productos.forEach(producto => {
        // Formatear el precio y el descuento
        const precio = producto.precio;
        const descuento = producto.descuento;
        const precioConDescuento = precio - (precio * (descuento / 100));

        // Crear el HTML para cada producto
        const productoHTML = `
            <div class="product-card">
                <img src="${producto.imagen_url}" alt="${producto.nombre}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${producto.nombre}</h3>
                    <p class="price">
                        $${precioConDescuento.toLocaleString()} 
                        <span class="discount">$${precio.toLocaleString()}</span>
                    </p>
                    <p class="rating">★★★★☆</p>
                </div>
            </div>
        `;

        // Insertar el HTML generado en el contenedor de productos
        container.innerHTML += productoHTML;
    });
}

function applyFilters() {
    const priceRange = document.getElementById('priceFilter').value; // Obtener el valor seleccionado

    // Realizar la solicitud al backend con el rango de precio
    fetch(`/api/productos?precioRange=${priceRange}`)
        .then(response => response.json())  // Convertir la respuesta en formato JSON
        .then(data => {
            // Aquí puedes procesar los datos y mostrarlos en la página
            console.log(data);  // Para depuración, ver qué datos se recibieron
            displayProducts(data);  // Supongamos que tienes una función para mostrar productos
        })
        .catch(error => console.error('Error:', error));  // Captura errores si los hay
}
function displayProducts(products) {
    const productsContainer = document.getElementById('productsContainer'); // Un contenedor en tu HTML para mostrar los productos
    productsContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar nuevos productos

    products.forEach(product => {
        // Crear un nuevo elemento HTML para cada producto
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        
        productElement.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <div class="product-info">
                <h3>${product.nombre}</h3>
                <p class="price">$${product.precio}</p>
                <p class="rating">★★★★☆</p>
            </div>
        `;

        // Agregar el producto al contenedor
        productsContainer.appendChild(productElement);
    });
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});

// script.js

// Mostrar y ocultar el formulario de login
document.getElementById('loginBtn').addEventListener('click', () => {
    document.getElementById('loginContainer').style.display = 'flex';
});

document.getElementById('closeLogin').addEventListener('click', () => {
    document.getElementById('loginContainer').style.display = 'none';
});

// Enviar los datos de login al servidor
document.getElementById('loginFormContent').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío normal del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;

    // Validación básica de campos
    if (!username || !password || !userType) {
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('loginError').textContent = 'Por favor, complete todos los campos.';
        return;
    }

    // Realizar la solicitud de login al servidor
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, userType })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // Si hay un error (usuario no encontrado, contraseña incorrecta, etc.)
            document.getElementById('loginError').style.display = 'block';
            document.getElementById('loginError').textContent = data.error;
        } else {
            // Si el login es exitoso
            alert(data.message);  // Mostrar mensaje de éxito

            // Redirigir a la página correspondiente
            if (data.user.isAdmin) {
                window.location.href = '/admin-dashboard'; // Página administrativa
            } else {
                window.location.href = '/cliente-dashboard'; // Página cliente
            }
        }
    })
    .catch(error => {
        console.error('Error en el login:', error);
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('loginError').textContent = 'Error al realizar la solicitud.';
    });
});
// Mostrar el modal al hacer clic en el botón de login
document.getElementById('loginBtn').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'flex'; // Mostrar el modal
});

// Cerrar el modal al hacer clic en el botón de cerrar
document.getElementById('closeLoginModal').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'none'; // Cerrar el modal
    window.location.href = "/"; // Redirigir a la página principal
});

// También puedes cerrar el modal si se hace clic fuera del contenido del modal
document.getElementById('loginModal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('loginModal')) {
        document.getElementById('loginModal').style.display = 'none'; // Cerrar el modal
    }
});

document.getElementById('loginFormContent').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío normal del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;

    // Validación básica de campos
    if (!username || !password || !userType) {
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('loginError').textContent = 'Por favor, complete todos los campos.';
        return;
    }

    // Realizar la solicitud de login al servidor
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, userType })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // Si hay un error (usuario no encontrado, contraseña incorrecta, etc.)
            document.getElementById('loginError').style.display = 'block';
            document.getElementById('loginError').textContent = data.error;
        } else {
            // Si el login es exitoso
            alert(data.message);  // Mostrar mensaje de éxito

            // Si el usuario es admin, mostrar el modal de bienvenida
            if (data.user.isAdmin) {
                document.getElementById('adminWelcomeModal').style.display = 'flex'; // Mostrar el modal
                document.getElementById('loginModal').style.display = 'none'; // Ocultar el modal de login
            } else {
                // Si el usuario no es admin, redirigir a la página principal para cliente
                window.location.href = '/cliente-dashboard';
            }
        }
    })
    .catch(error => {
        console.error('Error en el login:', error);
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('loginError').textContent = 'Error al realizar la solicitud.';
    });
});

// Funciones para manejar los botones del modal
document.getElementById('btnProductos').addEventListener('click', () => {
    window.location.href = '/productos'; // Redirige a la página de productos
});

document.getElementById('btnPersonal').addEventListener('click', () => {
    window.location.href = '/personal'; // Redirige a la página de personal
});

document.getElementById('btnProveedores').addEventListener('click', () => {
    window.location.href = '/proveedores'; // Redirige a la página de proveedores
});


