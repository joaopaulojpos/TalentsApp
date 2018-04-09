import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ProfissionalPage } from '../profissional/profissional';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',

})
export class MapsPage {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef;

constructor(public navCtrl: NavController, private mapsAPILoader: MapsAPILoader,
            private ngZone: NgZone)  {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //criar o formulario search
    this.searchControl = new FormControl();

    //define posição atual
    this.setCurrentPosition();

}

ionViewDidLoad() {
    //definir informações padrões do google maps na inicialização da tela
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //criar o formulario search
    this.searchControl = new FormControl();

    //definir posição atual
    this.setCurrentPosition();

    //carregar o preenchimento automático de locais
    this.mapsAPILoader.load().then(() => {
        let nativeHomeInputBox = document.getElementById('localizacao').getElementsByTagName('input')[0];
        let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
            types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
                //obtém o resultado da localização
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                //verifica o resultado
                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }

                //seta latitude, longitude e zoom
                this.latitude = place.geometry.location.lat();
                this.longitude = place.geometry.location.lng();
                this.zoom = 12;
           });
        });
    });
}
  // metodo que retorna posição atual  
  private setCurrentPosition() {
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              this.zoom = 12;
          });
      }
  }
  //metodo que retorna posição atual do maps 
  private getLocalizcao(){
    this.navCtrl.push(ProfissionalPage,{latitude: this.latitude , longitude: this.longitude});
  }

}

