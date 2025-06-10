import mongoose from 'mongoose';
import Producto from '../models/Producto.js';

// Conexión a tu base de datos Atlas
mongoose.connect('mongodb+srv://feliprod:c1052414370@cluster0.fldoxuu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const productos = [
  {
    nombre: 'Florero Decorativo',
    precio: 35000,
    descripcion: 'Florero de cerámica pintado a mano.',
    imagen: 'https://carulla.vteximg.com.br/arquivos/ids/20294497/FLORERO-DECORATIVO-1597842_a.jpg?v=638817924153330000'
  },
  {
    nombre: 'Centro de Mesa',
    precio: 45000,
    descripcion: 'Centro de mesa elegante para cualquier ocasión.',
    imagen: 'https://www.gruposancristobal.es/wp-content/uploads/2017/03/Centro-de-mesa-tronco-madera2.jpg'
  },
  {
    nombre: 'Adorno Navideño',
    precio: 25000,
    descripcion: 'Adorno navideño para decorar tu hogar.',
    imagen: 'https://st.depositphotos.com/2313517/3701/i/450/depositphotos_37012739-stock-photo-red-christmas-bulbs-and-star.jpg'
  },
  {
    nombre: 'Cuadro Floral',
    precio: 40000,
    descripcion: 'Cuadro decorativo con motivos florales.',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_746304-MCO43755419954_102020-O.webp'
  },
  {
    nombre: 'Maceta Artesanal',
    precio: 30000,
    descripcion: 'Maceta hecha a mano ideal para plantas pequeñas.',
    imagen: 'https://i.pinimg.com/originals/90/9c/31/909c31a93053a72762eec728fe8a9f96.jpg'
  },
  {
    nombre: 'Ramo de Rosas',
    precio: 28000,
    descripcion: 'Ramo artificial de rosas rojas.',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrD77p6KSXhr3ewL2gAFkB4ByE24rzkRMBEg&s'
  },
  {
    nombre: 'Guirnalda',
    precio: 22000,
    descripcion: 'Guirnalda decorativa para puertas o paredes.',
    imagen: 'https://m.media-amazon.com/images/I/71s50GUaYAL.jpg'
  },
  {
    nombre: 'Candelabro Decorativo',
    precio: 37000,
    descripcion: 'Candelabro de metal para velas.',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_996249-MCO74746367375_022024-O.webp'
  },
  {
    nombre: 'Esfera Navideña',
    precio: 15000,
    descripcion: 'Esfera navideña para árbol de Navidad.',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZz4dYB0Qaz4hFe3bPr9ey7tL2k9b-gYMXEw&s'
  },
  {
    nombre: 'Jarrón Moderno',
    precio: 32000,
    descripcion: 'Jarrón de diseño moderno para flores.',
    imagen: 'https://i.ebayimg.com/thumbs/images/g/x4kAAOSwIi1ngulO/s-l1200.jpg'
  },
  {
    nombre: 'Set de Velas',
    precio: 18000,
    descripcion: 'Set de velas aromáticas decorativas.',
    imagen: 'https://mi-tienda-en-linea.s3.amazonaws.com/products/nova-filepond-HHAiE5.jpg'
  },
  {
    nombre: 'Cesta de Flores',
    precio: 26000,
    descripcion: 'Cesta decorativa con flores artificiales.',
    imagen: 'https://www.floristeriasbogota.net/images/thumbnails/650/650/detailed/1/721876568.webp'
  },
  {
    nombre: 'Topiario',
    precio: 34000,
    descripcion: 'Topiario artificial para interiores.',
    imagen: 'https://www.verdissimo.com/wp-content/uploads/2019/10/decoracion-con-topiarios-y-preservado-img4-verdissimo.jpg'
  },
  {
    nombre: 'Corona Floral',
    precio: 29000,
    descripcion: 'Corona floral para puertas o paredes.',
    imagen: 'https://m.media-amazon.com/images/I/81x05yO5ZsL._AC_UF894,1000_QL80_.jpg'
  },
  {
    nombre: 'Bonsái Artificial',
    precio: 50000,
    descripcion: 'Bonsái artificial de alta calidad.',
    imagen: 'https://images-cdn.ubuy.co.in/67d6db27ed05c05f7e5418a9-ponnyc-large-artificial-bonsai-tree.jpg'
  }
];

async function poblarProductos() {
  try {
    await Producto.deleteMany(); // Opcional: limpia la colección antes de poblar
    await Producto.insertMany(productos);
    console.log('Productos creados correctamente');
  } catch (err) {
    console.error('Error al crear productos:', err);
  } finally {
    mongoose.disconnect();
  }
}

poblarProductos();