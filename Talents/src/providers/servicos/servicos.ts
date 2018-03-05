import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {Profissional} from '../../domain/profissional/profissional'
import 'rxjs/add/operator/map';

@Injectable()
export class ServicosProvider {
  private profissionalLogado: Profissional;
  constructor(public http: Http) {
  }

/*
 * LOGIN DO PROFISSIONAL COMUNICAÇÃO COM API 
 */
login(ds_email: string, ds_senha: string) {

  let API = 'https://jpo1994.000webhostapp.com/api/public/api/profissional/login?';
  let body = 'login=${ds_email}&senha=${ds_senha}'
  /*console.log('chegou 1')
  return this.http.post(API, body).map(res => res.json().profissional)
    .toPromise()
   .then(dado =>{
    let profissional = new Profissional(dado.cd_profissional,dado.b_foto,
                 dado.ds_senha,dado.dt_nascimento,dado.ds_email,dado.nr_latitude,
                 dado.nr_longitude,dado.tp_conta,dado.tp_sexo,dado.ds_nome);
                this.profissionalLogado = profissional;  
                return profissional;
   });*/

   return new Promise((resolve,reject)=>{
      this.http.post(API, body).map(res => res.json().profissional)
      .subscribe(data=>{
        //console.log('data return: ');
        resolve(data)
      },error=>{
        reject(error)
      })
   });
    }
 /*
  * RETORNA PROFISSIONAL LOGADO 
 */
isLogado(){
      return this.profissionalLogado;
    }
  }

/*
 * 
  cadastrar(b_foto: string, ds_senha: string,dt_nascimento: Date,ds_email: string,nr_latitude:string,nr_longitude: string,tp_conta:string,tp_sexo:string,ds_nome:string) {
    return new Promise((resolve, reject) => {
      var data = {
        b_foto: b_foto,
        ds_senha:ds_senha,
        dt_nascimento:dt_nascimento,
        ds_email:ds_email,
        nr_latitude:nr_latitude,
        nr_longitude:nr_longitude,
        tp_conta: tp_conta,
        tp_sexo:tp_sexo, 
        ds_nome:ds_nome

      };
 
      this.http.post(this.API_URL + 'register', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }


  getAll(page: number) {
    return new Promise((resolve, reject) => {
 
      let url = this.API_URL + 'profissional/?per_page=10&page=' + page;
 
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }
  get(id: number) {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'profissional/' + id;
 
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  inserir(profissional: any) {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'profissional/';
 
      this.http.post(url, profissional)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }
  
  alterar(profissional: any) {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'profissional/' + profissional.cd_profissional;
      let data = {
        "ds_nome": profissional.ds_nome,
        "ds_email": profissional.ds_email
      }
 
      this.http.put(url, profissional)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  deletar(id: number) {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'profissional/' + id;
 
      this.http.delete(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }
*/

