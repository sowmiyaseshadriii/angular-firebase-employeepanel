import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Employee } from '../../model/Employee';
import {Router } from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {SettingsService} from '../../service/settings.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
 employee:Employee={
   firstName:'',
   lastName:'',
   email:'',
   phone:'',
   balance:0

 }
 disableBalanceOnAdd:boolean=true;
  constructor(
    public flashMessagesService: FlashMessagesService,
    public router:Router,
    public employeeService:EmployeeService,
    public settingsService:SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd=this.settingsService.getSettings().disableBalanceOnAdd;
  }



  onSubmit({value, valid}:{value:Employee, valid:boolean}){
  console.log(value);
  if(this.disableBalanceOnAdd){
    value.balance=0;
  }
    if(!valid){
     this.flashMessagesService.show('Please Fill the Fields',
      {cssClass:'alert-danger', timeout: 5000});
     this.router.navigate(['add-employee']);
    }else{
    
      this.employeeService.newEmployee(value);
      this.flashMessagesService.show('New Employee Added!!',
      {cssClass:'alert-success', timeout: 5000});
     this.router.navigate(['/']);
    }
  }
}
