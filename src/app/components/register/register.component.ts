import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
email:string;
password:string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService

  ) { }

  ngOnInit() {
  }
onSubmit(){
  this.authService.register(this.email,this.password).
  then((res)=>{
    this.flashMessagesService.show('New User Registered!!',
    {cssClass:'alert-success', timeout: 5000});
   this.router.navigate(['/']);
  })
  .catch((err)=>{
    this.flashMessagesService.show(err.message,
    {cssClass:'alert-danger', timeout: 5000});
   this.router.navigate(['/register']);
  });
}
}
