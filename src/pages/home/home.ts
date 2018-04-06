import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PackageComponent } from "../../components/package/package";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
}
