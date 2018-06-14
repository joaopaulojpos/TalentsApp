import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { ProfissionalService } from '../../providers/profissional/profissional-service';
import { Profissional } from '../../providers/profissional/profissional';
import { VagasPage } from '../vagas/vagas';
import { ProfissionalPage } from '../profissional/profissional';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ConfigProvider } from '../../providers/config/config';
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  providers:[ProfissionalService]
})
export class PerfilPage {
  public profissional : Profissional;
  idiomas: any = [];
  cargos: any = [];
  cursos: any = [];
  competencias: any = [];

  foto: string = 'assets/imgs/avatar.png';
  public profissionalLogado: Profissional;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public session: ConfigProvider,
              public alertCtrl: AlertController,
              private toast: ToastController,
              private profissionalservice: ProfissionalService,
              private camera: Camera
            ) 
            {}
    
       async getSession() {
        await this.session.get()
         .then(res => {
          this.profissionalLogado = (res);  
          console.log(this.profissionalLogado);        
          });                     
          console.log(this.session.exist());
        }

  async ionViewDidLoad() { 
    await this.getSession();
    this.profissional = this.navParams.get('profissional'); 
    this.carregaIdiomas(this.profissionalLogado[0].cd_profissional);
    this.carregaCargos(this.profissionalLogado[0].cd_profissional);
    this.carregaCursos(this.profissionalLogado[0].cd_profissional);
    this.carregaCompetencias(this.profissionalLogado[0].cd_profissional);   
  }

  carregaIdiomas(cd_profissional){
    this.profissionalservice.getIdiomas(cd_profissional).subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.idiomas = objeto.sucess;
      console.log(this.idiomas);
    },error =>{
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      }
     )
    }
    carregaCursos(cd_profissional){
      this.profissionalservice.getCursos(cd_profissional).subscribe(data =>{
        const response = (data as any);
        const objeto = JSON.parse(response._body);
        this.cursos = objeto.sucess;
      },error =>{
        console.log(error);
        this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
        }
       )
      }
      carregaCompetencias(cd_profissional){
        this.profissionalservice.getCompetencias(cd_profissional).subscribe(data =>{
          const response = (data as any);
          const objeto = JSON.parse(response._body);
          this.competencias = objeto.sucess;
            console.log(this.competencias);
        },error =>{
          console.log(error);
          this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
          }
         )
        }
        carregaCargos(cd_profissional){
          this.profissionalservice.getCargos(cd_profissional).subscribe(data =>{
            const response = (data as any);
            const objeto = JSON.parse(response._body);
            this.cargos = objeto.sucess;
          },error =>{
            console.log(error);
            this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
            }
           )
          }
        
  alterarFoto(){
    let alert = this.alertCtrl.create({
      title:'Altere a foto do perfil',
      message: '',
      buttons: [
        {
          text: 'Galeria',
          handler: () => {
            this.chamaCamera("gallery");
          }
        },
        {
          text: 'Câmera',
          handler: () => {
            this.chamaCamera("picture");
          }
        }
      ]
    });
    alert.present();

  }

  chamaCamera(type){
    const options: CameraOptions = {
      quality: 100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type == "picture" ?
      this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      allowEdit: true
    }
    this.camera.getPicture(options)
      .then((ImageData) =>{
        
        this.foto = '';
        let base64image = 'data:image/jpeg;base64,' + ImageData;
        this.foto = base64image;
        //this.profissionalLogado.b_foto = base64image;

      },(error) =>{
        console.log(error);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  chamaEditarPerfil(){
    this.navCtrl.push(ProfissionalPage,{profissional:this.profissional[0]});
  }
  
  chamaHome(){
    this.navCtrl.push(VagasPage);
  }

}