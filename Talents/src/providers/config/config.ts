import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Profissional } from '../../domain/profissional/profissional';

let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  private config = {
    showLogin: false,
    name: "",
    userName: ""

  }
  constructor(public storage: Storage) {
  }


  // setando uma seção e passando o tipo de usuário
  create(profissional: Profissional) {
    this.storage.set('profissional', profissional);
}

get(): Promise<any> {
    return this.storage.get('profissional');
}

// Quando deslogar deve remova do storage
remove() {
    this.storage.remove('profissional');
}

exist() {
    this.get().then(res => {
        console.log('resultado >>> ', res);
        if(res) {
            console.log('resultado IF');
            return true;
        } else {
            console.log('resultado else');
            return false;
        }
    });
}





  //recupera os Dados do localtorage
  getConfigData(): any{
    return localStorage.getItem(config_key_name);
  }

  //grava os Dados do localstorage
  setConfigData(showLogin?: boolean, name?: string, userName?: string){
    let config = {
      showLogin: false,
      name: "",
      userName: ""
    };

    if(showLogin){
      config.showLogin = showLogin;
    }
    if(name){
      config.name = name;
    }
    if(userName){
      config.userName = userName;
    }
    localStorage.setItem(config_key_name, JSON.stringify(config));
  }

}