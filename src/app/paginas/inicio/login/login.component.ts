import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalController, ToastController } from '@ionic/angular';
import { UsuarioFormComponent } from '../../formularios/usuario-form/usuario-form.component';
import { Route, Router } from '@angular/router';
import { TarifaService } from 'src/app/services/tarifa.service';
import { PermisoService } from 'src/app/services/permiso.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  datosUsuario: any;
  error: any;
  constructor(
    private usuService: UsuarioService, 
    private toastController: ToastController,
    private perSer:PermisoService,
    private modalCtrl: ModalController, 
    private router:Router,
    ) { }

  ngOnInit() {
    this.datosUsuario = {
      username: "",
      password: ""
    }
    this.error = "";
    
    if(localStorage.getItem("usuario")){
      let u = JSON.parse(localStorage.getItem("usuario")!);
      this.validarPermisos(u);
      
    }

    
  }

  async ingresar() {
    if (this.validar()) {
      await this.usuService.login(this.datosUsuario).subscribe(
        data => {
          console.log(data);
          localStorage.setItem("usuario",JSON.stringify(data));
          this.validarPermisos(data);
        }, 
        error => {
          this.error = error.error.error;
          this.presentToast(this.error);
        });
    }else{
      this.presentToast(this.error);
    }
  }

  validarPermisos(data:any){
    this.perSer.listarPermisosPorRol({id_rol:data.id_rol}).subscribe(
      data=>{
        let ing = false;
        let adm = false;
        data.forEach((element:any) => {
          if(element.id == 3){
            ing = true;
          }
          if(element.id == 1){
            adm = true;
          }
        });
        if(ing){
          adm?this.router.navigate(['inicio/admin']):this.router.navigate(['inicio/page']);
        }else{
          this.presentToast("Este usuario tiene restringido el acceso");
        }
      },error=>{

      }
    )
    
  }

  async presentToast(men:string) {
    const toast = await this.toastController.create({
      message: men,
      duration: 2000,
      position: "bottom",
    });

    await toast.present();
  }

  async presentarAlerta() {

      const modal = await this.modalCtrl.create({
        component: UsuarioFormComponent,
        componentProps: {
          titulo:"Crear usuario"
        }
      });
      await modal.present();
  
      modal.onDidDismiss().then(result =>{
        if(result.data){
          console.log(result.data);
          this.usuService.crearUsuario(result.data).subscribe(
            data=>{
              this.presentToast("Usuario Creado");
            },
            error =>{
              this.presentToast(error.error.error);
            }
          );
        }
      })

  }

  validar() {
    console.log(this.datosUsuario);
    if (this.datosUsuario.username == "") {
      this.error = "No ha ingresado el correo";
      return false;
    }

    if (this.datosUsuario.username == "") {
      this.error = "No ha ingresado la contraseña";
      return false;
    }

    return true;
  }
}
