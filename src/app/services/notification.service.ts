import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../interface/message';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private messageSource = new BehaviorSubject({title: 'Welcome', content: 'Welcome to Maharaja Shop App'});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(someMessage: Message) {
    this.messageSource.next(someMessage);
  }
}
