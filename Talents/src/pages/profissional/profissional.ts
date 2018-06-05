import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  selector: 'page-form',
  templateUrl: 'profissional.html',
  providers: [
    Camera,
    ProfissionalService
  ]
})
export class ProfissionalPage {
  
  profissionalFormulario: FormGroup;
  private imagem;
  private latitude = [];
  private longitude = [];
  public profissional: Profissional;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private camera: Camera,
    private profissionalservice: ProfissionalService,
    public navParams: NavParams,
    private toast: ToastController
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
    if(this.profissionalFormulario.value.cd_profissional ==null){
    this.profissionalservice.cadastrar(this.profissionalFormulario.value).subscribe(data => {
      const response = (data as any)
      let cd_profissional = response;
      if(cd_profissional== "Já existe uma Profissional cadastrada com esses dados !"){
        this.toast.create({ message: 'Já existe uma Profissional cadastrado com o email informado, estamos lhe redirecionando para a tela de Login.', duration: 3000 }).present(); 
        this.navCtrl.setRoot(LoginPage);
      } else{
      this.navCtrl.setRoot(TesteComportamentalPage, { cd_profissional: cd_profissional });
    }
    }, error => {
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
    })
    }else{
      this.profissionalservice.cadastrar(this.profissionalFormulario.value).subscribe(data => {
        this.navCtrl.setRoot(MenuPage, { Profissional: this.profissional});
        console.log(this.profissional);
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
      b_foto: this.imagem,
      cd_profissional: null,
    }, {validator: this.matchingPasswords('ds_senha', 'ds_senha_confirmacao')});
  }

  /**************************
   **Metodo para tirar foto**
   **************************/
  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imagem = base64Image;

    }, (err) => {
      console.log(err);
    });
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