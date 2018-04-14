import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ServicosProvider {
 
  constructor(public http: Http) 
  {}

  getNotificacoes(cd_profissional : number) {
    return this.http.get(`http://localhost/talentsweb/api/public/api/profissional/${cd_profissional}/notificacoes`)
  }

}