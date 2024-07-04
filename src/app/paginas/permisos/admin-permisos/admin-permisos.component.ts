import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { PermisoService } from 'src/app/services/permiso.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PermisosFormComponent } from '../../formularios/permisos-form/permisos-form.component';

@Component({
  selector: 'app-admin-permisos',
  templateUrl: './admin-permisos.component.html',
  styleUrls: ['./admin-permisos.component.scss'],
})
export class AdminPermisosComponent  implements OnInit {

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
    this.perServ.listarPermisos().subscribe(
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
    this.rolSer.listarRolesPorPermiso({ id_rol: id }).subscribe(
      data => {
        console.log(data.length);
        if (data.length == 0) {
          this.perServ.eliminarPermiso({ id_permiso: id }).subscribe(
            data => {
              this.presentAlert("Se ha eliminado", "Exito!");
              this.listar();
            },
            error => {
              this.presentAlert("Error", error.error.error);
            }
          );
        } else {
          this.presentAlert("Esta permiso esta siendo usado", "Error");
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
        component: PermisosFormComponent,
        componentProps: {
          titulo: ti,
        }
      });
    } else {
      modal = await this.modalCtrl.create({
        component: PermisosFormComponent,
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
        if (this.editando) {
          this.perServ.modificarPermiso(result.data).subscribe(
            data => {
              this.presentAlert("Permiso Editado", "Exito");
              this.listar();
            },
            error => {
              this.presentAlert(error.error.error, "Error");
            }
          );

        } else {
          this.perServ.insertarPermiso(result.data).subscribe(
            data => {
              this.presentAlert("Permiso Creado", "Exito");
              this.listar();
            },
            error => {
              this.presentAlert(error.error.error, "Error");
            }
          );

        }
      }
    })

  }



}
