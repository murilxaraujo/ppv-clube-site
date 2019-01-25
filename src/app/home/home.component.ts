import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {OwlCarousel} from 'ngx-owl-carousel';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel

  cities = [
    "Bela Vista de Goiás",
    "Caldas Novas",
    "Cristianópolis",
    "Goiânia",
    "Ipameri",
    "Morrinhos",
    "Piracanjuba",
    "Pontalina",
    "Professor Jamil"
  ]

  email: string = "";
  name: string = "";
  telephone: string = "";
  sending: string = "Erro";
  selected: string = "";
  disabled = false;

  constructor(private db: AngularFirestore) {

  }

  ngOnInit() {
    
  }

  sendToCloud() {
    if (this.email == "" || this.name == "" || this.telephone == "" || this.selected == "") {
      window.alert("Recarregue a página e preencha todos os campos corretamente");
    } else {
      this.sending = "Enviando..."
      this.db.collection("form").add({
        "nome": this.email,
        "phone": this.telephone,
        "email": this.email,
        "cidade": this.selected
      }).catch().then(promisse => {
        this.sending = "Enviado";
      });
    }
    
  }

}

