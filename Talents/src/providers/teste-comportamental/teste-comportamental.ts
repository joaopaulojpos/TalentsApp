import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import { IfObservable } from 'rxjs/observable/IfObservable';

@Injectable()
export class TesteComportamentalProvider {

  private baseApiPath = "http://localhost/talentsweb/api/public/api/";

  constructor(
    public http: HttpClient
  ) {
  }

  getPerguntasAlternativas() {
    console.log(this.baseApiPath + "pergunta_perfil_comp");
    return this.http.get(this.baseApiPath + "pergunta_perfil_comp")
  }

  /** 
 * ENVIAR RESPOSTAS DO TESTE COMPORTAMENTAL cd_alternativa_perfil_comp,cd_profissional,cd_pergunta_perfil_comp
 */
  enviarTesteComportamental(cd_pergunta_perfil_comp, cd_alternativa_perfil_comp, profissional) {
    //tutorial:
    //https://www.youtube.com/watch?v=_05v0mrNLh0

    let body = JSON.stringify({
      cd_alternativa_perfil_comp: cd_alternativa_perfil_comp,
      cd_profissional: profissional.cd_profissional,
      cd_pergunta_perfil_comp: cd_pergunta_perfil_comp
    });

    console.log(body);

    //{"cd_alternativa_perfil_comp":"99","cd_profissional":3,"cd_pergunta_perfil_comp":"25"}

    //método 1 params
    let params = new HttpParams();
    params.set("cd_alternativa_perfil_comp", cd_alternativa_perfil_comp)
    params.set("cd_profissional", profissional.cd_profissional)
    params.set("cd_pergunta_perfil_comp", cd_pergunta_perfil_comp)

    //this.http.post(this.baseApiPath + "inserir_resposta", body) //metodo 2 body
    return this.http.post(this.baseApiPath + "inserir_resposta", { params }) //método 1 params    
      .catch(err => {
        console.log("Erro ao enviarTesteComportamental");
        console.log(err);
        return IfObservable.of(err)
      })

    //console.log("executou o post");

  }
}
