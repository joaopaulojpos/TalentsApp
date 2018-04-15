import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TesteComportamentalProvider {

  private baseApiPath = "http://localhost/talentsweb/api/public/";

  constructor(public http: HttpClient) {
  }

  getPerguntasAlternativas() {
    console.log(this.baseApiPath + "api/pergunta_perfil_comp");
    return this.http.get(this.baseApiPath + "api/pergunta_perfil_comp");
  }
}
