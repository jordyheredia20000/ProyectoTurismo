import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-usuario',
  templateUrl: './chat-usuario.component.html',
  styleUrls: ['./chat-usuario.component.scss'],
})
export class ChatUsuarioComponent implements OnInit {
  usuario:any;
  mensajes: any = [
  ];
  enviados: any = [];
  nuevoMensaje: any;
  idSesion = "";
  @ViewChild(IonContent) content:any;

  constructor(private serice: ChatService, private router:Router) {
    
   }

  ngOnInit() {
    if(localStorage.getItem("usuario")){
      this.usuario=JSON.parse(localStorage.getItem("usuario")!);
      console.log(this.usuario);
    }else{
      this.router.navigate(["/"]);
    }
  }

  comprobarTecla(event:any){
    console.log(`Tecla: ${event}` );
    
    if(event.key === "Enter") {
      this.enviarMensaje(); 
    }
  }
  enviarMensaje() {
    let men = {
      usuario: this.usuario.nombre_Completo,
      texto: this.nuevoMensaje,
      fotoPerfil: "https://c1.klipartz.com/pngpicture/823/765/sticker-png-login-icon-system-administrator-user-user-profile-icon-design-avatar-face-head.png",
      fecha: Date.now(),
      tipo:"user"
    };
    this.mensajes.push(men);
    this.content.scrollToBottom(300);
    
    if (this.idSesion == "") {
      let enviar = {
        textoUsuario: this.nuevoMensaje,
      };
      this.nuevoMensaje = "";
      this.serice.chatear(enviar).subscribe(
        data => {
          let men = {
            usuario: "Asistente virtual",
            texto: data.respuesta,
            fotoPerfil: "https://www.shutterstock.com/image-vector/chatbot-icon-concept-chat-bot-600nw-2132342911.jpg",
            fecha: Date.now(),
            tipo:"chat"
          };
          this.mensajes.push(men);
          this.idSesion = data.id;
          
          this.content.scrollToBottom(300);
        },
        error => {
          console.log(error);

        }
      );
    } else {
      let enviar = {
        "textoUsuario": this.nuevoMensaje,
        "idSesion": this.idSesion
      };
      this.nuevoMensaje = "";
      this.serice.chatear(enviar).subscribe(
        data => {
          let men = {
            usuario: "Asistente virtual",
            texto: data.respuesta,
            fotoPerfil: "https://www.shutterstock.com/image-vector/chatbot-icon-concept-chat-bot-600nw-2132342911.jpg",
            fecha: Date.now(),
            tipo:"chat"
          };
          this.mensajes.push(men);
          this.idSesion = data.id;
          this.content.scrollToBottom(300);
        },
        error => {
          console.log(error);

        }
      );
    }
  }

}
