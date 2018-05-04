import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { IdiomaService } from '../../providers/idioma/idioma-service';
import { CONSTANTS } from '@firebase/util';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-idioma',
  templateUrl: 'idioma.html'
})
export class IdiomaPage {
    
    idiomaFormulario: FormGroup; 
    public idiomas =[];
 
    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public idiomaService: IdiomaService,
                private toast: ToastController,
                public formBuilder: FormBuilder) {
     
    this.idiomaFormulario = this.createMyForm(); 

    }
    ionViewDidEnter(){
        this.carregaIdiomas();
      }   
    
      carregaIdiomas(){
        this.idiomaService.getIdiomas().subscribe(data =>{
          const response = (data as any);
          const objeto = JSON.parse(response._body);
          this.idiomas = objeto.sucess;
            console.log(this.idiomas);
        },error =>{
          console.log(error);
          this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
          }
         )
        }

  /********************************
   **Metodo chamada salvar idioma**
   ********************************/
  adicionar() {
    
    console.log(this.idiomaFormulario.value);
  }

  private createMyForm() {

    return this.formBuilder.group({
      cd_idioma: ['', Validators.required],
      nr_nivel: ['', Validators.required],
      cd_profissional: "1",
    });
  }        

      
}
