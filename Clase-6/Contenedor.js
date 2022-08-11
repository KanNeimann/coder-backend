const fs = require('fs')

class Contenedor {

    constructor(nombreArchivo) {
        this.ruta = nombreArchivo;
    }

    async save(object) {
        const objectsArray = await this.getAll();
        const objectToAdd = object;
        let newId;
        if (objectsArray.length === 0) {
            newId = 1
        } else {
            newId = objectsArray[objectsArray.length - 1].id + 1;
        }
        objectToAdd['id'] = newId;
        objectsArray.push(object)
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(objectsArray))
            return object.id
        } catch (err) {
            throw new Error('No se pudo guardar')
        }
    }

    async getById(id) {
        const objectsArray = await this.getAll()
        const element = objectsArray.find(object => object.id === id)
        if (element) {
            return objectsArray.find(object => object.id === id)
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
            console.log(err)
            return JSON.parse(content)
        }
    }

    async deleteById(id) {
        const objectsArray = await this.getAll()
        const element = objectsArray.find(object => object.id === id)
        if (element) {
            objectsArray.splice(objectsArray.findIndex(object => object.id === id), 1)
        }
        await fs.promises.writeFile(this.ruta, JSON.stringify(objectsArray))
    }

    async deleteAll() {
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
    }
}


module.exports = Contenedor