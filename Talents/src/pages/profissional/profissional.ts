import { Component } from '@angular/core';
import { IonicPage , NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MapsPage } from '../maps/maps';
import { ProfissionalService } from '../../domain/profissional/profissional-service';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'profissional.html',
  providers:[
    Camera
  ] 
})
export class ProfissionalPage {

  profissionalFormulario: FormGroup;
  imagem ="";  
  private latitude = [];
  private longitude= [];
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private camera: Camera,
    private profissionalservice: ProfissionalService,
    public navParams: NavParams    
  ) {
    this.latitude = this.navParams.get('latitude');
    this.longitude = this.navParams.get('longitude');
    console.log(this.latitude);
    console.log(this.longitude);
    this.profissionalFormulario = this.createMyForm();
  }
  
  salvarProfissional(){
    this.profissionalservice.cadastrar(this.profissionalFormulario.value);
  }
  
  private createMyForm(){
    return this.formBuilder.group({
      ds_nome:  ['', Validators.required],
      ds_email: ['', Validators.required],
      ds_senha: ['', Validators.required],
      dt_nascimento: ['', Validators.required],
      tp_sexo: ['', Validators.required],
      nr_latitude : this.latitude,
      nr_longitude: this.longitude,
    });
  }
/**
  * Metodo para tirar foto .
  */
 tirarFoto(){
  const options: CameraOptions = {
quality: 100,
destinationType: this.camera.DestinationType.DATA_URL,
encodingType: this.camera.EncodingType.JPEG,
mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
this.imagem = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
});
}
/**
 * Metodo para abrir Maps .
 */
openMaps(){
  this.navCtrl.push(MapsPage,{profissional: this.profissionalFormulario});
 }
}