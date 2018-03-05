import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { ServicosProvider } from './../../providers/servicos/servicos';



@IonicPage()
@Component({
  selector: 'page-editar-profissional',
  templateUrl: 'editar-profissional.html',
})
export class EditarProfissionalPage {
  model: Profissional;

  constructor(public navCtrl: NavController, public navParams: NavParams,private toast: ToastController ,private servicosProvider: ServicosProvider) {
    if (this.navParams.data.profissional) {
      this.model = this.navParams.data.profissional;
    } else {
      this.model = new Profissional();
    }
  }
  save() {
   /* this.saveUser()
      .then(() => {
        this.toast.create({ message: 'Usuário salvo com sucesso.', position: 'botton', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((error) => {
        this.toast.create({ message: 'Erro ao salvar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      })*/
  }
 
  private saveUser() {
    /*if (this.model.cd_profissional) {
      return this.servicosProvider.alterar(this.model);
    } else {
      return this.servicosProvider.inserir(this.model);
    }*/
  } 
}
  export class Profissional {
    cd_profissional : string;
    b_foto: string;
    ds_senha:string;
    dt_nascimento:Date;
    ds_email:string;
    nr_latitude:string;
    nr_longitude:string;
    tp_conta: string;
    tp_sexo:string; 
    ds_nome:string;

  }
  
  

