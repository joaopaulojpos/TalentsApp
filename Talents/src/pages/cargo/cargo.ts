import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoService } from '../../providers/cargo/cargo-service';
import { ListCargosPage } from '../list-cargos/list-cargos';

@IonicPage()
@Component({
  selector: 'page-cargo',
  templateUrl: 'cargo.html',
})
export class CargoPage {
  cargoFormulario: FormGroup; 
  public cargos =[];
  public cd_profissional;
  public tela;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastController,
              public cargoService: CargoService,
              public formBuilder: FormBuilder) {

    this.cargoFormulario = this.createMyForm(); 
    this.cd_profissional = navParams.get("cd_profissional");
    this.tela = navParams.get("tela");
  }
  async ionViewDidLoad(){
    this.carregaCargos();
  }   

  carregaCargos(){
    this.cargoService.getCargos().subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.cargos = objeto.sucess;
    },error =>{
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      }
     )
    }
 /*******************************
  **Metodo chamada salvar cargo**
  *******************************/
  adicionar() {
    this.cargoFormulario.value.cd_profissional = this.cd_profissional;
    this.cargoService.adicionar(this.cargoFormulario.value).subscribe(data => {
      this.navCtrl.setRoot(ListCargosPage,{ cd_profissional: this.cd_profissional,tela: this.tela});
    }, error => {
      console.log("Data Erro: " + error);
    })
  }

  private createMyForm() {

    return this.formBuilder.group({
      cd_profissional:this.cd_profissional,
      cd_cargo:['', Validators.required],
      ds_empresa: ['', Validators.required],
      dt_fim: ['', Validators.required],
      dt_inicio: ['', Validators.required]
    });
  }          
}
