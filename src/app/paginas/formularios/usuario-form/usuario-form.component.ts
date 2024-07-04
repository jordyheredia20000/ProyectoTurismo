import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent  implements OnInit {

  
  @Input() itemToEdit: any; 
  @Input() titulo:any;
  itemData: any = {};
  pass = "";
  roles:any;

  constructor(private modalController: ModalController,  private toastController: ToastController,private rolService:RolService) {
  }

  cargarRoles(){
    this.rolService.listarRoles().subscribe(
      data=>{
        this.roles=data;
        console.log(this.roles);
      },
      error=>{
        this.presentToast(error.error.error);
      }
    )
  }
  ngOnInit(): void {
    if (this.itemToEdit) {
      this.itemData = { ...this.itemToEdit };
      this.pass = this.itemData.pass;
      this.cargarRoles();
      console.log(this.itemToEdit);
      
    }else{
      console.log(this.itemToEdit);
      this.itemData = {
        nombre_Completo:"",
        correo:"",
        pass:"",
        id_rol: 2,
        fecha_nacimiento:"2022-01-03"
      }
    }
  }

  saveItem() {
    if(this.validar()){
      this.modalController.dismiss(this.itemData);
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  validar(){
    const claves = Object.keys(this.itemData);
    for (const clave of claves) {
      const valor = this.itemData[clave];
      console.log(clave+": "+valor);      
      if(valor+"".length == 0){
        this.presentToast("Campos vacios");
        return false;
      }
    }
    if(this.pass == ""){
      this.presentToast("Faltan datos");
      return false;
    }else{
      if(this.pass != this.itemData.pass){
        this.presentToast("Contraseñas no coinciden");
        return false;
      }
    }
    return this.validarCorreo(this.itemData.correo);
  }

  validarCorreo(correo:string) {
    // Expresión regular para validar correos electrónicos
    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(!expresionRegular.test(correo)){
      this.presentToast("Correo sin el formato correcto");
    }
    // Usamos el método test de la expresión regular para verificar si el correo es válido
    return expresionRegular.test(correo);
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
