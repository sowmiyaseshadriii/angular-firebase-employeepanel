import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CanActivate,RouterModule, Routes} from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
 import { HttpModule } from '@angular/http';

import { AngularFireModule} from 'angularfire2'; 
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import {AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { EmployeeService } from './service/employee.service';
import { AuthService } from './service/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {RegisterGuard} from './guards/register.guard';
import { SettingsService } from './service/settings.service';
import { SettingsComponent } from './components/settings/settings.component';
const appRoutes: Routes=[
  {
    path:'',
    component:DashboardComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate: [RegisterGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'add-employee',
    component:AddEmployeeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'employees/:id',
    component: EmployeeDetailsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'edit-employee/:id',
    component: EditEmployeeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'settings',
    component:SettingsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    component:PageNotFoundComponent,
  
  }
];

export const firebaseConfig={
  apiKey: "AIzaSyA35baIAK3P53He9lI8SkQ6qjQyOV2N_1k",
  authDomain: "employeepanel-a2e50.firebaseapp.com",
  databaseURL: "https://employeepanel-a2e50.firebaseio.com",
  storageBucket: "employeepanel-a2e50.appspot.com",
  messagingSenderId: "682852465442"
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    SettingsComponent,
    
  ],
  imports: [
   
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
     RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    EmployeeService,
    AuthService,
    AuthGuard,
    SettingsService,
    RegisterGuard
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
