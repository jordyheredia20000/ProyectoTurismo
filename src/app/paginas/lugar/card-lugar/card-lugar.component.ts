import { Component, Input, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/services/imagenes.service';
import { LugarTuristicoService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-card-lugar',
  templateUrl: './card-lugar.component.html',
  styleUrls: ['./card-lugar.component.scss'],
})
export class CardLugarComponent  implements OnInit {
  @Input() lugar:any = {};
  imagenes:any;

  constructor(private imgService:ImagenService, private lugService:LugarTuristicoService) { }

  ngOnInit() {
    if(this.lugar){
      this.lugService.obtenerLugarTuristicoPorID({id_lugar:this.lugar.id}).subscribe(
        data=>{
          console.log(data); 
          this.lugar = data[0];
          this.cargarImagenes();         
        },
        error=>{
          console.log(error);      
        }
      )
    }
  }

  cargarImagenes(){
    this.imgService.listarImagenesPorLugar({id_lugar:this.lugar.id}).subscribe(
      data=>{
        this.imagenes = data;
        console.log(this.imagenes);
        
      },
      error=>{
        console.log(error);
      }
    )
  }

}
