import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ComentarioCalificacionService } from 'src/app/services/com-cal.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ImagenService } from 'src/app/services/imagenes.service';
import { TarifaService } from 'src/app/services/tarifa.service';
import { ComenFormularioComponent } from '../../formularios/comen-formulario/comen-formulario.component';
import { FavoritoService } from 'src/app/services/favorito.service';
import { PermisoService } from 'src/app/services/permiso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  lugar: any = {};
  categorias: any = [];
  imagenes: any = [{ path: "", descripcion: "" }];
  horarios: any = [];
  tarifas: any = [];
  periodos: any = [];
  comentarios: any = [];
  calificacion = 0;
  usuario: any;
  editando = false;
  isFavorito = false;

  constructor(private comCal: ComentarioCalificacionService,
    private imgSer: ImagenService,
    private tarSer: TarifaService,
    private horSer: HorarioService,
    private catSer: CategoriaService,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private perSer: PermisoService,
    private modalCtrl: ModalController,
    private favSer: FavoritoService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("lugar")) {
      this.lugar = JSON.parse(localStorage.getItem("lugar")!);
      this.catSer.listarCategoriasLugar({ id_lugar: this.lugar.id }).subscribe(
        data => {
          this.categorias = data;
          console.log(data);

        }, error => {
          console.log(error);

        }
      );
      this.imgSer.listarImagenesPorLugar({ id_lugar: this.lugar.id }).subscribe(
        data => {
          this.imagenes = data;
          console.log(data);

        }, error => {
          console.log(error);

        }
      )
      this.horSer.obtenerHorarioPorID({ id_horario: this.lugar.id_horario }).subscribe(
        data => {
          this.horarios = data;
          console.log(data);

        }, error => {
          console.log(error);

        }
      )
      this.tarSer.listarTarifasPorLugar({ id_lugar: this.lugar.id }).subscribe(
        data => {
          this.tarifas = data;
          console.log(data);

        }, error => {
          console.log(error);

        }
      )


      this.cargarComentarios();
    }
    if (localStorage.getItem("usuario")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario")!);
      console.log(this.usuario);
      this.favSer.listarFavoritosPorUsuario({ id_usuario: this.usuario.id }).subscribe(
        data => {
          if (data.length == 0) {

          } else {
            data.forEach((ele: any) => {
              if (ele.id_lugar_turistico == this.lugar.id) {
                this.isFavorito = true;
              }
            })
          }
        }
      )
    } else {
      this.router.navigate(["/"]);
    }
  }

  eliminarFavorito() {
    this.favSer.eliminarFavoritoPorID({ id_usuario: this.usuario.id, id_lugar: this.lugar.id }).subscribe(
      data => {
        console.log(data);
        this.isFavorito = false;

      }, error => {

      }
    )
  }

  agregarFavorito() {
    this.favSer.crearFavorito({ id_usuario: this.usuario.id, id_lugar_turistico: this.lugar.id }).subscribe(
      data => {
        console.log(data);
        this.isFavorito = true;

      }, error => {

      }
    )
  }
  cargarCalificacion() {
    let cal = 0;
    this.comentarios.forEach((element: any) => {


      cal = cal + element.calificacion;
    });
    if (this.comentarios.length > 0) {
      this.calificacion = cal / this.comentarios.length;
    } else {
      this.calificacion = 0;
    }

  }

  async presentActionSheet(usu: any) {
    let val = this;
    if (usu.id_usuario == this.usuario.id) {
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
    }else{
      this.perSer.listarPermisosPorRol({id_rol:this.usuario.id_rol}).subscribe(
        async data=>{
          let ing = false;
          data.forEach((element:any) => {
            if(element.id == 8){
              ing = true;
            }
          });
          if(ing){
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
                  text: 'Cancel',
                  role: 'cancel',
                  data: {
                    action: 'cancel',
                  },
                },
              ],
            });
            await actionSheet.present();
          }else{
          }
        },error=>{
  
        }
      )
    }

  }

  async abrirFormUsuario(usu: any) {
    let modal;

    this.perSer.listarPermisosPorRol({ id_rol: this.usuario.id_rol }).subscribe(
      async data =>  {
        let ing = false;
        data.forEach((element: any) => {
          if (element.id == 7) {
            ing = true;
          }
        });
        if (ing) {
          if (usu == "") {
            if (this.existeComentario()) {
              this.presentAlert("Solo puede dejar un comentario", "Ya comento");
            } else {
              modal = await this.modalCtrl.create({
                component: ComenFormularioComponent,
                componentProps: {
                  editando: false,
                }
              });
              await modal.present();

              modal.onDidDismiss().then(result => {
                this.cargarComentarios();
                if (result.data) {
                  console.log(result.data);
                  this.guardarComentario(result.data);
                }
              })
            }

          } else {
            this.editando = true;
            modal = await this.modalCtrl.create({
              component: ComenFormularioComponent,
              componentProps: {
                editando: true,
                itemToEdit: usu
              }
            });

            await modal.present();

            modal.onDidDismiss().then(result => {
              if (result.data) {
                console.log(result.data);
                this.guardarComentario(result.data);
              }
            })
          }
        } else {
          this.presentAlert("Este usuario no puede comnetar","Error");
        }
      }, error => {

      }
    )

  }

  existeComentario() {
    let val = false;
    this.comentarios.forEach((data: any) => {
      if (data.id_usuario == this.usuario.id) {
        val = true;
      }
    });
    console.log(val);

    return val;
  }

  async presentAlert(text: any, titulo: any) {
    const alert = await this.alertController.create({
      header: titulo,
      message: text,

      buttons: ['OK'],
    });

    await alert.present();
  }

  cargarComentarios() {
    this.comCal.listarComentariosCalificacionesPorLugar({ id_lugar_turistico: this.lugar.id }).subscribe(
      data => {
        this.comentarios = data;
        this.cargarCalificacion();
        console.log(data);

      }, error => {
        console.log(error);

      }
    );
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
            val.eliminarComnetario(usu.id);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarComnetario(usu: any) {
    console.log(usu);

    this.comCal.eliminarComentarioCalificacionPorID({ id: usu }).subscribe(
      data => {
        console.log(data);
        this.cargarComentarios();
        this.cargarCalificacion();
      },
      error => {
        console.log(error);

      }
    )
  }

  guardarComentario(data: any) {
    console.log(data);
    if (this.editando) {
      this.comCal.actualizarComentarioCalificacion(data).subscribe(
        data => {
          console.log(data);
          this.cargarComentarios();
          this.cargarCalificacion();
          this.editando = false;
        }
      )
    } else {
      data.id_usuario = this.usuario.id;
      data.id_lugar_turistico = this.lugar.id;
      this.comCal.insertarComentarioCalificacion(data).subscribe(
        data => {
          this.cargarComentarios();
          this.cargarCalificacion();
          this.editando = false;
          console.log(data);
        }
      )
    }
  }
}
