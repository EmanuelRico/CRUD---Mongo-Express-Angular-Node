import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  public imagen: any = "../../../assets/noimage.jpg";
  public archivo: any;
  public nameimg!: string;
  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _productoService: ProductoService,
              private aRouter: ActivatedRoute) { 
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: [''],
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
      imagen: this.imagen,
    }

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


    OnFileChange(event: any): any {
      if(event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        this.archivo = event.target.files[0];
        if(file.type.includes("image")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          
          reader.onload = function load(this: any) {
          this.editableimagen = reader.result;
          this.imagen = reader.result;
          console.log(this.imagen);
          }.bind(this);
        }else {
          console.log('Hubo un error')
        }
      }
  
    }


  esEditar() {
    if(this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.imagen = null;
        const fileimage = this.tofile();
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          cantidad: data.cantidad,
          precio: data.precio,
          imagen: fileimage,
        })
        this.imagen = data.imagen;
        
      })
    }
  }

  tofile() {
    var a = document.createElement('a');
    return a;
  }

}
