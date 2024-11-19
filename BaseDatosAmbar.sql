CREATE DATABASE tienda_accesorios;
USE tienda_accesorios;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    descuento INT DEFAULT 0
);

INSERT INTO productos (nombre, categoria, precio, descripcion, imagen_url, descuento)
VALUES
    ('Earcuff ', 'Aretes', 15.000, 'Elegantes y livianos', 'https://i.pinimg.com/736x/12/e7/21/12e7219aeacf8467da5df68bd6ea0353.jpg', 10),
    ('Candongas Mini', 'Aretes', 18.000, 'Pequeñas y modernas', 'https://i.pinimg.com/736x/b2/49/45/b2494516cafcf73b435c8a1c2ba3f6f5.jpg', 15),
    ('Collar Perlas', 'Collares', 50.00, 'Clásico y sofisticado', 'https://i.pinimg.com/736x/48/d9/96/48d996ce89970afbbc9508e8e3aa6f31.jpg', 10);

INSERT INTO productos (nombre, categoria, precio, descripcion, imagen_url, descuento)
VALUES
	('Anillos Rodio ', 'Anillos', 22000, 'Elegantes y livianos', 'Images/AnilloSurtidosRodio.jpg', );
    
INSERT INTO productos (nombre, categoria, precio, descripcion, imagen_url, descuento)
VALUES
	('Gargantilla ', 'Collares', 30000, 'Elegantes y livianos', 'Images/Gargantilaa.jpg', 5),
    ('Pulseras Surtidas' , 'Pulseras', 20000 , 'Pulseras para toda ocasion', 'Images/PulserasRodio.jpg', 2),
    ('Conjunto Rodio' , 'Conjunto' , 35000, 'Conjunto de Cadena, Pulsera y Anillo en Rodio', 'Images/ConjuntoRodio.jpg', 3),
    ('Candongas Rodio' , 'Aretes', 18000, 'Candongas Grandes en Rodio', 'Images/AretesOro.jpg',2),
    ('Collar Rodio', 'Collares', 20000, 'Collar con Dije de Corazon Dorado', 'Images/CollarRodio.jpg', 5);
    


SELECT id, nombre, imagen_url FROM productos;

UPDATE productos 
SET precio = 18000
WHERE id = 2;

ALTER TABLE productos	
MODIFY precio INT;

