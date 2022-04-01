export class Contato {
  
    constructor() {
}
   // constructor(id?: number, nome?: string, email?: string) {
   //   this.id = id;
   //   this.nome = nome;
   //   this.email = email;
   // }
   
   public id: number;
   public nome: string;    
   public valor: string; 
   public categoria: string;
   public graficos: string;
   public nota: string;    
   
   toString() {
     return this.id+''+this.nome+''+this.valor+''+this.categoria+''+this.graficos+''+this.nota;
   }
 }