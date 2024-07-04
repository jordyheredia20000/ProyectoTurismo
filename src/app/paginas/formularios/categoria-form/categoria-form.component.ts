import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss'],
})
export class CategoriaFormComponent  implements OnInit {

   
  @Input() itemToEdit: any; 
  @Input() titulo:any;
  itemData: any = {};
  pass = "";
  roles:any;

  constructor(private modalController: ModalController,  private toastController: ToastController) {
  }


  ngOnInit(): void {
    if (this.itemToEdit) {
      this.itemData = { ...this.itemToEdit };
      this.pass = this.itemData.pass;
      console.log(this.itemToEdit);
      
    }else{
      console.log(this.itemToEdit);
      this.itemData = {
        nombre:"",
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


  async presentToast(men:string) {
    const toast = await this.toastController.create({
      message: men,
      duration: 2000,
      position: "bottom",
    });

    await toast.present();
  }


}
