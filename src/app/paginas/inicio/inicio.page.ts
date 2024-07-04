import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interface';
import { PermisoService } from 'src/app/services/permiso.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  usuario:any={};
  constructor( private menuCtrl: MenuController,
    private perSer: PermisoService, private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem("usuario")){
      this.usuario = JSON.parse(localStorage.getItem("usuario")!);
      console.log(this.usuario);
      
      this.validarPermisos(this.usuario);
    }else{
      this.router.navigate(["/inicio/login"]);
    }
  }
  mostrarMenu() {
    this.menuCtrl.open('first');
  }

  cerrarCesion(){
    localStorage.clear();
    window.location.reload();
  }

  validarPermisos(data:any){
    this.perSer.listarPermisosPorRol({id_rol:data.id_rol}).subscribe(
      data=>{
        let ing = false;
        data.forEach((element:any) => {
          if(element.id == 1){
            ing = true;
          }
        });
        if(ing){
          
        }else{
          this.router.navigate(["/inicio/page"]);
        }
      },error=>{

      }
    )
    
  }

  irInicioPage(){
    this.router.navigate(["/inicio/page"]);
  }
}
