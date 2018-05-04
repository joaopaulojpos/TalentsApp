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
  
  /**************************************************
   **CADASTRAR CURSOS PROFISSIONAL COMUNICIACAO API**
   ** @param curso*********************************** 
   **************************************************/
   adicionar(curso) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify({
      cd_profissional: curso.cd_profissional,
      cd_curso: curso.cd_curso,
	    ds_instituicao:curso.ds_instituicao,
	    dt_fim:curso.dt_fim,
	    dt_inicio:curso.dt_inicio,
	    tp_certificado_validado:"A",
	    nr_certificado:curso.nr_certificado,
	    nr_periodo: curso.nr_periodo
    });
    console.log(body);
    return this.http.post(this.API+'salvar', body, options)
      .map(res => res.json())      
  }
}