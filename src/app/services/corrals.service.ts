import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Corral, Corrals } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CorralsService 
{

  constructor(
    private http: HttpClient
  ) { }

  getAllCorrals(): Observable<Corrals>{
    return this.http.get<Corrals>(`${environment.apiUrl}corrals`);
  }
  addCorral(corral: Corral) {
    return this.http.post(`${environment.apiUrl}corrals`, corral);
  }




}
