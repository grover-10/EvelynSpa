import { Component,ViewChild } from '@angular/core';
import {Router} from '@Angular/router'


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router:Router) {}



  irNuevaCita(){
    this.router.navigate(['nuevaCita']);
  }


}
