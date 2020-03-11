import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter<boolean>();
  title = 'Maharaja Computers';
  panelVisible = true;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onTogglePanel() {
    this.panelVisible = !this.panelVisible;
    console.log('Event Emitted', this.panelVisible)
    this.eventEmitter.emit(this.panelVisible);
  }

}
