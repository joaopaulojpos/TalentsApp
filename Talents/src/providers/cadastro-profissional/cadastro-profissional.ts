import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CadastroProfissionalProvider {
  private API_URL ='http://localhost/talentsweb/api/public/api/profissional'

  constructor(public http: Http) {
  }
  criarProfissional(b_foto: string, ds_senha: string,dt_nascimento: Date,ds_email: string,nr_latitude:string,nr_longitude: string,tp_conta:string,tp_sexo:string,ds_nome:string) {
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
  login(ds_email: string, ds_senha: string) {
    return new Promise((resolve, reject) => {
      var data = {
        login: ds_email,
        senha: ds_senha
      };
 
      this.http.post(this.API_URL + '/login', data)
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
  insert(profissional: any) {
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
  update(profissional: any) {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'profissional/' + profissional.id;
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
  remove(id: number) {
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
}
