const Contenedor = require('./main.js')

const db = new Contenedor('productos.txt')


const test = async () => {
    console.log(await db.save({ title: 'primero', price: 15, thumbnail: 'www.google.com' }));
    console.log(await db.save({ title: 'segundo', price: 16, thumbnail: 'www.google.com' }));
    console.log(await db.save({ title: 'tercero', price: 17, thumbnail: 'www.google.com' }));
    console.log(await db.save({ title: 'cuarto', price: 18, thumbnail: 'www.google.com' }));
    console.log(await db.getAll());

    console.log(await db.getById(2));
    console.log(await db.getById(5));

    console.log(await db.deleteById(2));
    console.log(await db.getById(2));

    console.log(await db.deleteById(10));
    console.log(await db.getAll());

    // console.log(await db.deleteAll());

}
test()