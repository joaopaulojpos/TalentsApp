import { Http,RequestOptions,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { Idioma } from './idioma';

@Injectable()
export class IdiomaService {
  public idiomas : Array <{}>; 
  public idioma : Idioma;

  

  constructor(
    private http: Http
  ) {}

  getIdiomas() {
    return this.http.get(`http://localhost/TalentsWeb/api/public/api/idiomas`)
  }
}
