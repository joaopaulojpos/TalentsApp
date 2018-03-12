import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VagasService {
  public vagas : Array <{}>; 

  constructor(
    private http: Http
  ) {}
  
  /** 
   * RETORNA VAGAS DA API 
  */
  getVagas() {
  return this.http.get('http://localhost/talentsweb/api/public/api/vagas');
  /*(.map(res => res.json())
    .subscribe(data =>{
      this.vagas = data;
      console.log(this.vagas);
    }); */
  }
}
