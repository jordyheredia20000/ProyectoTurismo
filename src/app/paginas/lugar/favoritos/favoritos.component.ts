import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritoService } from 'src/app/services/favorito.service';
import { LugarTuristicoService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent  implements OnInit {
  lista:any=[];
  usuario:any;

  constructor(private lugSer:LugarTuristicoService, private router:Router,private favSer:FavoritoService) { }

  ngOnInit() {
    if (localStorage.getItem("usuario")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario")!);
      console.log(this.usuario);
      this.favSer.listarFavoritosPorUsuario({id_usuario:this.usuario.id}).subscribe(
        data=>{
          if(data.length==0){

          }else{
            data.forEach((ele:any)=>{
              this.lugSer.obtenerLugarTuristicoPorID({id_lugar:ele.id_lugar_turistico}).subscribe(
                data=>{
                  this.lista.push(data[0]);
                }
              )
            })
          }
        }
      )
    } else {
      this.router.navigate(["/"]);
    }
  }

  cargarLugar(lu:any){
    localStorage.setItem("lugar", JSON.stringify(lu));
    this.router.navigate(["/lugares/detalle"]);
  }
}
