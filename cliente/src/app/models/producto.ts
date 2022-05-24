export class Producto {
    _id?: number;
    nombre: string;
    categoria: string;
    cantidad: string;
    precio: number;
    img: string;
    

    constructor(nombre: string, categoria: string, cantidad: string, precio: number, img: string ){
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.precio = precio;
        this.img = img;
    }
}