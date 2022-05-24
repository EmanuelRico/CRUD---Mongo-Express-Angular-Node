import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ImageService } from 'src/app/services/image.service';
import * as internal from 'stream';
import { DomSanitizer } from '@angular/platform-browser';
import { format } from 'path';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  public imageForm: FormGroup;
  public image: any = "../../../assets/noimage.jpg";
  public archivo: any;
  public nameimg: string;
  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;


  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _productoService: ProductoService,
              private _imageService: ImageService,
              private aRouter: ActivatedRoute,
              private sanitizer: DomSanitizer) { 
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      img: ['', Validators.required],
    })
    this.imageForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      archivo: new FormControl(null, Validators.required)
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto() {
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      cantidad: this.productoForm.get('cantidad')?.value,
      precio: this.productoForm.get('precio')?.value,
      img: this.nameimg,
    }

    const form = this.archivo;
    console.log(form, 'este es el form')
      this._imageService.guardarImagen(PRODUCTO.img, this.archivo).subscribe(data => {
        this.image = "../../../assets/noimage.jpg";
        this.toastr.info('El producto fue actualizado con exito!', 'Producto Actualizado!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    
    if(this.id !== null){
      //editamos producto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info('El producto fue actualizado con exito!', 'Producto Actualizado!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }
    else{
      //agregamos producto
      console.log(PRODUCTO);
      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }


    

  
  }

  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          cantidad: data.cantidad,
          precio: data.precio,
          img: data.img,
        })
      })
    }
  }

  OnFileChange(event): any {
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.archivo = event.target.files[0];
      this.nameimg = file.name;
      if(file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = function load(this: any) {
        this.image = reader.result;
        }.bind(this);
      }else {
        console.log('Hubo un error')
      }
    }

  }


}
