import { Component } from '@angular/core';
import { IonicPage , NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MapsPage } from '../maps/maps';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'profissional.html',
  providers:[
    Camera
  ] 
})
export class ProfissionalPage {

  profissionalForm: FormGroup;
  imagem ="";  
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private camera: Camera
  ) {
    this.profissionalForm = this.createMyForm();
  }
  
  saveData(){
    console.log(this.profissionalForm.value);
  }
  
  private createMyForm(){
    return this.formBuilder.group({
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      longitudeMaps : ['',Validators.required],
      latitudeMaps : ['',Validators.required],
      passwordRetry: this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required]
      },),
      tpSexo: ['', Validators.required],
    });
  }
   /**
   * METODO DE TIRAR FOTO 
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
openMaps(){
  this.navCtrl.push(MapsPage);
 }
}