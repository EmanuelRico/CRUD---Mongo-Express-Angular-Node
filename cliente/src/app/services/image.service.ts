import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url = 'http://localhost:4000/api/image';

  constructor(private http: HttpClient) { }

  getImagenes() {
    return this.http.get(`${this.url}/descargar`);
  }

  guardarImagen(name: string, file: File): Observable<Object> {
    
    const form = new FormData();
    form.append('name', name);
    form.append('file', file, `form-data`);
    console.log('ya lo voy a mandar eh', form.get('name'));
    return this.http.post<Object>(`${this.url}/upload`, form);
  }
}
