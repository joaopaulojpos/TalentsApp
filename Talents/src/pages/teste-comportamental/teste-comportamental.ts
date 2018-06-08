﻿import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { TesteComportamentalService } from '../../providers/teste-comportamental/teste-comportamental-service';
import { ListCargosPage } from '../list-cargos/list-cargos';

@IonicPage()
@Component({
  selector: 'page-teste-comportamental',
  templateUrl: 'teste-comportamental.html',
  providers: [
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
  public isNenhumaPerguntaRespondida = true;
  public countEnviadas = 0;
  public qtdPerguntasExigidas = 25;

  public cd_profissional;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private comportamentalProvider: TesteComportamentalService,
    private comportamentalService: TesteComportamentalService
  ) {
    this.cd_profissional = navParams.get("cd_profissional")
    console.log(this.cd_profissional);
  }

  ionViewDidEnter() {
    this.metodoPrincipal();
  }

  //Métodos
  metodoPrincipal() {
    this.carregaPerguntasViaApi();
  }

  //Carrega as perguntas via API
  carregaPerguntasViaApi(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.lista_perguntas = new Array<any>();
      this.abreCarregandoPerguntas();

      this.comportamentalProvider.getPerguntasAlternativas().subscribe(data => {
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
    this.isNenhumaPerguntaRespondida = false;
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




  contains(lista, valor): boolean {
    if (lista != null && valor != null) {
      for (let objetoDaLista of lista) {
        if (objetoDaLista == valor) {
          return true;
        }
      }
    }
  }

  informarPerguntasRestantes() {
    let listaPerguntasExigidas = new Array<any>();
    let listaPerguntasPendentes = new Array<any>();
    //let cdPerguntaRespondida = false;

    //basicamente criando uma lista q tem de 1 até o valor de qtdPerguntasExigidas
    for (let index = 1; index <= this.qtdPerguntasExigidas; index++) {
      listaPerguntasExigidas.push(index)
    }
    let listaEscolhasSohComPerguntas = new Array<any>();
    for (let escolha of this.listaEscolhas) {
      listaEscolhasSohComPerguntas.push(escolha.cd_pergunta)
    }
    for (let exigida of listaPerguntasExigidas) {
      if (!this.contains(listaEscolhasSohComPerguntas, exigida)) {
        listaPerguntasPendentes.push(exigida)
      }
    }


    let erro = 'Respondidas: ' + this.listaEscolhas.length + "/" + this.qtdPerguntasExigidas + ".";
    let erro2 = "<table style=\"width:100%\">"
    let colunas = 1;

    for (let perguntaPendente of listaPerguntasPendentes) {
      if (colunas == 3) {
        colunas = 0;
        erro2 += "<td>" + perguntaPendente + ")Pergunta.</td></tr>"
      } else {
        if (colunas == 2) {
          erro2 += "<td>" + perguntaPendente + ")Pergunta.</td>"
        } else {
          erro2 += "<tr> <td>" + perguntaPendente + ")Pergunta.</td>"
        }

      }
      colunas++;
    }
    erro2 += "</table>";

    let alert = this.alertCtrl.create({
      title: erro,
      subTitle: "Faltam:",
      message: erro2,
      buttons: ['OK']
    });
    alert.present();


  }

  finalizarTeste() {
    if (this.isNenhumaPerguntaRespondida) {
      this.toast.create({
        message: "Você não respondeu nenhuma pergunta.",
        duration: 2000
      }).present();

    } else {
      if (this.listaEscolhas.length < this.qtdPerguntasExigidas) {
        this.informarPerguntasRestantes();
      } else {
        for (let x of this.listaEscolhas) {
          this.comportamentalService.enviarTesteComportamental(x.cd_pergunta, x.cd_resposta, this.cd_profissional)
          this.countEnviadas++;
        }

        if (this.countEnviadas == this.qtdPerguntasExigidas)

        this.toast.create({ message: "Teste enviado!" , duration: 1000 }).present();
        this.comportamentalService.gerarCalculoPerfilComp(this.cd_profissional);

        this.navCtrl.setRoot(ListCargosPage, { cd_profissional: this.cd_profissional});
        console.log(this.cd_profissional);

      }
    }

  }




}