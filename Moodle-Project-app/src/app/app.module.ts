import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Components are importet so you can they can be linked inside other components and inside component.html 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './users/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderTComponent } from './header/header-t/header-t.component';
import { HomeTComponent } from './home/home-t/home-t.component';
import { AuthGuard } from './users/guards/auth.guard';
import { RoleGuard } from './users/guards/role.guard';
import { HomeAComponent } from './home/home-a/home-a.component';
import { HeaderAComponent } from './header/header-a/header-a.component';
import {StudentComponent} from './users/CRUD/users.component'
import { FormComponent } from './users/CRUD/form.component';
import { DetailComponent } from './users/CRUD/photo/detail/detail.component';
import { pagerComponent } from './users/CRUD/pager/pager.component';
import { StudentService } from './service/student.service';


import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

registerLocaleData(localeES, 'es');

// Path is used to give the path a certain name, or protect certain path throu Guards, AuthGuard is a general guard while RoleGuard will circle through roles and assign a certain path depending the role
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  } , // login page
  { path: 'Student', component: HomeComponent }, //Student 'home page' only accessed by a role 'Student'
  { path: 'Admin', component: HomeAComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} }, //Admin 'home page' only accessed by a role 'Admin',
  { path: 'Teacher', component: HomeTComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_TEACHER'} }, //Teacher 'home page' only accessed by a role 'Teacher'
  {path: 'CRUD', component: FormComponent}, //Form where all the users are created and deleted, Redirects to List
  {path: 'List', component: StudentComponent}, //ReadAll of the users, redirects to CRUD
  {path: 'List/:id', component: StudentComponent} //ReadAll of the users, redirects to CRUD
  
];

// 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    HeaderTComponent,
    HomeTComponent,
    HomeAComponent,
    HeaderAComponent,
    StudentComponent,
    FormComponent,
    DetailComponent,
    pagerComponent

    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [StudentService, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
