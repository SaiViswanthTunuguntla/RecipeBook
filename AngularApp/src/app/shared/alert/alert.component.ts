import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { AuthComponent } from 'src/app/auth/auth.component';
import {  } from 'events';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private auth:AuthComponent) { }
  @Input() message:string;
  @Output() close= new EventEmitter<void>();
  ngOnInit() {
  }
  onClose(){
    //this.auth.error=null;        or
    this.close.emit();
  }

}
