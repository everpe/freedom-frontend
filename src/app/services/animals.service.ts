import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Animal } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService 
{
  constructor(
    private http: HttpClient
  ) { }


  getAnimalsFromCorral(idCorral: string){
  }
  addAnimal(animal: Animal) {
    return this.http.post(`${environment.apiUrl}animals`, animal);
  }

  getPromedioEdades(idCorral: number){
    return this.http.get<any>(`${environment.apiUrl}corrals/${idCorral}/avg`);
  }

}
