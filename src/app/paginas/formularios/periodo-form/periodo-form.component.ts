import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-periodo-form',
  templateUrl: './periodo-form.component.html',
  styleUrls: ['./periodo-form.component.scss'],
})
export class PeriodoFormComponent  implements OnInit {

  
   
  @Input() itemToEdit: any; 
  @Input() titulo:any;
  itemData: any = {};
  roles:any;

  constructor(private modalController: ModalController,  private toastController: ToastController) {
  }


  ngOnInit(): void {
    if (this.itemToEdit) {
      this.itemData = { ...this.itemToEdit };
      console.log(this.itemToEdit);
      
    }else{
      console.log(this.itemToEdit);
      this.itemData = {
        contenido:"",
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
