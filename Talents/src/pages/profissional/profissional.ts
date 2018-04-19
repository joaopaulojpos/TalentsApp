import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MapsPage } from '../maps/maps';
import { ProfissionalService } from '../../domain/profissional/profissional-service';
import { TesteComportamentalPage } from '../teste-comportamental/teste-comportamental';
import { Profissional } from '../../domain/profissional/profissional';
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
    public navParams: NavParams
  ) {
    this.profissionalFormulario = this.createMyForm();

    this.profissional = this.navParams.get('profissionalMaps') ||
      this.profissionalFormulario.value;

    this.profissionalFormulario.patchValue(this.profissional);

    this.latitude = this.navParams.get('latitude');
    this.longitude = this.navParams.get('longitude');


  }



  /*
   *Metodo chamada salvar profissional
   */
  salvarProfissional() {
    this.profissionalservice.cadastrar(this.profissionalFormulario.value).subscribe(data => {
      const response = (data as any)
      let cd_profissional = response;
      this.navCtrl.setRoot(TesteComportamentalPage, { cd_profissional: cd_profissional });

      //this.navCtrl.setRoot(LoginPage);
    }, error => {
      console.log("Data Erro: " + error);
    })
  }

  private createMyForm() {

    return this.formBuilder.group({
      ds_nome: ['', Validators.required],
      ds_email: ['', Validators.required],
      ds_senha: ['', Validators.required],
      dt_nascimento: ['', Validators.required],
      tp_sexo: ['', Validators.required],
      nr_latitude: this.latitude,
      nr_longitude: this.longitude,
      b_foto: this.imagem,
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