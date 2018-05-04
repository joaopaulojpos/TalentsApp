import { Http,RequestOptions,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CompetenciaService {
  private API = "http://localhost/talentsweb/api/public/api/";
  //private API = "http://talents.heliohost.org/api/public/api/";
  

  constructor(
    private http: Http
  ) {}

  
  /*****************************************
   **RETORNAR LISTA DE COMPETENCIAS DA API** 
   *****************************************/
  getCompetencias() {
    return this.http.get(this.API+`competencias_tecnicas`);
  }
   /********************************************************
    **CADASTRAR COMPETENCIAS PROFISSIONAL COMUNICIACAO API**
    ** @param competencia*********************************** 
    ********************************************************/
  adicionar(competencia) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify({
      cd_profissional: competencia.cd_profissional,
      cd_competencia_tecnica: competencia.cd_competencia_tecnica,
      nr_nivel: competencia.nr_nivel,
    });
    console.log(body);
    return this.http.post(this.API+'salvar', body, options)
      .map(res => res.json())      
  }
}