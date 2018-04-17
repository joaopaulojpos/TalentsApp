import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class TesteComportamentalService {
    constructor(
        private http: Http
    ) { }

    enviarTesteComportamental(cd_pergunta_perfil_comp, cd_alternativa_perfil_comp, profissional) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body = JSON.stringify({
            cd_pergunta_perfil_comp: cd_pergunta_perfil_comp,
            cd_alternativa_perfil_comp: cd_alternativa_perfil_comp,
            cd_profissional: profissional.cd_profissional
        });

        this.http.post('http://localhost/talentsweb/api/public/api/inserir_resposta', body, options)
            .map(res => {
                res.json()
            }).subscribe(data => console.log(data));

    }
}
