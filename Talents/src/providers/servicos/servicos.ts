import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ServicosProvider {
 
  constructor(public http: Http) 
  {}

  getNotificacoes(cd_profissional : number) {
    return this.http.get(`http://talents.heliohost.org/api/public/api/profissional/notificacoes?cd_profissional=${cd_profissional}`)
  }

}