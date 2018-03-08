import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Profissional } from './profissional';
@Injectable()
export class ProfissionalService {
    public profissionalresult :Profissional;

  constructor(private http: Http) {
  }
  
/*
 * LOGIN DO PROFISSIONAL COMUNICAÇÃO COM API 
 * 
 */
public login(ds_email: string, ds_senha: string) {

    let API = 'https://jpo1994.000webhostapp.com/api/public/api/profissional/login?';
    let body = 'login=${ds_email}&senha=${ds_senha}'
  
    return this.http.post(API, body)
      .map(res => res.json())
      .toPromise()
      .then(dado =>{
       let profissionalresult = new Profissional(dado.cd_profissional,dado.b_foto,
                    dado.ds_senha,dado.dt_nascimento,dado.ds_email,dado.nr_latitude,
                    dado.nr_longitude,dado.tp_conta,dado.tp_sexo,dado.ds_nome);
                    console.log(dado);
    });
  }
}
