import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ServicosProvider {
  
  public endereco = "http://localhost/talentsweb/api/public/api/";
  //public endereco = "http://talents.heliohost.org/api/public/api/";
  
  constructor(public http: Http) 
  {}
  
  /************************************** 
  **BUSCA NOTIFICAÇÕES POR PROFISSIONAL**
  ***************************************/
  getNotificacoes(cd_profissional : number) {
    return this.http.get(this.endereco + `profissional/notificacoes?cd_profissional=${cd_profissional}`)
  }

}