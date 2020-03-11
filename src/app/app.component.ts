import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShopAppBeta';

  panelVisible = true;

  onToggle($event: boolean) {
    console.log('Event Captured', $event);
    this.panelVisible = $event;
  }

  getWidth() {
    const width = this.panelVisible ? 'ten wide column' : 'thirteen wide column';
    return width;
  }
}
