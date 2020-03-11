import { Component, OnInit } from '@angular/core';
import { SqlService } from '../services/sql.service';
import { SqlResponse } from '../interface/sql-response';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sql: SqlService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  onAddNotice() {
    this.notificationService.changeMessage({
      title: 'Test Message',
      content: 'This is a test Message'
    });
  }
}
