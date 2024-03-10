import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type MessageType={type:'success'|'error',message:string}|null;

@Injectable({
  providedIn: 'root'
})



export class MessageService {

  constructor() { }

  private messageSubject=new BehaviorSubject<MessageType>(null);

  public setMessage(message:MessageType){
    this.messageSubject.next(message);
  }

  public getMessage(){
    return this.messageSubject.asObservable();
  }

}
