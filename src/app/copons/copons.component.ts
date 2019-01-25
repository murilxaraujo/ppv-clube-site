import { Component, OnInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as _ from 'lodash';
import { splitNamespace } from '@angular/core/src/view/util';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';

export interface Parceiro {
  title: string;
  desc: string;
  cidade: string;
  estado: string;
  cat: string;
  tel: string;
  addr: string;
  type: string[];
}

@Component({
  selector: 'app-copons',
  templateUrl: './copons.component.html',
  styleUrls: ['./copons.component.scss']
})

export class CoponsComponent implements OnInit {

  parceirosCol: AngularFirestoreCollection<Parceiro>;
  parceiros: Observable<Parceiro[]>;

  selectedCity = '';
  selectedCat = '';

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {

  }

  change() {
    console.log("changed");
    
  }

  query() {
    if (this.selectedCity == '' || this.selectedCat == '') {
            
    } else {
      this.parceirosCol = this.db.collection("parceiros", ref => ref.where('cidade', '==', this.selectedCity).where('cat', '==', this.selectedCat).where("ativo", "==", true).orderBy('title'));
      this.parceiros = this.parceirosCol.valueChanges();
    }
    
  }

}
