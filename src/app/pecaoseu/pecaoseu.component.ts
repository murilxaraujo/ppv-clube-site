import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-pecaoseu',
  templateUrl: './pecaoseu.component.html',
  styleUrls: ['./pecaoseu.component.scss']
})
export class PecaoseuComponent implements OnInit {

  loading = false;

  post: any;
  mForm: FormGroup;
  primeiroNome: string = '';
  sobrenome: string = '';
  cpf: string = '';
  rg: string = '';
  orgaoExpedidor: string = '';
  grauDeInstituicao: string = '';
  nomePai: string = '';
  nomeMae: string = '';
  birthDate: string = '';
  sexo: string = '';
  estadoCivil: string = '';
  cep: string = '';
  logradouro: string = '';
  bairro: string = '';
  cidade: string = '';
  estado: string = 'Goiás';
  email: string = '';
  telefoneFixo: string = '';
  telefoneCelular: string = '';
  telefoneCelularEWhatsapp: boolean = false;
  newsLetterAllowance: boolean = false;
  donatorCheckbox: boolean = false;

  cities = [
    "Alexania",
    "Aparecida de Goiânia",
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

  constructor(private formBuilder: FormBuilder) {

    this.mForm = formBuilder.group({
      'primeiroNome': [null, Validators.required],
      'sobrenome': [null, Validators.required],
      'cpf': [null, Validators.compose([Validators.required, Validators.maxLength(11)])],
      'rg': [null, Validators.compose([Validators.required, Validators.maxLength(7)])],
      'orgaoExpedidor': [null, Validators.required],
      'grauDeInstituicao': [null, Validators.required],
      'nomePai': '',
      'nomeMae': '',
      'birthDate': [null, Validators.required],
      'sexo': [null, Validators.required],
      'estadoCivil': [null, Validators.required],
      'cep': [null, Validators.required],
      'logradouro': [null, Validators.required],
      'bairro': [null, Validators.required],
      'cidade': [null, Validators.required],
      'email': [null, Validators.required],
      'telefoneFixo': '',
      'telefoneCelular': [null, Validators.required],
      'isWhatsapp': '',
      'newsLetterAllowance': '',
      'donatorCheckBox': ''
    });

  }

  ngOnInit() {
  }

  sendForm(post) {

  }

  getErrorMessage() {
    
  }

}
