import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email:string;
password:string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  
  onSubmit(){
    this.authService.login(this.email,this.password)
    .then((res)=>{
      this._flashMessagesService.show('You are Logged In!!',
      {cssClass:'alert-success', timeout: 5000});
     this.router.navigate(['/']);
    })
    .catch((err)=>{
      this._flashMessagesService.show(err.message,
      {cssClass:'alert-danger', timeout: 5000});
     this.router.navigate(['/login']);
    })
  }


}
