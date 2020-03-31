import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output() calculatorPanel = new EventEmitter<boolean>();
  @Output() voucherPanel = new EventEmitter<number>();

  title = 'Maharaja Computers';
  panelVisible = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onTogglePanel() {
    this.panelVisible = !this.panelVisible;
    this.calculatorPanel.emit(this.panelVisible);
  }

  onToggleVoucherPane() {
    this.voucherPanel.emit(0);
    return;
  }

}
