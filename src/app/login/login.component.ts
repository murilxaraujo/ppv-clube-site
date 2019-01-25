import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router'
import { promisify, log } from 'util';
import { User } from 'firebase';
import { Usern } from './user';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatStepper } from '@angular/material';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  error: any;
  loginemail: string = "";
  loginpassword: string = "";

  signupcpf: string = "";
  signupemail: string = "";
  signuppassword: string = "";

  userName: string = "";
  cardN: string = "";
  cpfloaded: boolean = false;

  public userarray = [];

  @ViewChild('stepper') private myStepper: MatStepper;


  constructor(public afAuth: AngularFireAuth, public router: Router, public snackBar: MatSnackBar, private http: HttpClient, private db: AngularFirestore) {
      afAuth.authState.subscribe(user => {
        if (user) {
          router.navigate(['profile']);
        }
      });
   }

  ngOnInit() {
    this.doSomething();
  }

  login() {
    document.getElementById('progressbar').style.display = "block";
    if (this.loginemail.length == 0 || this.loginpassword.length == 0) {
      this.openSnackBar("Você precisa preencher todos os campos para entrar");
      document.getElementById('progressbar').style.display = "none";
    } else {
      this.afAuth.auth.signInWithEmailAndPassword(this.loginemail, this.loginpassword)
        .then(function(user) {
          console.log("user signed in successfully");
          document.getElementById('progressbar').style.display = "none";
        })
        .catch(function(error) {
          document.getElementById('progressbar').style.display = "none";
          alert(error);
        });
    }
  }

  validarCPF() {
    this.loadingBarOn();
    if (this.signupcpf.length != 11) {
      this.openSnackBar("Você precisa preencher o campo de CPF corretamente")
      this.loadingBarOff();
    } else {
      this.http.get<Usern[]>("https://us-central1-ppvclube.cloudfunctions.net/userbycpft?cpf="+this.signupcpf).subscribe(data => {
        this.userarray = data;

        if (this.userarray.length == 1) {
          console.log(this.userarray[0].NOME);
          this.userName = this.userarray[0].NOME;
          this.cardN = this.userarray[0].CARTAO;
          this.cpfloaded = true;
          this.goForward(this.myStepper);
          this.loadingBarOff();

        } else {
          this.loadingBarOff();
          console.log("Usuário não encontrado");
          this.openSnackBar("CPF não encontrado");
        }
      });
      
    }
  }

  abrirConta() {
    if (this.signupcpf.length != 11 || this.cpfloaded == false) {
      this.openSnackBar("Houve um erro, recarregue a página e tente novamente");
    } else if (this.signupemail.length == 0 || this.signuppassword.length == 0) {
      this.openSnackBar("Você precisa preencher todos os campos para prosseguir");
    } else {
      this.loadingBarOn();
      this.afAuth.auth.createUserWithEmailAndPassword(this.signupemail, this.signuppassword).then(user => {
        console.log("user created successfully");
        
        this.db.collection("users").doc(user.user.uid).set({
          "uid": user.user.uid,
          "cpf": this.signupcpf,
          "card": this.cardN
        }).then(promisse => {
          console.log("document written successfully on the database");
          this.loginSuccess(user);
          this.goForward(this.myStepper);
          this.router.navigate(['profile']);
        }).catch(error => {
          console.log("Houve um erro ao escrever os dados no db");
          alert(error);
          this.loadingBarOff();
        });
      }).catch(error => {
        console.log("Houve um erro ao criar o usuário");
        alert(error)
        this.loadingBarOff();
      });
    }
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }

  loginError(erro: any) {
    this.loadingBarOff();
    this.openSnackBar("Houve um erro: " + erro.description);
  }

  loginSuccess(user: firebase.auth.UserCredential) {
    this.router.navigate(['profile']);
  }

  openSnackBar(text: string) {
    this.snackBar.open(text, null, {duration: 2000});
  }

  loadingBarOn() {
    document.getElementById('progressbar').style.display = "block";
  }

  loadingBarOff() {
    document.getElementById('progressbar').style.display = "none";
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async doSomething() {
    const user = await this.isLoggedIn()
    if (user) {
      console.log("user is logged in");
      this.router.navigate(['profile']);
    } else {
      console.log("user aint logged in");
      this.router.navigate(['login']);
    }
  }
}
