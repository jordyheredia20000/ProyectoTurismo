import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { LugarTuristicoService } from 'src/app/services/lugar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LugarFormComponent } from '../../formularios/lugar-form/lugar-form.component';
import { HorarioService } from 'src/app/services/horario.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ImagenService } from 'src/app/services/imagenes.service';
import { TarifaService } from 'src/app/services/tarifa.service';
import { ComentarioCalificacionService } from 'src/app/services/com-cal.service';
import { FavoritoService } from 'src/app/services/favorito.service';

@Component({
  selector: 'app-admin-lugar',
  templateUrl: './admin-lugar.component.html',
  styleUrls: ['./admin-lugar.component.scss'],
})
export class AdminLugarComponent  implements OnInit {

  listaLugares:any;
  usuario:any;
  editando= false;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private modalCtrl: ModalController, 
    private router:Router,
    private horServ:HorarioService,
    private lugSer:LugarTuristicoService,
    private catSer:CategoriaService,
    private imgSrv:ImagenService,
    private tarSer:TarifaService,
    private comCalSer: ComentarioCalificacionService,
    private favSer:FavoritoService,
  ) { }

  ngOnInit() {
    this.listarLugares();
    if(localStorage.getItem("usuario")){
      this.usuario=JSON.parse(localStorage.getItem("usuario")!);
      console.log(this.usuario);
    }else{
      this.router.navigate(["/"]);
    }
  }

  listarLugares(){
    this.lugSer.listarLugaresTuristicos().subscribe(
      data=>{
        console.log(data);
        this.listaLugares= data;
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
    let lug = {};
    this.lugSer.obtenerLugarTuristicoPorID({id_lugar:id}).subscribe(
      data =>{
        lug = data[0];
        console.log(lug);
        this.eliminarFavoritos(lug);
        this.eliminarComentar(lug);
        this.eliminarCategorias(lug);
        this.eliminarImagenes(lug);
        
       
        this.eliminarHorario(lug);
      },error=>{
        this.presentAlert("Error",error.error.error);
      }
    )
    
  }

  eliminarFavoritos(lug:any){
    this.favSer.eliminarFavoritoPorIDLugar({id_lugar:lug.id}).subscribe(
      data=>{

      },error=>{
        console.log(error);
        
      }
    )
  }

  eliminarComentar(lug:any){
    this.comCalSer.eliminarComentarioCalificacionPorIDLugar({id_lugar:lug.id}).subscribe(
      data=>{

      },error=>{
        console.log(error);
        
      }
    )
  }

  eliminarLugar(lug:any){
    this.lugSer.eliminarLugarTuristico({id_lugar:lug.id}).subscribe(
      data=>{
        this.listarLugares();
      },error=>{
        console.log(error);
      }
    )
  }

  eliminarHorario(lug:any){
    this.horServ.eliminarHorarioPorID({id_horario:lug.id_horario}).subscribe(
      data=>{
        this.presentAlert("Se elimino el horario","Horario")
      },
      error=>{
        console.log(error);
      }
    )
  }

  eliminarImagenes(lug:any){
    this.imgSrv.listarImagenesPorLugar({id_lugar:lug.id}).subscribe(
      data=>{
        console.log(data);
        data.forEach((element:any) => {
          this.imgSrv.eliminarImagenPorID({id_imagen:element.id}).subscribe(
            data=>{

            }, error=>{
              console.log(error);
            }
          )
        });
        this.eliminarTarifas(lug);
      },
      error=>{
        console.log(error);
      }
    )
  }

  eliminarTarifas(lug:any){
    this.tarSer.listarTarifasPorLugar({id_lugar:lug.id}).subscribe(
      data=>{
        console.log(data);
        data.forEach((element:any) => {
          this.tarSer.eliminarTarifaPorID({id_tarifa:element.id}).subscribe(
            data=>{

            }, error=>{
              console.log(error);
            }
          )
        });
        this.eliminarLugar(lug);
      },
      error=>{
        console.log(error);
      }
    )
  }

  eliminarCategorias(lug:any){
    this.catSer.listarCategoriasLugar({id_lugar:lug.id}).subscribe(
      data=>{
        console.log(data);
        data.forEach((element:any) => {
          this.lugSer.desasociarCategoriaDeLugarTuristico({id_lugar:lug.id, id_categoria:element.id} ).subscribe(
            data=>{

            }, error=>{
              console.log(error);
              
            }
          )
        });
        this.presentAlert("Eliminado correctamente","Exito");
        this.listarLugares();
      },
      error=>{
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
        component: LugarFormComponent,
        componentProps: {
          editando:false,
        }
      });
    }else{
     modal = await this.modalCtrl.create({
        component: LugarFormComponent,
        componentProps: {
          editando: true,
          itemToEdit: usu
        }
      });
    }
    
    await modal.present();

    modal.onDidDismiss().then(result =>{
      this.listarLugares();
      if(result.data){
        console.log(result.data);
        this.presentAlert("Se ha registrado los cambios","Exito");
        
      }
    })

}

}
