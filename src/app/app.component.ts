import { Component } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { scan } from 'rxjs/operators';
import { Message } from './chat.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
    formValue: string;


  messages: Observable<Message[]>;

  constructor(public chat: ChatService, private fb: FormBuilder) { }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable().pipe(
        scan((acc, val) => acc.concat(val)));
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
    
  }
}
