import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];
  listImg;
  constructor(private _productoService: ProductoService,
        private _imageService: ImageService,
        private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerImagenes();
  }
  obtenerImagenes() {
    this,this._imageService.getImagenes().subscribe(img => {
      console.log(img);
      this.listImg = img;
    }, error => {
      console.log(error);
    })
  }


  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
      console.log(data.img)
    }, error => {
      console.log(error);
    })
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado con exito' ,'Producto Eliminado');
      this.obtenerProductos();
    }, error => {
      console.log(error);
    })
  }
}
