import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from 'src/app/date.adapter';

export interface Dependentes {
  nome: string;
  parentesco: string;
  rg: string;
  cpf: string;
  birth: string;
  sexo: string;
}

export const DD_MM_YYYY_Format = {
  parse: {
      dateInput: 'LL',
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-pecaoseu',
  templateUrl: './pecaoseu.component.html',
  styleUrls: ['./pecaoseu.component.scss'],
  providers: [{
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})
export class PecaoseuComponent implements OnInit {
  
  projetoDonator = false;

  dependenteType: string;
  dependenteNome: string;
  dependenteCPF: string;
  dependenteRG: string;
  dependenteBirthDate: string;
  dependenteSexo: string;

  loading = false;

  toggletext = 'Plano individual'
  toggle = false;

  dependentes: Dependentes[] = [];

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
  projectDonator: string = '';
  concordoComTermos: boolean = false;

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private db: AngularFirestore) {

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
      'number': '',
      'logradouro': [null, Validators.required],
      'bairro': [null, Validators.required],
      'cidade': [null, Validators.required],
      'email': [null, Validators.required],
      'telefoneFixo': '',
      'complemento': '',
      'telefoneCelular': [null, Validators.required],
      'isWhatsapp': '',
      'newsLetterAllowance': '',
      'donatorCheckBox': '',
      'familiar': '',
      'concordoComTermos': [null, Validators.required],
      'donatorInput': ''
    });

  }

  ngOnInit() {
  }

  sendForm(post) {
    
  }

  getErrorMessage() {
    
  }

  addDependente() {
    let item = {
      nome: this.dependenteNome,
      parentesco: this.dependenteType,
      rg: this.dependenteRG,
      cpf: this.dependenteCPF,
      birth: this.dependenteBirthDate,
      sexo: this.dependenteSexo
    }

    this.dependentes.push(item);

    this.clearDependentesInputs();
  }

  deleteDependente(item: Dependentes) {
    var index = this.dependentes.indexOf(item);
    console.log(index);
    if (index !== -1) {
      this.dependentes.splice(index, 1);
    }
  }

  clearDependentesInputs() {
    this.dependenteNome = null;
    this.dependenteType = null;
    this.dependenteRG = null;
    this.dependenteCPF = null;
    this.dependenteBirthDate = null;
    this.dependenteSexo = null;
  }

  sendToDataBase() {
    if (this.toggle) {
      //Plano familiar
      //this.getPaymentLinkFamiliar(this.mForm.get('email').value, this.mForm.get('cpf').value);
      this.http.post('https://ppvclube.appspot.com/subscribe/familiar', {'email': this.mForm.get('email').value, 'reference': this.mForm.get('cpf').value}).toPromise().then(object => {
        //object['init_point'];
        this.uploadInfo(object['init_point']);
      }).catch(error => {
        alert(error);
      });
    
    } else {
      //Plano individual
      //this.getPaymentLinkIndividual(this.mForm.get('email').value, this.mForm.get('cpf').value);
      this.http.post('https://ppvclube.appspot.com/subscribe/individual', {'email': this.mForm.get('email').value, 'reference': this.mForm.get('cpf').value}).toPromise().then(object => {
        //object['init_point'];
        this.uploadInfo(object['init_point']);
      }).catch(error => {
        alert(error);
      });
    }

    

  }

  uploadInfo(paymentLink:string) {
    if (paymentLink == null) {
      alert('Houve um erro ao gerar o pagamento, tente novamente mais tarde');
    } else {
      this.db.collection('cppvsign').add({
        'primeiroNome': this.mForm.get('primeiroNome').value,
        'sobrenome': this.mForm.get('sobrenome').value,
        'cpf': this.mForm.get('cpf').value,
        'rg': this.mForm.get('rg').value,
        'orgaoExpedidor': this.mForm.get('orgaoExpedidor').value,
        'grauDeInstrucao': this.mForm.get('grauDeInstituicao').value,
        'nomePai': this.mForm.get('nomePai').value,
        'nomeMae': this.mForm.get('nomeMae').value,
        'birthDate': this.mForm.get('birthDate').value,
        'sexo': this.mForm.get('sexo').value,
        'estadoCivil': this.mForm.get('estadoCivil').value,
        'cep': this.mForm.get('cep').value,
        'number': this.mForm.get('number').value,
        'logradouro': this.mForm.get('logradouro').value,
        'bairro': this.mForm.get('bairro').value,
        'cidade': this.mForm.get('cidade').value,
        'email': this.mForm.get('email').value,
        'telefoneFixo': this.mForm.get('telefoneFixo').value,
        'complemento': this.mForm.get('complemento').value,
        'telefoneCelular': this.mForm.get('telefoneCelular').value,
        'isWhatsapp': this.telefoneCelularEWhatsapp,
        'newsLetterAllowae': this.newsLetterAllowance,
        'donatorCheckBox': this.donatorCheckbox,
        'familiar': this.toggle,
        'projetoDoador': this.projectDonator,
        'pago': false,
        'linkPagamento': paymentLink,
        'dependentes': this.dependentes
      }).then(returnedfulfilled => {
        window.location.replace(paymentLink);
      }).catch(error => {
        alert(error);
      });
    }
  }

  getPaymentLinkFamiliar(emailin: string, cpfin: string): string {
    this.http.post('https://ppvclube.appspot.com/subscribe/familiar', {'email': emailin, 'reference': cpfin}).toPromise().then(object => {
      return object['init_point'];
    }).catch(error => {
      alert(error);
    });
    return null;
  }

  getPaymentLinkIndividual(emailin: string, cpfin: string): string {
    this.http.post('https://ppvclube.appspot.com/subscribe/individual', {'email': emailin, 'reference': cpfin}).toPromise().then(object => {
      return object['init_point'];
    }).catch(error => {
      alert(error);
    });
    return null;
  }

}
