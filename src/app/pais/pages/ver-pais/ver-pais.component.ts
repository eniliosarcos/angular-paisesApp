import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators'
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(private activatedRoute: ActivatedRoute,
              private paisSerice: PaisService) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.paisSerice.getPaisPorAplha(id))
          // tap(console.log)
        )
        .subscribe(pais => this.pais = pais);
          // console.log();

    // this.activatedRoute.params
    //     .subscribe(({id}) =>{
    //       console.log(id);

    //       this.paisSerice.getPaisPorAplha(id)
    //       .subscribe(pais => {
    //         console.log(pais);
    //       });
    //     });
  }

}
