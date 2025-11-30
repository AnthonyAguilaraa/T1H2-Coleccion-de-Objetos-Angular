// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-devolucion',
//   imports: [],
//   templateUrl: './devolucion.html',
//   styleUrl: './devolucion.css',
// })
// export class Devolucion {

// }

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcoMoveService } from '../../Servicios/eco-move.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-devolucion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devolucion.html',
  styleUrl: './devolucion.css'
})
export class Devolucion implements OnInit {

  alquileres$!: Observable<any[]>;
  private service = inject(EcoMoveService);

  ngOnInit() {
    this.alquileres$ = this.service.alquileres$;
  }

  devolver(id: number) {
    if(confirm("¿Confirmar devolución?")) {
      alert(this.service.procesarDevolucion(id, new Date()));
    }
  }
}
