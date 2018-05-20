import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MapsPage } from '../maps/maps';
import { ProfissionalService } from '../../providers/profissional/profissional-service';
import { TesteComportamentalPage } from '../teste-comportamental/teste-comportamental';
import { Profissional } from '../../providers/profissional/profissional';
import { MenuPage } from '../menu/menu';

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
      this.navCtrl.setRoot(TesteComportamentalPage, { cd_profissional: cd_profissional });
    }, error => {
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
    })
    }else{
      this.profissionalservice.cadastrar(this.profissionalFormulario.value).subscribe(data => {
        this.navCtrl.setRoot(MenuPage);
      }, error => {
        this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      })
    }
  }
  private createMyForm() {

    return this.formBuilder.group({
      ds_nome: ['', [Validators.required, Validators.pattern("^[^-\s][a-zA-ZÀ-ú ]*")]],
      ds_email: ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      ds_senha: ['', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
      dt_nascimento: ['', Validators.required],
      tp_sexo: ['', Validators.required],
      nr_latitude: this.latitude,
      nr_longitude: this.longitude,
      nm_cidade:[''],
      b_foto: this.imagem,
      cd_profissional: null,
    });
  }
  /**
    * Metodo para tirar foto .
    */
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
  /**
   * Metodo para abrir Maps .
   */
  openMaps() {
    this.navCtrl.push(MapsPage, { profissional: this.profissionalFormulario.value });
  }

}