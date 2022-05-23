export class Producto {
    _id?: number;
    nombre: string;
    categoria: string;
    cantidad: string;
    precio: number;

    constructor(nombre: string, categoria: string, cantidad: string, precio: number ){
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}