import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoService } from '../../providers/cargo/cargo-service';

@IonicPage()
@Component({
  selector: 'page-cargo',
  templateUrl: 'cargo.html',
})
export class CargoPage {
  cargoFormulario: FormGroup; 
  public cargos =[];
  public cd_profissional;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastController,
              public cargoService: CargoService,
              public formBuilder: FormBuilder) {

    this.cargoFormulario = this.createMyForm(); 
    this.cd_profissional = navParams.get("cd_profissional");
    console.log(this.cd_profissional);
  }
  ionViewDidEnter(){
    this.carregaCargos();
  }   

  carregaCargos(){
    this.cargoService.getCargos().subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.cargos = objeto.sucess;
        console.log(this.cargos);
    },error =>{
      console.log(error);
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      }
     )
    }
 /*******************************
  **Metodo chamada salvar cargo**
  *******************************/
  adicionar() {
    
    console.log(this.cargoFormulario.value);
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
