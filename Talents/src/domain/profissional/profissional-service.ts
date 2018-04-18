import { Http, RequestOptions,Headers } from '@angular/http';
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

  return this.http.get(`http://localhost/talentsweb/api/public/api/profissional/login?login=${ds_email}&senha=${ds_senha}`)
  /*ALTERADO
  let API = `http://localhost/talentsweb/api/public/api/profissional/login?login=${ds_email}&senha=${ds_senha}`;
   return this.http.get(API)
   .map(res => res.json().sucess)
   .toPromise()
   .then(dado =>{
     let profissionalservice = new Profissional(dado.cd_profissional,dado.b_foto,
      dado.ds_senha,dado.dt_nascimento,dado.ds_email,dado.nr_latitude,
      dado.nr_longitude,dado.tp_conta,dado.tp_sexo,dado.ds_nome);
      console.log(this.profissionalservice);
      this.profissionalservice = profissionalservice;
     })--> **/
  }
  isLogado(): Profissional{
    return this.profissionalservice;
  }
  /**
   * CADASTRAR PROFISSIONAL INFOMRMAÇÕES BASICAS COMUNICIACAO API
   * @param profissional 
   */
  cadastrar(profissional){
    console.log(profissional.ds_email);
    let headers = new Headers({
			'Content-Type': 'application/json'
		});
		let options = new RequestOptions({
			headers: headers
		});
		let body = JSON.stringify({
      b_foto: "semfoto.jpg",
      ds_senha:profissional.ds_senha,
      dt_nascimento:profissional.dt_nascimento,
      ds_email:profissional.ds_email,
      nr_latitude:profissional.nr_latitude|| -8.1721658,
      nr_longitude:profissional.nr_longitude || -34.9986835,
      tp_conta:"A",
      tp_sexo:profissional.tp_sexo,
      ds_nome:profissional.ds_nome
    });
    console.log(body);
    this.http.post('http://localhost/talentsweb/api/public/api/profissional/salvar',body,options)
    .map(res =>{   
      res.json()
    }).subscribe(data => console.log(data));
  }
}
