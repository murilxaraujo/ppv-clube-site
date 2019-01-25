import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { first } from 'rxjs/operators';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Usern } from '../login/user';
import { Payment } from '../profile/payment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userarray = [];
  public payments = [];
  nome: string = "";
  card: string = "";
  cpf: string = "";
  ativo: number = 0;
  loaded: boolean = false;
  status: string = "";
  penpayment: boolean = false;
  paymentsloaded: boolean = false;


  constructor(public afAuth: AngularFireAuth, public router: Router, private db: AngularFirestore, private http: HttpClient){

  }

  ngOnInit() {
    this.doSomething();
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
 
  async doSomething() {
    const user = await this.isLoggedIn()
    if (user) {
      console.log("user is logged in");
      this.populateView();
    } else {
      console.log("user aint logged in");
      this.router.navigate(['login']);
    }
  }

  populateView() {
    console.log("Getting user document");
    
    this.db.collection("users").doc(this.afAuth.auth.currentUser.uid).get().toPromise().then(snapshot => {
      if (!snapshot.exists) {
        console.log("User document does not exist");
      } else {
        this.http.get<Usern[]>("https://us-central1-ppvclube.cloudfunctions.net/userbycpft?cpf="+snapshot.get("cpf")).subscribe(data => {
          this.userarray = data;
          if (this.userarray.length != 1) {
            console.log("CPF não encontrado");
          } else {
            this.nome = this.userarray[0].NOME;
            this.card = this.userarray[0].CARTAO;
            this.cpf = this.userarray[0].CPF;
            this.ativo = this.userarray[0].ATIVO
            if (this.ativo == 1) {
              this.status = "Regular"
            } else {
              this.status = "Suspenso"
            }
            this.loaded = true;

            this.http.get<Payment[]>("https://us-central1-ppvclube.cloudfunctions.net/pendentebyid?id="+this.userarray[0].ID).subscribe(data => {
              this.payments = data;  

              if (this.payments.length == 0) {
                
              } else {
                this.penpayment = true; 
              }
              this.paymentsloaded = true;
            })
          }
        });
      }
    }).catch(error => {
      console.log("Error getting the user document");
      
    });
  }

  logoff() {
    this.afAuth.auth.signOut().then(fulfilled => {
      this.router.navigate(['login']);
    }).catch(err => {

    });
  }

}
