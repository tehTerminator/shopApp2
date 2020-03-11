import { Component, OnInit } from '@angular/core';
import { Message } from '../interface/message';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  private messageQueue: Array<Message> = [];
  private readonly MAX_MESSAGE_COUNT = 20;
  get messages(): Array<Message> {
    return this.messageQueue;
  }

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.currentMessage
    .subscribe((newMessage: Message) => this.appendMessage(newMessage));
  }

  appendMessage( theMessage: Message ) {
    theMessage.timestamp = new Date();
    if ( this.messageQueue.length < this.MAX_MESSAGE_COUNT ) {
      this.messageQueue.unshift(theMessage);
    } else {
      this.messageQueue.splice(this.MAX_MESSAGE_COUNT - 1, 1);
      this.appendMessage(theMessage);
    }
  }
}
