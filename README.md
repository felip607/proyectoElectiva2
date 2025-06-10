# Proyecto Electiva 2 - Tienda de Ornamentaciones HyH

Este proyecto es una aplicación web de comercio electrónico para la venta de productos decorativos, desarrollada con Node.js, Express, MongoDB, EJS y PDFKit.

## Características

- **Registro e inicio de sesión de usuarios** con contraseñas seguras (bcrypt).
- **Catálogo de productos** con imágenes reales, descripciones y precios.
- **Carrito de compras**: agrega, elimina y visualiza productos antes de comprar.
- **Generación de factura en PDF** con el resumen de la compra.
- **Gestión de sesión**: cierre de sesión seguro.
- **Poblado automático de productos** mediante script.
- **Interfaz responsiva** y amigable.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas y Mongoose
- EJS (vistas)
- PDFKit (facturas)
- bcrypt (hash de contraseñas)
- dotenv (variables de entorno)
- express-session (sesiones)
- Bootstrap/CSS personalizado

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tuusuario/proyectoElectiva2.git
   cd proyectoElectiva2
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Inicia la aplicación:
   ```
   npm start
   ```

4. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## Estructura del proyecto

```
proyectoElectiva2/
│
├── controllers/         # Lógica de negocio (usuarios, productos, carrito, factura)
├── models/              # Modelos de Mongoose (Usuario, Producto)
├── routes/              # Rutas de Express
├── views/               # Vistas EJS (login, registro, productos, carrito)
├── data/                # Scripts para poblar la base de datos
├── public/              # Archivos estáticos (CSS, imágenes)
├── app.js               # Archivo principal de la aplicación
├── package.json
└── README.md
```

## Scripts útiles

- `npm start` - Inicia el servidor.
- `node data/crearProductos.js` - Pobla la base de datos con productos de ejemplo.

## Créditos de imágenes

Las imágenes de productos provienen de fuentes varias de internet, esta aplicacion es de prueba y se debe validar los derechos de autor de las imagenes para un uso comercial
## Autor

- luis rodriguez

---
