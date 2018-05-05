import { Http,RequestOptions,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CargoService {
  private API = "http://localhost/talentsweb/api/public/api/";
  //private API = "http://talents.heliohost.org/api/public/api/";
  

  constructor(
    private http: Http
  ) {}

  
  /***********************************
   **RETORNAR LISTA DE CARGOS DA API** 
   ***********************************/
  getCargos() {
    return this.http.get(this.API+`cargos`);
  }
  
  /**************************************************
   **CADASTRAR CARGOS PROFISSIONAL COMUNICIACAO API**
   ** @param cargo*********************************** 
   **************************************************/
   adicionar(cargo) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify({
      cd_profissional: cargo.cd_profissional,
      cd_cargo: cargo.cd_cargo,
	    ds_empresa:cargo.ds_empresa,
	    dt_fim:cargo.dt_fim,
	    dt_inicio:cargo.dt_inicio
    });
    console.log(body);
    return this.http.post(this.API+'profissional/cargo', body, options)
      .map(res => res.json())      
  }
}