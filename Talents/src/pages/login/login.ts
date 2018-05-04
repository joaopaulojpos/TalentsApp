import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController } from 'ionic-angular';
import { ProfissionalService } from '../../providers/profissional/profissional-service';
import { ProfissionalPage } from '../profissional/profissional';
import { MenuPage } from '../menu/menu';
import { Profissional } from '../../providers/profissional/profissional';
import { ConfigProvider } from '../../providers/config/config';
import { IdiomaPage } from '../idioma/idioma';
import { ListIdiomasPage } from '../list-idiomas/list-idiomas';
import { ListCompetenciasPage } from '../listcompetencias/listcompetencias';
import { ListCursosPage } from '../listcursos/listcursos';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[ProfissionalService]
})
export class LoginPage {
  public ds_email : string;
  public ds_senha : string;
  public loader;
  public profissional :Profissional;

  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toast: ToastController,
              public loadingCtrl: LoadingController,
              private profissionalservice: ProfissionalService,
              private config: ConfigProvider,
              public session: ConfigProvider
              ){
  }  
  ionViewDidLoad(){
  }                           
   /**************************   
    **Cadastrar Profissional**
    **************************/   
    cadastrarProfissional(){
      this.navCtrl.push(ListCursosPage);
    }

    /**********************
     **Login Profissional**
     **********************/   
    login(){
     this.abreLogin();
     this.profissionalservice.login(this.ds_email , this.ds_senha).subscribe(async data =>{
      const response = (data as any);
      const objeto =JSON.parse(response._body);
      this.profissional = objeto.sucess;
      console.log(this.profissional);
      
      if(this.profissional != null){

       await this.criaSession(this.profissional);

        this.navCtrl.setRoot(MenuPage);
        this.fechaLogin();
      }else{
        this.fechaLogin();
        this.toast.create({ message: 'Erro ao Efetuar Login. Usuário ou Senha inválidos', duration: 2000 }).present(); 
      }
     },error =>{
      console.log(error);
      this.fechaLogin();
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
     } 
    )
   }

   abreLogin() {
    this.loader = this.loadingCtrl.create({
      content: "Entrando..."
    });
    this.loader.present();
  }
  fechaLogin(){
    this.loader.dismiss();
  }

  criaSession(profissional) {
    //this.profissional = new Profissional;
    //disparando a sessão
    this.session.create(profissional);
    
  } 
  
  loginFacebook(){
    this.profissionalservice.loginFacebook()
    .then(() => {
        this.navCtrl.setRoot(MenuPage);
      })
      .catch((error) => {
        this.toast.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar Login via Facebook' })
          .present();
      });
   }

  }