import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { ProfissionalService } from '../../domain/profissional/profissional-service';
import { ProfissionalPage } from '../profissional/profissional';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[ProfissionalService]
})
export class LoginPage {
  public ds_email : string;
  public ds_senha : string;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toast: ToastController,
              private profissionalservice: ProfissionalService
              ){
  }  
  ionViewDidLoad(){
  }                           
   /**   
    * CHAMADA TELA DE CADASTRO NOVO PROFISSIONAL
    */   
    cadastrarProfissional(){
      this.navCtrl.push(ProfissionalPage);
    }

    /**
    * CHAMADA DO LOGIN PROFISSIONAL
    */   
   login(){
    this.profissionalservice.login(this.ds_email , this.ds_senha)
        .then(profissionalservice=>{
         this.navCtrl.setRoot(MenuPage);
         console.log(profissionalservice);
    }).catch(()=>{
      this.toast.create({ message: 'Erro ao Efetuar Login. Usuário ou Senha inválidos', duration: 2000 }).present();
    }); 
   }
  }