import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LugarTuristicoService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent  implements OnInit {
  valor = "";
  lista:any = [];
  lugares:any=[];
  provincia = "";
  ciudad = "";
  ciudades = ['Cuenca', 'Gualaceo', 'Paute', 'Sígsig', 'Camilo Ponce Enríquez', 'Chordeleg','Guaranda', 'San Miguel', 'Caluma', 'Chillanes', 'Echeandía', 'Las Naves','Azogues', 'Biblián', 'Ríobamba', 'Deleg', 'La Troncal', 'Suscal','Tulcán', 'Espejo', 'Mira', 'Bolívar', 'Montúfar', 'San Gabriel','Riobamba', 'Guano', 'Alausí', 'Colta', 'Chambo', 'Guamote','Latacunga', 'La Maná', 'Pujilí', 'Saquisilí', 'Sigchos', 'Salcedo','Santa Rosa'];
  provincias = [
    'Azuay',
  'Bolívar',
  'Cañar',
  'Carchi',
  'Chimborazo',
  'Cotopaxi',
  'El Oro',
  'Esmeraldas',
  'Galápagos',
  'Guayas',
  'Imbabura',
  'Loja',
  'Los Ríos',
  'Manabí',
  'Morona Santiago',
  'Napo',
  'Orellana',
  'Pastaza',
  'Pichincha',
  'Santa Elena',
  'Santo Domingo de los Tsáchilas',
  'Sucumbíos',
  'Tungurahua',
  'Zamora Chinchipe'
  ];

  constructor(private router:Router, private lugSer:LugarTuristicoService) { }

  ngOnInit() {
    this.lugSer.listarLugaresTuristicos().subscribe(
      data=>{
        this.lugares = data;
      }
    )
  }

  cargarLugar(lu:any){
    localStorage.setItem("lugar", JSON.stringify(lu));
    this.router.navigate(["/lugares/detalle"]);
  }

  buscarTexto(){
    this.lugSer.buscarLugar({nombre:this.valor}).subscribe(
      data=>{
        this.lista = data;
      }, error=>{
        console.log(error);
        
      }
    )
  }

  buscarCiudad(){
    let lis:any = [];
    this.lugares.forEach((data:any)=>{
      console.log(data);
      if(data.ciudad.trim() == this.ciudad.trim()){
        
        lis.push(data);
      }
    });
    this.lista = lis;
  }

  buscarProvincia(){
    let lis:any = [];
    this.lugares.forEach((data:any)=>{
      console.log(data.provincia.trim() === this.provincia.trim());
      if(data.provincia.trim() === this.provincia.trim()){
        lis.push(data);
      }
    });
    this.lista = lis;
  }

}
