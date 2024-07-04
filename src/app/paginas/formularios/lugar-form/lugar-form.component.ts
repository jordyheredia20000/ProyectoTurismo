import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ImagenService } from 'src/app/services/imagenes.service';
import { LugarTuristicoService } from 'src/app/services/lugar.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { TarifaService } from 'src/app/services/tarifa.service';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-lugar-form',
  templateUrl: './lugar-form.component.html',
  styleUrls: ['./lugar-form.component.scss'],
})
export class LugarFormComponent implements OnInit {


  @Input() itemToEdit: any;
  @Input() editando: any;
  itemData: any = {};
  ciudades = ['Cuenca', 'Gualaceo', 'Paute', 'Sígsig', 'Camilo Ponce Enríquez', 'Chordeleg','Guaranda', 'San Miguel', 'Caluma', 'Chillanes', 'Echeandía', 'Las Naves','Azogues', 'Biblián', 'Ríobamba', 'Deleg', 'La Troncal', 'Suscal','Tulcán', 'Espejo', 'Mira', 'Bolívar', 'Montúfar', 'San Gabriel','Riobamba', 'Guano', 'Alausí', 'Colta', 'Chambo', 'Guamote','Latacunga', 'La Maná', 'Pujilí', 'Saquisilí', 'Sigchos', 'Salcedo','Santa Rosa', 'El Guabo'];
  provincias = [
    'Azuay',
  'Bolívar',
  'Cañar',
  'Carchi',
  'Chimborazo',
  'Cotopaxi',
  'El Oro',
  'Esmeraldas',
  'Galápagos',
  'Guayas',
  'Imbabura',
  'Loja',
  'Los Ríos',
  'Manabí',
  'Morona Santiago',
  'Napo',
  'Orellana',
  'Pastaza',
  'Pichincha',
  'Santa Elena',
  'Santo Domingo de los Tsáchilas',
  'Sucumbíos',
  'Tungurahua',
  'Zamora Chinchipe'
  ];
  pass = "";
  roles: any;
  tarifas: any=[];
  imagenes: any =[];
  categorias: any;
  categoriasLugar: any = [];
  categoriasEliminadas: any = [];
  categoria: any = {};
  horario: any = {};
  periodos: any;
  tarifa: any = {};
  imagen: any = {};
  editImg = false;
  editTarifa = false;
  tarifasEliminadas: any = [];
  imagenesEliminadas: any = [];
  id_lugar = 0;
  id_horario = 0;


  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private lugS: LugarTuristicoService,
    private catS: CategoriaService,
    private tarSer: TarifaService,
    private imgSer: ImagenService,
    private horaSer: HorarioService,
    private periodoSer: PeriodoService,
  ) {
  }

  cargarTarifas() {
    this.tarSer.listarTarifasPorLugar({ id_lugar: this.itemToEdit.id }).subscribe(
      data => {
        this.tarifas = data;
        console.log(this.tarifas);
      },
      error => {
        this.presentToast(error.error.error);
      }
    )
  }


  ponerTarifa(tar: any) {
    this.tarifa = tar;
    this.editTarifa = true;
  }

  ponerImagen(img: any) {
    this.imagen = img;
    this.editImg = true;
  }

  cargarPeriodos() {
    this.periodoSer.listarPeriodos().subscribe(
      data => {
        this.periodos = data;
        console.log(this.periodos);
      },
      error => {
        this.presentToast(error.error.error);
      }
    )
  }

  cargarCategoriasPorLugar() {
    this.catS.listarCategoriasLugar({ id_lugar: this.itemToEdit.id }).subscribe(
      data => {
        this.categoriasLugar = data;
        console.log(this.categorias);
      },
      error => {
        this.presentToast(error.error.error);
      }
    )
  }

  agregarTarifa() {
    if (this.validarTarifa()) {
      if (this.editTarifa) {

        this.editarTarifa();
        this.tarifa = {
          id: "0", id_lugar: 1, precio_adulto: "", precio_menor: "", id_periodo: "", nombre: ""
        }
      } else {
        this.tarifas.push(this.tarifa);
        this.tarifa = {
          id: "0", id_lugar: this.itemData.id, precio_adulto: "", precio_menor: "", id_periodo: "", nombre: ""
        }
      }
    }
  }

  agregarImagen() {
    if (this.validarImagen()) {
      if (this.editImg) {
        this.editarImagen();
        this.imagen = {
          id: "0", id_lugar: this.itemData.id, path: "", descripcion: ""
        };
        this.editImg = false;
      } else {
        this.imagenes.push(this.imagen);
        this.imagen = {
          id: "0", id_lugar: this.itemData.id, path: "", descripcion: ""
        };
      }

    }
  }

  agregarCategoria() {
    if (this.validarCategoria()) {
      this.categoriasLugar.push(this.categoria);
    } else {
      this.presentToast("Categoria repetida");
    }
  }

  cargarCategorias() {
    this.catS.listarCategorias().subscribe(
      data => {
        this.categorias = data;
        console.log(this.categorias);
      },
      error => {
        this.presentToast(error.error.error);
      }
    )
  }

  cargarImagenes() {
    this.imgSer.listarImagenesPorLugar({ id_lugar: this.itemToEdit.id }).subscribe(
      data => {
        this.imagenes = data;
        console.log(this.imagenes);
      },
      error => {
        this.presentToast(error.error.error);
      }
    )
  }

  cargarHorario() {
    this.horaSer.obtenerHorarioPorID({ id_horario: this.itemToEdit.id_horario }).subscribe(
      data => {
        this.horario = data[0];
        console.log(this.horario);
      },
      error => {
        this.presentToast(error.error.error);
      }
    )
  }

  ngOnInit(): void {
    if (this.itemToEdit) {
      this.itemData = { ...this.itemToEdit };
      this.pass = this.itemData.pass;
      this.cargarCategorias();
      this.cargarCategoriasPorLugar();
      this.cargarImagenes();
      this.cargarTarifas();
      this.cargarHorario();
      this.cargarPeriodos();
      console.log(this.itemToEdit);
    } else {
      console.log(this.itemToEdit);
      this.cargarCategorias();
      this.cargarPeriodos();
      this.itemData = {
        nombre:"", descripcion:"", id_horario:"1", direccion:"", ciudad:"", provincia:"", pais:"", latitud:"", longitud:"", telefono:"", sitio_web:"", capacidad_maxima:""
      }
    }
    this.tarifa = {
      id: "0", id_lugar: this.itemData.id, precio_adulto: "", precio_menor: "", id_periodo: "", nombre: ""
    }
    this.imagen = {
      id: "0", id_lugar: this.itemData.id, path: "", descripcion: ""
    }
    this.categoria = {
      id: "1", nombre: ""
    }
    this.horario = {
      id: 2, dia_apertura: "", dia_cierre: "", hora_apertura: "", hora_cierre: ""
    }
    console.log(this.imagen);
  }

  saveItem() {
    if (this.validar()) {
      console.log(this.itemData);
      console.log(this.categoriasLugar);
      console.log(this.categoriasEliminadas);
      console.log(this.imagenes);
      console.log(this.imagenesEliminadas);
      console.log(this.tarifas);
      console.log(this.tarifasEliminadas);
      console.log(this.horario);
      this.saveHorario();
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  saveLugar() {
    if (this.editando) {
      this.lugS.modificarLugarTuristico(this.itemData).subscribe(
        data => {
          this.presentToast("Exito Lugar");
          this.saveIMagenes();
          this.saveTarifa();
              this.saveCategorias();
        },
        error => {
          this.presentToast(error.error.error);
        }
      )
    } else {
      this.itemData.id_horario = this.id_horario;
      this.lugS.insertarLugarTuristico(this.itemData).subscribe(
        data => {
          this.presentToast("Exito");
          this.lugS.buscarLugar({ nombre: this.itemData.nombre }).subscribe(
            data => {
              this.id_lugar = data[0].id;
              this.saveIMagenes();
              this.saveTarifa();
              this.saveCategorias();
            },
            error => {
              console.log(error);

            }
          )
        },
        error => {
          this.presentToast(error.error.error);
        }
      )
    }
  }

  saveCategorias() {
    if(this.editando){
      this.categoriasEliminadas.forEach((cat: any) => {
        this.lugS.desasociarCategoriaDeLugarTuristico({ id_lugar: this.itemData.id, id_categoria: cat.id }).subscribe(
          data => {
            this.presentToast("Exito");
          },
          error => {
            this.presentToast(error.error.error);
          }
        )
      })
      this.categoriasLugar.forEach((cat: any) => {
        this.lugS.asociarCategoriaALugarTuristico({ id_lugar: this.itemData.id, id_categoria: cat.id }).subscribe(
          data => {
            this.presentToast("Exito");
          },
          error => {
            this.presentToast(error.error.error);
          }
        )
      })
    }else{
      this.categoriasLugar.forEach((cat: any) => {
        console.log(this.id_lugar,cat.id);
     
        this.lugS.asociarCategoriaALugarTuristico({ id_lugar: this.id_lugar, id_categoria: cat.id }).subscribe(
          data => {
            this.presentToast("Exito");
          },
          error => {
            this.presentToast(error.error.error);
          }
        )
      })
    }
    this.modalController.dismiss();
  }

  saveIMagenes() {
    if (this.editando) {
      this.imagenesEliminadas.forEach((cat: any) => {
        this.imgSer.eliminarImagenPorID({ id_imagen: cat.id }).subscribe(
          data => {
            this.presentToast("Exito");
          },
          error => {
            this.presentToast(error.error.error);
          }
        )
      });
      this.imagenes.forEach((cat: any) => {
        this.imgSer.obtenerImagenPorID({ id_imagen: cat.id }).subscribe(
          data => {
            console.log(cat);
            if (data.length == 0) {
              this.imgSer.insertarImagen(
                {
                  descripcion: cat.descripcion, id_lugar: this.itemData.id, path: cat.path
                }
              ).subscribe(
                data => {

                }, error => {
                  console.log(error);

                }
              )
            } else {
              this.imgSer.actualizarImagen(
                {
                  descripcion: cat.descripcion, id_lugar: this.itemData.id, path: cat.path, id: cat.id
                }
              ).subscribe(
                data => {

                }, error => {
                  console.log(error);

                }
              )
            }
          },
          error => {
            this.presentToast(error.error.error);
          }
        )
      });
    } else {
      this.imagenes.forEach((cat: any) => {
        this.imgSer.insertarImagen(
          {
            descripcion: cat.descripcion, id_lugar: this.id_lugar, path: cat.path
          }
        ).subscribe(
          data => {

          }, error => {
            console.log(error);

          }
        )
      });
    }
  }



  saveTarifa() {
    if (this.editando) {
      this.tarifasEliminadas.forEach((cat: any) => {
        this.tarSer.eliminarTarifaPorID({ id_tarifa: cat.id }).subscribe(
          data => {
          },
          error => {
            this.presentToast(error.error.error);
          }
        )
      });
      this.tarifas.forEach((cat: any) => {
        this.tarSer.obtenerTarifaPorID({ id_tarifa: cat.id }).subscribe(
          data => {
            console.log(cat);
            if (data.length == 0) {
              this.tarSer.insertarTarifa(
                {
                  id_lugar: this.itemData.id, precio_adulto: cat.precio_adulto, precio_menor: cat.precio_menor, id_periodo: cat.id_periodo, nombre: cat.nombre
                }
              ).subscribe(
                data => {
                }, error => {
                  console.log(error);

                }
              )
            } else {
              this.tarSer.actualizarTarifa(
                {
                  id: cat.id, id_lugar: this.itemData.id, precio_adulto: cat.precio_adulto, precio_menor: cat.precio_menor, id_periodo: cat.id_periodo, nombre: cat.nombre
                }
              ).subscribe(
                data => {

                }, error => {
                  console.log(error);

                }
              )
            }
          },
          error => {
            this.presentToast(error.error.error);
          }
        )
      });
    } else {
      this.tarifas.forEach((cat: any) => {
        this.tarSer.insertarTarifa(
          {
            id_lugar: this.id_lugar, precio_adulto: cat.precio_adulto, precio_menor: cat.precio_menor, id_periodo: cat.id_periodo, nombre: cat.nombre
          }
        ).subscribe(
          data => {

          }, error => {
            console.log(error);

          }
        )
      });
    }

    
  }
  saveHorario() {
    if (this.editando) {
      this.horaSer.actualizarHorario(this.horario).subscribe(
        data => {
          this.presentToast("Exito Horario");
          this.saveLugar();
        },
        error => {
          this.presentToast(error.error.error);
        }
      )
    } else {
      this.horaSer.insertarHorario(this.horario).subscribe(
        data => {
          this.presentToast("Exito");
          this.horaSer.obtenerUltimo().subscribe(
            data => {
              this.id_horario = data[0].id;
              this.saveLugar();
            },
            error => {
              console.log(error);
            }
          )
        },
        error => {
          this.presentToast(error.error.error);
        }
      )
    }
  }

  validar() {
    const claves = Object.keys(this.itemData);
    for (const clave of claves) {
      const valor = this.itemData[clave];
      console.log(clave + ": " + valor);
      if ((valor + "").length == 0) {
        this.presentToast("Campos vacios");
        return false;
      }
    }
    const claves2 = Object.keys(this.horario);
    for (const clave of claves2) {
      const valor = this.horario[clave];
      console.log(clave + ": " + valor);
      if ((valor + "").length == 0) {
        this.presentToast("Campos vacios");
        return false;
      }
    }
    if (!this.validarHora()) return false;
    if (this.categoriasLugar.length == 0) {
      this.presentToast("Debe agregar almenos una categoria");
      return false;
    }
    if (this.imagenes.length == 0) {
      this.presentToast("Debe agregar almenos una imagen");
      return false;
    }
    if (this.tarifas.length == 0) {
      this.presentToast("Debe agregar almenos una tarifa");
      return false;
    }
    return true;
  }

  validarHora() {
    const formatoHora = /^([01]\d|2[0-3]):([0-5]\d)$/;
    // Comprobamos si la cadena coincide con el formato
    console.log("Apertura:" + formatoHora.test(this.horario.hora_apertura));
    console.log("Cierre:" + formatoHora.test(this.horario.hora_cierre));

    if (formatoHora.test(this.horario.hora_apertura)) {

    } else {
      this.presentToast("LA hora de apertura no es correcta");
      return false; // La hora no tiene el formato correcto
    }

    if (formatoHora.test(this.horario.hora_cierre)) {
      return true; // La hora tiene el formato correcto
    } else {
      this.presentToast("LA hora de cierre no es correcta");
      return false; // La hora no tiene el formato correcto
    }
  }

  validarTarifa() {
    const claves = Object.keys(this.tarifa);
    for (const clave of claves) {
      const valor = this.tarifa[clave];
      console.log(clave + ": " + valor);
      if ((valor + "").length == 0) {
        this.presentToast("Campos vacios");
        return false;
      }
    }
    return true;
  }

  validarCategoria() {
    const claves = Object.keys(this.categoria);
    for (const clave of claves) {
      const valor = this.categoria[clave];
      console.log(clave + ": " + valor);
      if ((valor + "").length == 0) {
        this.presentToast("Campos vacios");
        return false;
      }
    }
    let v = true;
    this.categoriasLugar.forEach((objeto: any) => {
      if (objeto.id === this.categoria.id) {
        console.log("Econtrado");
        v = false;
      }
    });
    return v;
  }

  validarImagen() {
    console.log(this.imagen);

    const claves = Object.keys(this.imagen);
    for (const clave of claves) {
      const valor = this.imagen[clave];
      console.log(clave + ": " + valor);
      if ((valor + "").length == 0) {
        this.presentToast("Campos vacios");
        return false;
      }
    }
    return true;
  }

  async presentToast(men: string) {
    const toast = await this.toastController.create({
      message: men,
      duration: 2000,
      position: "bottom",
    });

    await toast.present();
  }

  editarImagen() {
    let i = -1;
    for (let index = 0; index < this.imagenes.length; index++) {
      const element = this.imagenes[index];
      if (element.id === this.imagen.id) {
        console.log("Econtrado");
        i = index;
      }
    }
    this.imagenes[i] = this.imagen;
  }

  editarTarifa() {
    let i = -1;
    for (let index = 0; index < this.tarifas.length; index++) {
      const element = this.tarifas[index];
      if (element.id === this.tarifa.id) {
        console.log("Econtrado");
        i = index;
      }
    }
    this.tarifas[i] = this.tarifa;
  }

  eliminarImagen() {
    let i = -1;
    for (let index = 0; index < this.imagenes.length; index++) {
      const element = this.imagenes[index];
      if (element.id === this.imagen.id) {
        console.log("Econtrado");
        i = index;
      }
    }
    this.imagenesEliminadas.push(this.imagenes[i]);
    this.imagenes.splice(i, 1);
    this.imagen = {
      id: "0", id_lugar: this.itemData.id, path: "", descripcion: ""
    };
    this.editImg = false;
  }

  eliminarTarifa() {
    let i = -1;
    for (let index = 0; index < this.tarifas.length; index++) {
      const element = this.tarifas[index];
      if (element.id === this.tarifa.id) {
        console.log("Econtrado");
        i = index;
      }
    }
    this.tarifasEliminadas.push(this.tarifas[i]);
    this.tarifas.splice(i, 1);
    this.tarifa = {
      id: "0", id_lugar: this.itemData.id, precio_adulto: "", precio_menor: "", id_periodo: "", nombre: ""
    }
    this.editTarifa = false;
  }

  eliminarCategoria(cat: any) {
    let i = -1;
    for (let index = 0; index < this.categoriasLugar.length; index++) {
      const element = this.categoriasLugar[index];
      if (element.id === cat.id) {
        console.log("Econtrado");
        i = index;
      }
    }
    this.categoriasEliminadas.push(this.categoriasLugar[i]);
    this.categoriasLugar.splice(i, 1);

  }




}
