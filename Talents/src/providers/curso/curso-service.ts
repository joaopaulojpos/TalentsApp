import { Http,RequestOptions,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CursoService {
  private API = "http://localhost/talentsweb/api/public/api/";
  //private API = "http://talents.heliohost.org/api/public/api/";
  

  constructor(
    private http: Http
  ) {}

  
  /***********************************
   **RETORNAR LISTA DE CURSOS DA API** 
   ***********************************/
  getCursos() {
    return this.http.get(this.API+`cursos`);
  }
}