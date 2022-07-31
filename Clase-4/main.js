//Crear clase contenedor(nombre arvhivo)

//metodos
//save(objeto): number return id asignado 
//getByid(number): - object recibe id returna objeto o null
//getall():-object[] devuelve array de los objetos presentes en el archivo
//deletebyid(number):- void elimina el objeto con el id dado
//deleteall(): void - elimina todos los objetos del archivo

const fs = require('fs')

class Contenedor {

    constructor(nombreArchivo) {
        this.ruta = nombreArchivo;
    }

    async save(object) {
        const productsArray = await this.getAll();
        const objectToAdd = object;
        let newId;
        if (productsArray.length === 0) {
            newId = 1
        } else {
            newId = productsArray[productsArray.length - 1].id + 1;
        }
        objectToAdd['id'] = newId;
        productsArray.push(objectToAdd) 
        
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(productsArray))
            return object.id
        } catch (err) {
            throw new Error('No se pudo guardar')
        }
    }

    async getById(id) {
        const productsArray = await this.getAll()
        if (productsArray.find(object => object.id === id)) {
            return productsArray.find(object => object.id === id)
        } else {
            return null
        }
    }

    async getAll() {
        try {
            const content = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(content)
        } catch (err) {

            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
            const content = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(content)
        }
    }

    async deleteById(id) {
        const productsArray = await this.getAll()
        if (productsArray.findIndex(object => object.id === id) != -1) {
            productsArray.splice(productsArray.findIndex(object => object.id === id), 1)
        }
        await fs.promises.writeFile(this.ruta, JSON.stringify(productsArray))
    }

    async deleteAll() {
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
    }
}


module.exports = Contenedor