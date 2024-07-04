import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioFormComponent } from '../../formularios/usuario-form/usuario-form.component';
import { HorarioService } from 'src/app/services/horario.service';
import { LugarTuristicoService } from 'src/app/services/lugar.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ImagenService } from 'src/app/services/imagenes.service';
import { TarifaService } from 'src/app/services/tarifa.service';
import { ComentarioCalificacionService } from 'src/app/services/com-cal.service';
import { FavoritoService } from 'src/app/services/favorito.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent  implements OnInit {
  listaUsuarios:any;
  usuario:any;
  editando= false;

  constructor(
    private usuService: UsuarioService,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private modalCtrl: ModalController, 
    private favSer:FavoritoService,
    private comServ:ComentarioCalificacionService,
    private router:Router
  ) { }

  ngOnInit() {
    this.listarUsuarios();
    if(localStorage.getItem("usuario")){
      this.usuario=JSON.parse(localStorage.getItem("usuario")!);
      console.log(this.usuario);
    }else{
      this.router.navigate(["/"]);
    }
  }

  listarUsuarios(){
    this.usuService.listarUsuarios().subscribe(
      data=>{
        console.log(data);
        this.listaUsuarios= data;
      },
      error=>{
        console.log(error);
      }
    );
  }

  async presentActionSheet(usu:any) {
    let val = this;
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Acciones',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler() {
            val.presentAlertEliminar(usu);
          },
        },
        {
          text: 'Editar',
          data: {
            action: 'share',
          },
          handler() {
            val.editando = true;
            val.abrirFormUsuario(usu);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async presentAlertEliminar(usu:any) {
    let h = "Eliminando";
    let text = "Seguro desea eliminarlo";
    if(usu.id == this.usuario.id){
      h = "Es su cuenta";
      text = "Desea eliminar su cuenta";
    }
    let val = this;
    const alert = await this.alertController.create({
      header: h,
      message: text,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text:"Seguro",
          role:"confirm",
          handler: () => {
            val.eliminarUsuario(usu.id);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarUsuario(id:any){
    this.comServ.listarComentariosCalificacionesPorUsuario({id_usuario:id}).subscribe(
      data1=>{
        data1.forEach((el:any)=>{
          this.comServ.eliminarComentarioCalificacionPorID({id:el.id}).subscribe(data=>{},error=>console.log(error)
           )
        });
        this.favSer.listarFavoritosPorUsuario({id_usuario:id}).subscribe(
          data2=>{
            console.log(data2);
            
            data2.forEach((el:any)=>{
              this.favSer.eliminarFavoritoPorID({id_usuario:el.id_usuario, id_lugar:el.id_lugar_turistico}).subscribe(data=>{},error=>console.log(error)
               )
            });
            setTimeout(()=>{
              this.usuService.eliminarUsuario({id_usuario:id}).subscribe(
                data3=>{
                  this.presentAlert("Se ha eliminado","Exito!");
                  this.listarUsuarios();
                },
                error=>{
                  this.presentAlert("Error",error.error.error);
                }
              );
            },1000);
            
          },err=>{
            console.log(err);
            
          }
        )
      },error=>{
        console.log(error);
        
      }
    )
    
  }

  async presentAlert(text:any,titulo:any) {
    const alert = await this.alertController.create({
      header: titulo,
      message: text,
      
      buttons: ['OK'],
    });

    await alert.present();
  }

  async abrirFormUsuario(usu:any) {
    let ti = "Crear usuario";
    this.editando? ti = "Editar Usuario":"Crear usuario";
    let modal;
    if(usu == ""){
      modal = await this.modalCtrl.create({
        component: UsuarioFormComponent,
        componentProps: {
          titulo:ti,
        }
      });
    }else{
     modal = await this.modalCtrl.create({
        component: UsuarioFormComponent,
        componentProps: {
          titulo:ti,
          itemToEdit: usu
        }
      });
    }
    
    await modal.present();

    modal.onDidDismiss().then(result =>{
      if(result.data){
        console.log(result.data);
        if(this.editando){
          this.usuService.modificarUsuario(result.data).subscribe(
            data=>{
              this.presentAlert("Usuario Editado","Exito");
              this.listarUsuarios();
            },
            error =>{
              this.presentAlert(error.error.error,"Error");
            }
          );

        }else{
          this.usuService.crearUsuario(result.data).subscribe(
            data=>{
              this.presentAlert("Usuario Creado","Exito");
              this.listarUsuarios();
            },
            error =>{
              this.presentAlert(error.error.error,"Error");
            }
          );
          
        }
      }
    })

}


}
