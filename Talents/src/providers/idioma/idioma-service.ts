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
  
 /***************************************************
  **CADASTRAR IDIOMAS PROFISSIONAL COMUNICIACAO API**
  ** @param idioma*********************************** 
  ***************************************************/
  adicionar(idioma) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify({
      cd_profissional: idioma.cd_profissional,
      cd_idioma: idioma.cd_idioma,
      nr_nivel: idioma.nr_nivel,
    });
    console.log(body);
    return this.http.post(this.API+'profissional/idioma', body, options)
      .map(res => res.json())      
  }
}     