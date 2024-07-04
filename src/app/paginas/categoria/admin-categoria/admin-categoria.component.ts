import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioFormComponent } from '../../formularios/usuario-form/usuario-form.component';
import { CategoriaFormComponent } from '../../formularios/categoria-form/categoria-form.component';
import { LugarTuristicoService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-admin-categoria',
  templateUrl: './admin-categoria.component.html',
  styleUrls: ['./admin-categoria.component.scss'],
})
export class AdminCategoriaComponent implements OnInit {
  listaCategorias: any;
  usuario: any;
  editando = false;

  constructor(
    private usuService: UsuarioService,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private catSer: CategoriaService,
    private lugSer: LugarTuristicoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listarCategorias();
    if (localStorage.getItem("usuario")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario")!);
      console.log(this.usuario);
    } else {
      this.router.navigate(["/"]);
    }
  }

  listarCategorias() {
    this.catSer.listarCategorias().subscribe(
      data => {
        console.log(data);
        this.listaCategorias = data;
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
    if (usu.id == this.usuario.id) {
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
    this.lugSer.listarLugaresTuristicosPorCategoria({ id_categoria: id }).subscribe(
      data => {
        console.log(data.length);

        if (data.length == 0) {
          this.catSer.eliminarCategoriaPorID({ id_categoria: id }).subscribe(
            data => {
              this.presentAlert("Se ha eliminado", "Exito!");
              this.listarCategorias();
            },
            error => {
              this.presentAlert("Error", error.error.error);
            }
          );
        } else {
          this.presentAlert("Esta categoria esta siendo usada", "Error");
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
        component: CategoriaFormComponent,
        componentProps: {
          titulo: ti,
        }
      });
    } else {
      modal = await this.modalCtrl.create({
        component: CategoriaFormComponent,
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
          this.catSer.modificarCategoria(result.data).subscribe(
            data => {
              this.presentAlert("Categoria Editada", "Exito");
              this.listarCategorias();
            },
            error => {
              this.presentAlert(error.error.error, "Error");
            }
          );

        } else {
          this.catSer.insertarCategoria(result.data).subscribe(
            data => {
              this.presentAlert("Usuario Creado", "Exito");
              this.listarCategorias();
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
