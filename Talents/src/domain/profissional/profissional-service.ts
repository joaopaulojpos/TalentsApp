import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Profissional } from './profissional';
@Injectable()
export class ProfissionalService {

  public profissionalservice : Profissional;

  constructor(private http: Http) {
  }

/*
 * LOGIN DO PROFISSIONAL COMUNICAÇÃO COM API 
 * 
 */
 login(ds_email: string, ds_senha: string) {
  let API = `http://localhost/talentsweb/api/public/api/profissional/login?login=${ds_email}&senha=${ds_senha}`;
   return this.http.get(API)
   .map(res => res.json().sucess)
   .toPromise()
   .then(dado =>{
     let profissionalservice = new Profissional(dado.cd_profissional,dado.b_foto,
      dado.ds_senha,dado.dt_nascimento,dado.ds_email,dado.nr_latitude,
      dado.nr_longitude,dado.tp_conta,dado.tp_sexo,dado.ds_nome);
      this.profissionalservice = profissionalservice;
     })   
  }
  isLogado(): Profissional{
    return this.profissionalservice;
  }
}
