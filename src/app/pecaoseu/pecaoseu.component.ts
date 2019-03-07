import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-pecaoseu',
  templateUrl: './pecaoseu.component.html',
  styleUrls: ['./pecaoseu.component.scss']
})
export class PecaoseuComponent implements OnInit {

  loading = false;
  email = new FormControl('email', [Validators.required, Validators.email]);

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
  //Alexania, APdegyn

  constructor() { }

  ngOnInit() {
  }

  

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

}
