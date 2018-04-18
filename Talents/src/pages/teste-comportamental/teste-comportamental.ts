import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { TesteComportamentalProvider } from '../../providers/teste-comportamental/teste-comportamental';
import { TesteComportamentalService } from '../../domain/teste-comportamental/teste-comportamental-service';
import { AnimacaoPage } from '../animacao/animacao';

@IonicPage()
@Component({
  selector: 'page-teste-comportamental',
  templateUrl: 'teste-comportamental.html',
  providers: [
    TesteComportamentalProvider,
    TesteComportamentalService
  ]
})
export class TesteComportamentalPage {

  //Atributos
  public lista_alternativas: Array<any>;
  public lista_perguntas: Array<any>;
  public lista_alternativas_da_pergunta: Array<any>;
  public listaObjeto: Array<any>;
  public listaEscolhas: Array<any>;
  public loader;

  public profissional;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    public loadingCtrl: LoadingController,
    private comportamentalProvider: TesteComportamentalProvider,
    private comportamentalService: TesteComportamentalService
  ) {
    this.profissional = navParams.get("profissional")
  }

  ionViewDidEnter() {
    this.metodoPrincipal();
  }

  //Métodos
  metodoPrincipal() {
    this.carregaPerguntasViaApi()
  }

  //Carrega as perguntas via API
  carregaPerguntasViaApi(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.lista_perguntas = new Array<any>();

      this.comportamentalProvider.getPerguntasAlternativas().subscribe(data => {
        this.abreCarregandoPerguntas();
        const response = (data as any);
        this.lista_perguntas = response.sucess;
        this.fechaCarregandoPerguntas();
      }, error => {
        console.log(error);
        this.fechaCarregandoPerguntas();
      }
      )
      resolve("qualquer coisa")
    })
  }

  //Animação de carregamento das perguntas na tela;
  abreCarregandoPerguntas() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Perguntas..."
    });
    this.loader.present();
  }
  fechaCarregandoPerguntas() {
    this.loader.dismiss();
  }

  radioChecked(escolha: string, pergunta: any) {
    let indexDePerguntaAntigaRepetida = 999;
    let isIgual: boolean = false;

    let pergunta_resposta = {
      cd_pergunta: pergunta,
      cd_resposta: escolha
    }

    if (this.listaEscolhas == null) {
      this.listaEscolhas = new Array<any>()
    }

    for (let x of this.listaEscolhas) {
      if (x.cd_pergunta == pergunta_resposta.cd_pergunta) {
        isIgual = true;
        indexDePerguntaAntigaRepetida = this.listaEscolhas.indexOf(x);

      }
    }
    if (isIgual) {
      this.listaEscolhas.splice(indexDePerguntaAntigaRepetida, 1);
      isIgual = false;
    }
    this.listaEscolhas.push(pergunta_resposta);

  }

  finalizarTeste() {
    let countEnviadas = 0;
    let qtdPerguntasExigidas = 25;
    if (this.listaEscolhas.length < qtdPerguntasExigidas) {

      this.toast.create({ message: 'Responda todas as questões.\nRespondidas: ' + this.listaEscolhas.length + "//25", duration: 2000 }).present();
    } else {
      for (let x of this.listaEscolhas) {
        this.comportamentalService.enviarTesteComportamental(x.cd_pergunta, x.cd_resposta, 2)
        countEnviadas++;
        console.log(countEnviadas)
      }

      if (countEnviadas == qtdPerguntasExigidas)

        this.toast.create({ message: "Teste enviado.Qtd de escolhas enviadas: " + this.listaEscolhas.length, duration: 2000 }).present();
      console.log("Teste enviado.Qtd de escolhas enviadas: " + this.listaEscolhas.length);
      this.comportamentalService.gerarCalculoPerfilComp(2);
      this.navCtrl.push(AnimacaoPage,{profissional: this.profissional});
      console.log("calculo perfil comportamental gerado");

      //this.toast.create({ message: "Teste enviado.Qtd de escolhas enviadas: " + this.listaEscolhas.length, duration: 2000 }).present();
    }


  }




}
