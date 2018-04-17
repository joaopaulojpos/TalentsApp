import { Injectable } from '@angular/core';

let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  private config = {
    showLogin: false,
    name: "",
    userName: ""

  }
  constructor() {
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