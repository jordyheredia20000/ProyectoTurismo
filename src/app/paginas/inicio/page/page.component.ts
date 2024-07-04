import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { LugarTuristicoService } from 'src/app/services/lugar.service';
import { PermisoService } from 'src/app/services/permiso.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent  implements OnInit {
  usuario:any={};
  lista:any=[];
  categorias:any =[];
  isAdmin = false;

  constructor(private perSer:PermisoService, private router:Router, private alertController:AlertController,private  lugSer:LugarTuristicoService, private catser:CategoriaService) { }

  ngOnInit() {
    this.listarLugares();
    this.listarCategorias();
    if(localStorage.getItem("usuario")){
      this.usuario=JSON.parse(localStorage.getItem("usuario")!);
      this.validarPermisos(this.usuario);
    }else{
      this.router.navigate(["/"]);
    }
  }

  validarPermisos(usu:any){
    this.perSer.listarPermisosPorRol({id_rol:usu.id_rol}).subscribe(
      data=>{
        let ing = false;
        data.forEach((element:any) => {
          if(element.id == 1){
            ing = true;
          }
        });
        console.log(usu);
        console.log(data);
        
        if(ing){
          
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
      },error=>{

      }
    )
    
  }

  irInicioPage(){
    this.router.navigate(["/inicio/page"]);
  }
  irAdministrar(){
    this.router.navigate(["/inicio/admin"]);
  }
  
  async presentAlert(text:any,titulo:any) {
    const alert = await this.alertController.create({
      header: titulo,
      message: text,
      
      buttons: ['OK'],
    });

    await alert.present();
  }

  listarLugares(){
    this.lugSer.listarLugaresTuristicos().subscribe(
      data=>{
        console.log(data);
        this.lista= data;
      },
      error=>{
        console.log(error);
      }
    );
  }

  listarCategorias(){
    this.catser.listarCategorias().subscribe(
      data=>{
        console.log(data);
        this.categorias= data;
      },
      error=>{
        console.log(error);
      }
    );
  }

  cerrarCesion(){
    localStorage.clear();
    window.location.reload();
  }

  filtrarLista(pro:any){
    this.lugSer.listarLugaresTuristicosPorCategoria({id_categoria:pro.id}).subscribe(
      data =>{
        console.log(data);
        
        this.lista = data;
      },
      error=>{
        console.log(error);
        
      }
    )
  }

  cargarLugar(lu:any){
    localStorage.setItem("lugar", JSON.stringify(lu));
    this.router.navigate(["/lugares/detalle"]);
  }

  irAFavoritos(){
    this.router.navigate(["/lugares/fav"]);
  }

  irAChat(){
    this.router.navigate(["/usuarios/chat"]);
  }
}
