import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { PeriodoService } from 'src/app/services/periodo.service';
import { TarifaService } from 'src/app/services/tarifa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PeriodoFormComponent } from '../../formularios/periodo-form/periodo-form.component';

@Component({
  selector: 'app-admin-periodos',
  templateUrl: './admin-periodos.component.html',
  styleUrls: ['./admin-periodos.component.scss'],
})
export class AdminPeriodosComponent  implements OnInit {

  listaPeridos: any;
  usuario: any;
  editando = false;

  constructor(
    private usuService: UsuarioService,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private perServ: PeriodoService,
    private tarSer:TarifaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listarPeriodos();
    if (localStorage.getItem("usuario")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario")!);
      console.log(this.usuario);
    } else {
      this.router.navigate(["/"]);
    }
  }

  listarPeriodos() {
    this.perServ.listarPeriodos().subscribe(
      data => {
        console.log(data);
        this.listaPeridos = data;
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
    this.tarSer.listarTarifasPorPeriodo({ id_periodo: id }).subscribe(
      data => {
        console.log(data.length);

        if (data.length == 0) {
          this.perServ.eliminarPeriodoPorID({ id_periodo: id }).subscribe(
            data => {
              this.presentAlert("Se ha eliminado", "Exito!");
              this.listarPeriodos();
            },
            error => {
              this.presentAlert("Error", error.error.error);
            }
          );
        } else {
          this.presentAlert("Este periodo esta siendo usado", "Error");
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
        component: PeriodoFormComponent,
        componentProps: {
          titulo: ti,
        }
      });
    } else {
      modal = await this.modalCtrl.create({
        component: PeriodoFormComponent,
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
          this.perServ.actualizarPeriodo(result.data).subscribe(
            data => {
              this.presentAlert("Periodo Editado", "Exito");
              this.listarPeriodos();
            },
            error => {
              this.presentAlert(error.error.error, "Error");
            }
          );

        } else {
          this.perServ.insertarPeriodo(result.data).subscribe(
            data => {
              this.presentAlert("Periodo Creado", "Exito");
              this.listarPeriodos();
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
