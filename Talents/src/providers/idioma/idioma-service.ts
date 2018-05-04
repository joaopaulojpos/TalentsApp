import { Http,RequestOptions,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class IdiomaService {
  private API = "http://localhost/talentsweb/api/public/api/";
  //private API = "http://talents.heliohost.org/api/public/api/";

  constructor(
    private http: Http
  ) {}

  
  /************************************
   **RETORNAR LISTA DE IDIOMAS DA API** 
   ************************************/
  getIdiomas() {
    return this.http.get(this.API+`idiomas`);
  }
}

     