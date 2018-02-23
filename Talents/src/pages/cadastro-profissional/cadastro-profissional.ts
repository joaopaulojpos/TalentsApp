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
  imagem = "";  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroProfissionalPage');
  }

  /** Metodo para Tirar Foto */
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
}
