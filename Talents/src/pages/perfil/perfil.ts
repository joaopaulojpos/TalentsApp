import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroProfissionalPage } from '../cadastro-profissional/cadastro-profissional';
import { ProfissionalService } from '../../domain/profissional/profissional-service';
import { Profissional } from '../../domain/profissional/profissional';
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  providers:[ProfissionalService]
})
export class PerfilPage {
 public profissional : Profissional;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private profissionalservice: ProfissionalService  
            ) {
  this.profissional = this.navParams.get('profissional');       
  console.log(this.profissional);     
  }
  
  ionViewDidLoad() {
  }

  chamaEditarPerfil(){
    this.navCtrl.push(CadastroProfissionalPage);
  }

}