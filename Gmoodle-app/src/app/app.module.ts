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
import { AllCoursesComponent } from './MyComponents/Courses/crud/allcourses/allcourses.component';
import { CreateFormComponent } from './MyComponents/Courses/crud/create-form/form/Createform.component'

//Routers and Stuff
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { ProfileComponent } from './MyComponents/Profile/profile/profile.component';
import { DocumentsComponent } from './MyComponents/Documents/documents/documents.component';
import { WelcomeComponent } from './MyComponents/Group/welcome/welcome.component';
import { ActivitiesComponent } from './MyComponents/Documents/activities/activities.component';
import { GroupFormComponent } from './MyComponents/Group/Crud/group-form/group-form.component';
import { AllgroupsComponent } from './MyComponents/Group/Crud/AllGroups/allgroups/allgroups.component';
import { EvaluationsComponent } from './MyComponents/Documents/evaluations/evaluations/evaluations.component';
import { ListUsersComponent } from './MyComponents/Student/ListUsers/list-users.component';

//*Dependences
import { NgSelectModule } from '@ng-select/ng-select';

registerLocaleData(localeES, 'es');


// Path is used to give the path a certain name, or protect certain path throu Guards, AuthGuard is a general guard while RoleGuard will circle through roles and assign a certain path depending the role
const routes: Routes = [
  //LOGIN
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  } , // login page
  { path: 'register', component: RegisterComponent }, //Register page to singup with your email
  { path: 'password', component: ForgotPasswordComponent }, //Reset your password
  //HOMES
  { path: 'Admin', component: HomeAdminComponent, canActivate: [AuthGuard, RoleGuard],  data: {role: 'ROLE_ADMIN'}} , // Admi's home page only accessed by ROLE_ADMIN
  { path: 'Student', component: HomeStudentComponent, canActivate: [AuthGuard]  } , // Studen's home page only accessed by ROLE_STUDENT
  { path: 'Teacher', component: HomeTeacherComponent   } , //Teacher's home page only accessed by ROLE_TEACHER
  //CRUDS
  { path: 'CRUD', component: FormComponent}, //Form where all the users are created and deleted, Redirects to List
  { path: 'CRUD/:id', component: FormComponent}, //Form where all the users are created and deleted, Redirects to List
  { path: 'List', component: AllusersComponent}, //ReadAll of the users, redirects to CRUD
  { path: 'List/:page', component: AllusersComponent}, //ReadAll of the users, redirects to CRUD
  

  //TEMPORALES 
  { path: 'Profile', component: ProfileComponent}, //Profile!
  { path: 'CourseCrud', component: CreateFormComponent}, //Crud for the courses 
  { path: 'CourseCrud/:id', component: CreateFormComponent}, //Crud for the courses 
  { path: 'ListCourse', component: AllCoursesComponent}, //ReadAll of the courses
  { path: 'Documents', component: DocumentsComponent}, //List of all documents with a modal to upload documents
  { path: 'Welcome', component: WelcomeComponent}, //Select a group! like cohort 17,18,19...
  { path: 'Activities', component: ActivitiesComponent}, //List Activies with a modal to upload a new activity
  { path: 'GroupCrud', component: AllgroupsComponent}, //Group Crud
  { path: 'ListGroup', component: GroupFormComponent}, //List Groups with a modal to upload a new group
  { path: 'Evaluations', component: EvaluationsComponent}, //List Groups with a modal to upload a new group

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
    ProfileComponent,
    AllCoursesComponent,
    CreateFormComponent,
    DocumentsComponent,
    WelcomeComponent,
    ActivitiesComponent,
    GroupFormComponent,
    AllgroupsComponent,
    EvaluationsComponent,
    ListUsersComponent
    
  ],
  imports: [
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ServiceService,, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
