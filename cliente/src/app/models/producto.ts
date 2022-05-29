export class Producto {
    _id?: number;
    nombre: string;
    categoria: string;
    cantidad: string;
    precio: number;
    imagen: string;

    constructor(nombre: string, categoria: string, cantidad: string, precio: number, imagen: string ){
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.precio = precio;
        this.imagen = imagen;
    }
}