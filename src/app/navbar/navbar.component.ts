import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {

  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetMenu);
  }

}

@Component({
  selector: 'bottom-sheet-menu',
  templateUrl: 'bottom-sheet-menu.html',
})
export class BottomSheetMenu {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetMenu>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
