import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroProfissionalPage } from '../cadastro-profissional/cadastro-profissional';
import { ProfissionalService } from '../../domain/profissional/profissional-service';
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  providers:[ProfissionalService]
})
export class PerfilPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private profissionalservice: ProfissionalService  
            ) {
  }

  ionViewDidLoad() {
  }

  chamaEditarPerfil(){
    this.navCtrl.push(CadastroProfissionalPage);
  }

}