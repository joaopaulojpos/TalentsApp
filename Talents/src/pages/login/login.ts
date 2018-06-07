import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController } from 'ionic-angular';
import { ProfissionalService } from '../../providers/profissional/profissional-service';
import { ProfissionalPage } from '../profissional/profissional';
import { MenuPage } from '../menu/menu';
import { Profissional } from '../../providers/profissional/profissional';
import { ConfigProvider } from '../../providers/config/config';
import { Facebook } from '@ionic-native/facebook';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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
  public profissionalExistente = [];


  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toast: ToastController,
              public loadingCtrl: LoadingController,
              private profissionalservice: ProfissionalService,
              public session: ConfigProvider,
              private facebook: Facebook,
              private screenOrientation: ScreenOrientation
              ){
  }  
  ionViewDidLoad(){
    
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }                           
   /**************************   
    **Cadastrar Profissional**
    **************************/   
    cadastrarProfissional(){
      this.navCtrl.push(ProfissionalPage);
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
      
      if(this.profissional != null){
       await this.criaSession(this.profissional);
       //this.fcm.subscribeToTopic('talentsApp');

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
   /**************************************************************************
   **LOGIN DO PROFISSIONAL VIA FACEBOOK SÓ MEXA SE SOUBER O QUE ESTÁ FAZENDO** 
   ***************************************************************************/
  loginFacebook(){ 
    let permissions = new Array<string>();
    permissions = ["public_profile", "email"];

    this.facebook.login(permissions).then((response) => {
     let params = new Array<string>();

     this.facebook.api("/me?fields=name,email", params)
     .then(res => {
          this.profissionalservice.getProfissional(res.email).subscribe(data =>{
          const response = (data as any);
          const objeto = JSON.parse(response._body);
          this.profissionalExistente = objeto.sucess;
       
          if(this.profissionalExistente[0].ds_senha != '' || undefined || null){
            this.profissionalservice.login(res.email,this.profissionalExistente[0].ds_senha).subscribe(async data =>{
             const response = (data as any);
             const objeto =JSON.parse(response._body);
             this.profissional = objeto.sucess;
             if(this.profissionalExistente != null){
              await this.criaSession(this.profissionalExistente);
               this.navCtrl.setRoot(MenuPage);
             }else{
              this.navCtrl.push(ProfissionalPage,{ profissional: this.profissional});
               this.toast.create({ message: 'Erro ao Efetuar Login com Facebook', duration: 2000 }).present(); 
             }
            },error =>{
             console.log(error);
             this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
            } 
           )
           }else{
            let profissional = new Profissional();
            profissional.ds_nome = res.name;
            profissional.ds_email = res.email;
            profissional.ds_senha = res.email;
            this.navCtrl.push(ProfissionalPage,{ profissional: this.profissional});
         }
        }, (error) => {
          alert(error);
          console.log('ERRO LOGIN: ',error);
        })
      }, (error) => {
        alert(error);
      });
      });
    }    
}