import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import 'rxjs/add/operator/map';
import {SettingsService} from '../../service/settings.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isLoggedIn: boolean;
loggedInUser:string;
showRegister:boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
          this.isLoggedIn=true;
          this.loggedInUser=auth.email;
      }
      else{
         this.isLoggedIn=false;
      }
      this.showRegister=this.settingsService.getSettings().allowRegistration;
    });
  }
  onLogOut(){
    this.authService.logout();
    this.flashMessagesService.show('You are Logged Out!!',
    {cssClass:'alert-success', timeout: 5000});
   this.router.navigate(['/login']);
  }
}
