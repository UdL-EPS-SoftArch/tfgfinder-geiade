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
import {CategoryListComponent} from "./category/category-list/category-list.component";
import {CategoryDetailComponent} from "./category/category-detail/category-detail.component";
import {CategoryDeleteComponent} from "./category/category-delete/category-delete.component";
import {CategoryEditComponent} from "./category/category-edit/category-edit.component";
import {CategoryRegisterComponent} from "./category/category-register/category-register.component";
import {InviteCreateComponent} from "./invite/invite-create/invite-create.component";
import {InviteListComponent} from "./invite/invite-list/invite-list.component";
import {InviteDeleteComponent} from "./invite/invite-delete/invite-delete.component";
import {InviteDetailComponent} from "./invite/invite-detail/invite-detail.component";
import { ProposalListComponent } from './proposal/proposal-list/proposal-list.component';
import { ProposalCreateComponent } from './proposal/proposal-create/proposal-create.component';
import {ProposalDetailComponent} from "./proposal/proposal-detail/proposal-detail.component";
import {ProposalDeleteComponent} from "./proposal/proposal-delete/proposal-delete.component";

const routes: Routes = [
  { path: 'users/create', redirectTo: 'register-student', pathMatch: 'full'},
  //{ path: 'users/create', component: UserRegisterComponent},
  { path: 'categories/create', component: CategoryRegisterComponent},
  { path: 'categories/:name/edit', component: CategoryEditComponent},
  { path: 'categories/:name/delete', component: CategoryDeleteComponent},
  { path: 'categories/:name', component: CategoryDetailComponent},
  { path: 'categories', component: CategoryListComponent},
  { path: 'proposals', component: ProposalListComponent},
  { path: 'proposals/create', component: ProposalCreateComponent, canActivate: [LoggedInGuard]},
  { path: 'proposals/:id/detail', component: ProposalDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'proposals/:id/edit', component: ProposalCreateComponent, canActivate: [LoggedInGuard]},
  { path: 'proposals/:id/delete', component: ProposalDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  { path: 'register-organisation', component: OrganisationRegisterComponent},
  { path: 'register', component: RegisterTypeSelectionComponent },
  { path: 'register-student', component: StudentRegisterComponent },
  { path: 'register-professor', component: ProfessorRegisterComponent },
  //{ path: 'admin/organisations', component: ExternalListComponent },
  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},
  { path: 'invite/create', component: InviteCreateComponent},
  { path: 'invite/:id/detail', component: InviteDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'invite/:id/delete', component: InviteDeleteComponent, canActivate: [LoggedInGuard] },
  { path: 'invite/myInvites', component: InviteListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
