import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './error-handler/error-alert/not-found.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { OrganisationRegisterComponent } from './organisation/organisation-register/organisation-register.component';
import { RegisterTypeSelectionComponent } from './register-type-selection/register-type-selection.component';
import { StudentRegisterComponent } from './student/student-register/student-register.component';
import { ProfessorRegisterComponent } from './professor/professor-register/professor-register.component';
//import { ExternalListComponent } from './admin/external-list/external-list.component';



const routes: Routes = [
  { path: 'users/create', redirectTo: 'register-student', pathMatch: 'full'},
  //{ path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  {path: 'register-organisation', component: OrganisationRegisterComponent},
  { path: 'register', component: RegisterTypeSelectionComponent },
  { path: 'register-student', component: StudentRegisterComponent },
  { path: 'register-professor', component: ProfessorRegisterComponent },
  //{ path: 'admin/organisations', component: ExternalListComponent },
  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
