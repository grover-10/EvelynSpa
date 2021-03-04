import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private statusBar: StatusBar) {
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByName('white');
    this.statusBar.styleDefault();
  }
}
