import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShopAppBeta';

  panelVisible = false;
  sidebarVisible = false;

  onToggle = ($event: boolean) => this.panelVisible = $event;
  onSidebarToggle = () => this.sidebarVisible = !this.sidebarVisible;

  getWidth() {
    const width = this.panelVisible ? 'ten wide column' : 'thirteen wide column';
    return width;
  }
}
