
class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = libros;
      this.mascotas = mascotas;
  }
  getFullName() {
      return `${this.apellido}, ${this.nombre} `
  }
  addMascota(newMascota) {
      this.mascotas.push(newMascota);
  }
  countMascotas() {
      return this.mascotas.length;
  }
  addBook(nombre, autor) {
      this.libros.push({ nombre, autor });
  }
  getBookNames() {
      const titulos = [];
      this.libros.forEach(libro => {
          titulos.push(libro.nombre)
      })
      return titulos;
  }
}

let usuario = new Usuario('Kan', 'Neimann', [{ nombre: 'Rayuela', autor: 'Cortazar' }], ['Perro', 'Conejo']);

console.log(usuario.getFullName());
console.log(usuario.countMascotas());
usuario.addMascota('Gato');
console.log(usuario.countMascotas());
usuario.addBook('Pinocho', 'Anonimo');
console.log(usuario.getBookNames());
45920-32090-clases-kan_a_n-main.js
Mostrando 45920-32090-clases-kan_a_n-main.js.