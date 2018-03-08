import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {Profissional} from './../../domain/profissional/profissional';
import { ProfissionalService } from '../../domain/profissional/profissional-service';
import { CadastroProfissionalPage } from '../cadastro-profissional/cadastro-profissional';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public profissional : Profissional;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toast: ToastController,
              private service: ProfissionalService
              ){
  
    this.profissional = new Profissional();            
  }


   /**
    * CHAMADA TELA DE CADASTRO NOVO PROFISSIONAL
    */   
    cadastrarProfissional(){
      this.navCtrl.push(CadastroProfissionalPage);
    }

    /**
    * CHAMADA DO LOGIN PROFISSIONAL
    */     
   login(){

    this.service.login(this.profissional.ds_email , this.profissional.ds_senha).then(profissionalresult=>{
      this.navCtrl.setRoot(TabsPage);
      console.log(profissionalresult);
    }).catch(()=>{
      this.toast.create({ message: 'Erro ao conectar com API', duration: 2000 }).present();
    });
  }

  }