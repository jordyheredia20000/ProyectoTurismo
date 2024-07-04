import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { PermisoService } from 'src/app/services/permiso.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolesFormComponent } from '../../formularios/roles-form/roles-form.component';

@Component({
  selector: 'app-admin-roles',
  templateUrl: './admin-roles.component.html',
  styleUrls: ['./admin-roles.component.scss'],
})
export class AdminRolesComponent  implements OnInit {

  lista: any;
  usuario: any;
  editando = false;

  constructor(
    private usuService: UsuarioService,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private perServ: PermisoService,
    private rolSer:RolService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listar();
    if (localStorage.getItem("usuario")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario")!);
      console.log(this.usuario);
    } else {
      this.router.navigate(["/"]);
    }
  }

  listar() {
    this.rolSer.listarRoles().subscribe(
      data => {
        console.log(data);
        this.lista = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  async presentActionSheet(usu: any) {
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

  async presentAlertEliminar(usu: any) {
    let h = "Eliminando";
    let text = "Seguro desea eliminarlo";
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
          text: "Seguro",
          role: "confirm",
          handler: () => {
            val.eliminarUsuario(usu.id);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarUsuario(id: any) {
    this.perServ.listarPermisosPorRol({ id_rol: id }).subscribe(
      data => {
        console.log(data.length);
        if (data.length == 0) {
          this.usuService.listarUsuariosPorRol({ id_rol: id }).subscribe(
            data2=>{
              console.log(data2.length);
              if (data2.length == 0) {
                this.rolSer.eliminarRol({ id_rol: id }).subscribe(
                  data => {
                    this.presentAlert("Se ha eliminado", "Exito!");
                    this.listar();
                  },
                  error => {
                    this.presentAlert("Error", error.error.error);
                  }
                );
              }else{
                this.presentAlert("Hay usuarios con este rol, revoquelos", "Error");
              }
            }
          );
          
        } else {
          this.presentAlert("Esta rol tiene permisos, revoquelos", "Error");
        }
      }, error => {
        this.presentAlert(error.error, "Error");
      }
    )


  }

  async presentAlert(text: any, titulo: any) {
    const alert = await this.alertController.create({
      header: titulo,
      message: text,

      buttons: ['OK'],
    });

    await alert.present();
  }

  async abrirFormUsuario(usu: any) {
    let ti = "Crear Categoria";
    this.editando ? ti = "Editar Categoria" : "Crear Categoria";
    let modal;
    if (usu == "") {
      modal = await this.modalCtrl.create({
        component: RolesFormComponent,
        componentProps: {
          titulo: ti,
        }
      });
    } else {
      modal = await this.modalCtrl.create({
        component: RolesFormComponent,
        componentProps: {
          titulo: ti,
          itemToEdit: usu
        }
      });
    }

    await modal.present();

    modal.onDidDismiss().then(result => {
      if (result.data) {
        console.log(result.data);
        
      }
      this.listar();
    })

  }


}
