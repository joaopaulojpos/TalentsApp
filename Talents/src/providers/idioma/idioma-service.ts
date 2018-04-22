import { Http,RequestOptions,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { Idioma } from './idioma';

@Injectable()
export class IdiomaService {
  private API = "http://localhost/talentsweb/api/public/api/";
  public idiomas : Array <{}>; 
  public idioma : Idioma;

  

  constructor(
    private http: Http
  ) {}

  
  /************************************
   **RETORNAR LISTA DE IDIOMAS DA API** 
   ************************************/
  getIdiomas() {
    return this.http.get(this.API+`idiomas`)
  }
}
