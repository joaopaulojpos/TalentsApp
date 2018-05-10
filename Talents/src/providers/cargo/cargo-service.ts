import { Http,RequestOptions,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ServicosProvider } from '../servicos/servicos';

@Injectable()
export class CargoService {  

  constructor(
    private http: Http,
    private URL: ServicosProvider
  ) {}

  /***********************************
   **RETORNAR LISTA DE CARGOS DA API** 
   ***********************************/
  getCargos() {
    return this.http.get(this.URL.endereco + `cargos`);
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
    return this.http.post(this.URL.endereco + 'profissional/cargo', body, options)
      .map(res => res.json())      
  }
}