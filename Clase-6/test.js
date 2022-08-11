const Contenedor = require('./Contenedor.js')
const express = require('express')

const app = express()

const db = new Contenedor('productos.txt')

const server = app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

const getProductoRnd = async () => {
    const allProducts = await db.getAll()
    return allProducts[parseInt(Math.random() * allProducts.length)]
}

app.get('/', async (req, res) => {
    res.send(`Hola Mundo!  
    Proba con: 
      /productos
      /productoRandom
    Para ver las funcionalidades`)
})
app.get('/productos', async (req, res) => {
    res.send(await db.getAll())
})
app.get('/productoRandom', async (req, res) => {
    res.send(await getProductoRnd())
})

server.on('error', (error) => {
    console.log('hubo un error...')
    console.log(error)
})

const crearItems = async () => {
    console.log(await db.save({ title: 'primero', price: 15, thumbnail: 'www.google.com' }));
    console.log(await db.save({ title: 'segundo', price: 16, thumbnail: 'www.google.com' }));
    console.log(await db.save({ title: 'tercero', price: 17, thumbnail: 'www.google.com' }));
}
// crearItems()


