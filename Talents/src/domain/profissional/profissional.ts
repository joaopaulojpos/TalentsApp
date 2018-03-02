export class Profissional{

    constructor(
        public  cd_profissional:number = 0,
        public  b_foto: string = '',
        public  ds_senha:string = '',
        public  dt_nascimento:string = new Date().toISOString(),
        public  ds_email:string = '',
        public  nr_latitude:number = 0,
        public  nr_longitude:number = 0,
        public  tp_conta: string = '',
        public  tp_sexo:string = '', 
        public  ds_nome:string = ''
    ){

    }



    
}