import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//MyComponents
import { AppComponent } from './app.component';
import { FooterComponent } from './MyComponents/Footer/footer/footer.component';
import { HeaderComponent } from './MyComponents/Header/header/header.component';
import { HomeAdminComponent } from './MyComponents/Home/home-admin/home-admin.component';
import { HomeStudentComponent } from './MyComponents/Home/home-student/home-student.component';
import { HomeTeacherComponent } from './MyComponents/Home/home-teacher/home-teacher.component';
import { NavAdminComponent } from './MyComponents/Navbar/nav-admin/nav-admin.component';
import { NavStudentComponent } from './MyComponents/Navbar/nav-student/nav-student.component';
import { NavTeacherComponent } from './MyComponents/Navbar/nav-teacher/nav-teacher.component';
import { LoginComponent } from './MyComponents/Logins/login/login.component';
import { ForgotPasswordComponent } from './MyComponents/Logins/forgot-password/forgot-password.component';
import { RegisterComponent } from './MyComponents/Logins/register/register.component';
import { ServiceService } from './Services/services.service';
import { AuthGuard } from './MyComponents/Users/functions/guards/auth.guards';
import { RoleGuard } from './MyComponents/Users/functions/guards/role.guard';
import { AllusersComponent } from './MyComponents/Users/crud/allusers/allusers.component';
import { FormComponent } from './MyComponents/Users/crud/creat-form/form.component';
import { pagerComponent } from './MyComponents/Users/detail/pager/pager.component';
import { DetailComponent } from './MyComponents/Users/detail/photo-detail/detail.component';


//Routers and Stuff
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

registerLocaleData(localeES, 'es');


// Path is used to give the path a certain name, or protect certain path throu Guards, AuthGuard is a general guard while RoleGuard will circle through roles and assign a certain path depending the role
const routes: Routes = [
  //LOGIN
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  } , // login page
  { path: 'register', component: RegisterComponent }, //Register page to singup with your email
  { path: 'password', component: ForgotPasswordComponent }, //Reset your password
  //HOMES
  { path: 'Admin', component: HomeAdminComponent  } , // Admi's home page only accessed by ROLE_ADMIN
  { path: 'Student', component: HomeStudentComponent  } , // Studen's home page only accessed by ROLE_STUDENT
  { path: 'Teacher', component: HomeTeacherComponent  } , //Teacher's home page only accessed by ROLE_TEACHER
  //CRUDS
  { path: 'CRUD', component: FormComponent}, //Form where all the users are created and deleted, Redirects to List
  { path: 'List', component: AllusersComponent} //ReadAll of the users, redirects to CRUD
  
];


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeAdminComponent,
    HomeStudentComponent,
    HomeTeacherComponent,
    NavAdminComponent,
    NavStudentComponent,
    NavTeacherComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    AllusersComponent,
    FormComponent,
    pagerComponent,
    DetailComponent,
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ServiceService,, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
