import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-cadastro-profissional',
  templateUrl: 'cadastro-profissional.html',
  providers:[
    Camera
  ] 
})
export class CadastroProfissionalPage {
  imagem ="";  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private camera: Camera) {
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
 console.log(this.imagem);
}, (err) => {
});
  }
}
