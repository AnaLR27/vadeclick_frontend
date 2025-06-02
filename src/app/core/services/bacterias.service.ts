import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPrincipioActivo } from '../models/principio-activo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BacteriasService {
  private _apiUrl = 'http://localhost:4000/api/bacterias';

  constructor(private _http: HttpClient) {}

  public getPrincipiosEficaces(
    bacterias: string[],
    resistentes: string[] = []
  ): Observable<IPrincipioActivo[]> {
    let params = new HttpParams().set('bacterias', bacterias.join(','));

    if (resistentes.length) {
      params = params.set('resistentes', resistentes.join(','));
    }

    return this._http.get<IPrincipioActivo[]>(`${this._apiUrl}/principios`, {
      params,
    });
  }
}
