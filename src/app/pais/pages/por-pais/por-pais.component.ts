import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li{
        cursor:pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError:boolean = false;
  paises: Country[]= [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias:boolean = false;

  constructor(private paisService: PaisService) { }

  buscar(termino: string){
    
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(this.termino)
      .subscribe((paises) => {

        this.paises = paises;
      }, (error) =>{

        this.hayError = true;
        this.paises = [];
      });
  }

  sugerencias(termino: string){

    this.termino = termino;
    this.hayError = false;
    this.mostrarSugerencias = true;


    this.paisService.buscarPais(termino)
      .subscribe(paises => {

        this.paisesSugeridos = paises.splice(0,5)
      },err => {

        this.paisesSugeridos = []
      });
  }

  buscarSugerido(termino:string){

    this.buscar(termino);
    
  }
}
