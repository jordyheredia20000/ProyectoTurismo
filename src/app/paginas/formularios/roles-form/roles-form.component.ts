import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PermisoService } from 'src/app/services/permiso.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss'],
})
export class RolesFormComponent  implements OnInit {

   
  @Input() itemToEdit: any; 
  @Input() titulo:any;
  itemData: any = {};
  pass = "";
  roles:any;
  permisos:any=[];
  permisosEliminados:any=[];
  permisosDisponibles:any=[];
  permiso:any={ id:1, nombre:""};

  constructor(private modalController: ModalController,  private toastController: ToastController, private perSer:PermisoService, private rolSer:RolService) {
  }


  ngOnInit(): void {
    if (this.itemToEdit) {
      this.itemData = { ...this.itemToEdit };
      this.pass = this.itemData.pass;
      console.log(this.itemToEdit);
      this.cargarPermisos();
      
    }else{
      console.log(this.itemToEdit);
      this.itemData = {
        nombre:"",
      }
      
    }
    this.cargarPermisosDisponibles();
  }

  cargarPermisos(){
    this.perSer.listarPermisosPorRol({id_rol:this.itemData.id}).subscribe(
      data=>{
        console.log(data);
        this.permisos = data;
      },error=>{

      }
    )
  }

  agregarPermiso(){
    if(this.validarPermiso()){
      this.permisos.push(this.permiso);
      this.permiso = {
        id: "",nombre:""
      };
    }
  }

  cargarPermisosDisponibles(){
    this.perSer.listarPermisos().subscribe(
      data=>{
        console.log(data);
        
        this.permisosDisponibles = data;
      },error=>{

      }
    )
  }

  saveItem() {
    if(this.validar()){
      if(this.itemToEdit){
        this.rolSer.modificarRol(this.itemData).subscribe(
          data => {
            this.presentToast("Rol Editado",);
            this.editarPermisos();
          },
          error => {
            this.presentToast(error.error.error,);
          }
        );
        this.modalController.dismiss(this.itemData);
      }else{
        this.rolSer.insertarRol(this.itemData).subscribe(
          data => {
            this.presentToast("Permiso Creado");
            this.rolSer.listarUltimoRol().subscribe(
              data =>{
                console.log(data);
                this.guardarPermisos(data[0]);
              }
            )
            
          },
          error => {
            this.presentToast(error.error.error);
          }
        );

        
      }
      
    }
  }
  editarPermisos(){
    console.log(this.permisosEliminados);
    
    this.permisosEliminados.forEach((dato:any)=>{
      this.perSer.revocarPermiso({id_rol:this.itemData.id, id_permiso:dato.id}).subscribe(
        data=>{
        },error=>{
          console.log(error);
        }
      );
    });
    this.guardarPermisos(this.itemData);
  }

  guardarPermisos(data:any){
    console.log(data);
    console.log(this.permisos);
    this.permisos.forEach((dato:any)=>{
      this.perSer.asignarPermiso({id_rol:data.id, id_permiso:dato.id}).subscribe(
        data=>{

        },error=>{
          console.log(error);
          
        }
      );
    });
    this.modalController.dismiss(this.itemData);
  }


  eliminarPermiso(per:any){
    let i = -1;
    for (let index = 0; index < this.permisos.length; index++) {
      const element = this.permisos[index];
      if (element.id === per.id) {
        console.log("Econtrado");
        i = index;
      }
    }
    this.permisos.splice(i, 1);
    this.permiso = {
      id: "",nombre:""
    };
    this.permisosEliminados.push(per);
  }
  cancel() {
    this.modalController.dismiss();
  }

  validar(){
    console.log(this.itemData);
    
    const claves = Object.keys(this.itemData);
    for (const clave of claves) {
      const valor = this.itemData[clave];
      console.log(clave+": "+valor);      
      if((valor+"").length == 0){
        this.presentToast("Campos vacios");
        return false;
      }
    }
    return true;
  }

  validarPermiso(){
    console.log(this.permiso);
    
    const claves = Object.keys(this.permiso);
    for (const clave of claves) {
      const valor = this.permiso[clave];
      console.log(clave+": "+valor);      
      if((valor+"").length == 0){
        this.presentToast("Campos vacios");
        return false;
      }
    }
    let v = true;
    this.permisos.forEach((objeto: any) => {
      if (objeto.id === this.permiso.id) {
        this.presentToast("Permiso ya asignado");
        v = false;
      }
    });
    return v;
  }


  async presentToast(men:string) {
    const toast = await this.toastController.create({
      message: men,
      duration: 2000,
      position: "bottom",
    });

    await toast.present();
  }


}
