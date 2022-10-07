import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, delay, map, pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getNames(): any {
    return this.httpClient.get<any>(this.url+'/list', this.httpOptions)
    .pipe(
      map((valor) => valor[0]),
      pluck("payload"),
      map((numeros) => {
          return numeros.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))
      })
    )
  }

  search(search: string): any {
    //const searchValue = search ? new HttpParams().append('search', search) : '';
    return this.httpClient.get<any>(this.url+'/search', { ...this.httpOptions, params: { search }})
  }

  private ordenaPorCodigo(acaoA: any, acaoB: any){
    if(acaoA.number > acaoB.number){
      return 1;
    }

    if(acaoA.number < acaoB.number){
      return -1;
    }

    return 0;
  }


}
