export class Model {
    constructor(objeto?) {
        Object.assign(this, objeto);
    }
  }

export class Profissional extends Model{

    
        public  cd_profissional:number;
        public  b_foto: string;
        public  ds_senha:string;
        public  dt_nascimento:Date;
        public  ds_email:string;
        public  nr_latitude:number;
        public  nr_longitude:number;
        public  tp_conta: string;
        public  tp_sexo:string;
        public  ds_nome:string;

        get _cd_profissional(): number {
            return this.cd_profissional;
        }
        get _b_foto(): string {
            return this.b_foto;
        }
        get _ds_senha(): string {
            return this.ds_senha;
        }
        get _dt_nascimento(): Date {
            return this.dt_nascimento;
        }
        get _ds_email(): string {
            return this.ds_email;
        }
        get _nr_latitude(): number {
            return this.nr_latitude;
        }
        get _nr_longitude(): number {
            return this.nr_longitude;
        }
        get _tp_conta(): string {
            return this.tp_conta;
        }
        get _tp_sexo(): string {
            return this.tp_sexo;
        }
        get _ds_nome(): string {
            return this.ds_nome;
        }
    
    }