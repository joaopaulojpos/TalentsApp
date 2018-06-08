import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MapsPage } from '../maps/maps';
import { ProfissionalService } from '../../providers/profissional/profissional-service';
import { TesteComportamentalPage } from '../teste-comportamental/teste-comportamental';
import { Profissional } from '../../providers/profissional/profissional';
import { MenuPage } from '../menu/menu';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-profissional',
  templateUrl: 'profissional.html',
  providers: [
    Camera,
    ProfissionalService
  ]
})
export class ProfissionalPage {
  
  profissionalFormulario: FormGroup;
  foto: string = 'assets/imgs/avatar.png';
  private latitude = [];
  private longitude = [];
  public profissional: Profissional;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private camera: Camera,
    private profissionalservice: ProfissionalService,
    public navParams: NavParams,
    private toast: ToastController,
    public alertCtrl: AlertController
  ) {
    this.profissionalFormulario = this.createMyForm();

    this.profissional = this.navParams.get('profissional') ||
    this.profissionalFormulario.value;
    console.log(this.profissional.cd_profissional);
    this.profissionalFormulario.patchValue(this.profissional);
  }

  /**************************************
   **Metodo chamada salvar profissional**
   **************************************/
  salvarProfissional() {
    if(this.profissionalFormulario.value.cd_profissional == null){
      console.log(this.profissionalFormulario.value);
    this.profissionalservice.cadastrar(this.profissionalFormulario.value).subscribe(data => {
      const response = (data as any)
      let cd_profissional = response;
      console.log(cd_profissional.erro);
      if(cd_profissional.erro == "Já existe uma Profissional cadastrada com esses dados !"){
        this.toast.create({ message: 'Já existe uma Profissional cadastrado com o email informado, estamos lhe redirecionando para a tela de Login.', duration: 3000 }).present(); 
        this.navCtrl.setRoot(LoginPage);
      } else{
      this.navCtrl.setRoot(TesteComportamentalPage, { cd_profissional: cd_profissional.sucess });
    }
    }, error => {
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
    })
    }else{
      this.profissionalservice.cadastrar(this.profissionalFormulario.value).subscribe(data => {
        this.navCtrl.setRoot(MenuPage, { Profissional: this.profissional});
      }, error => {
        this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      })
    }
  }
  private createMyForm() {

    return this.formBuilder.group({
      ds_nome: ['', [Validators.required, Validators.pattern("^[^-\s][a-zA-ZÀ-ú ]*")]],
      ds_email: ['', [Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      ds_senha: ['', [Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      ds_senha_confirmacao: ['',Validators.required],
      dt_nascimento: ['', Validators.required],
      tp_sexo: ['', Validators.required],
      nr_latitude: this.latitude,
      nr_longitude: this.longitude,
      nm_cidade:['',Validators.required],
      b_foto: this.foto,
      cd_profissional: null,
    }, {validator: this.matchingPasswords('ds_senha', 'ds_senha_confirmacao')});
  }

  /**************************
   **Metodo para tirar foto**
   **************************/
  alterarFoto(){
    let alert = this.alertCtrl.create({
      title:'Selecionar a foto do perfil',
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
        console.log(this.foto);
        this.profissionalFormulario.value.b_foto =this.foto;
        console.log(this.profissionalFormulario.value.b_foto );

      },(error) =>{
        console.log(error);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  /**************************
   **Metodo para abrir Maps** 
   **************************/
  openMaps() {
    this.navCtrl.setRoot(MapsPage, { profissional: this.profissionalFormulario.value });
  }

  /**********************************
   **Metodo para confrmar as senhas** 
   **********************************/
  matchingPasswords(ds_senha: string, ds_senha_confirmacao: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[ds_senha];
      let confirmPassword = group.controls[ds_senha_confirmacao];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

}