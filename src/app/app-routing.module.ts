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
import {InviteCreateComponent} from "./invite/invite-create/invite-create.component";
import {InviteListComponent} from "./invite/invite-list/invite-list.component";
import {InviteDeleteComponent} from "./invite/invite-delete/invite-delete.component";
import {InviteDetailComponent} from "./invite/invite-detail/invite-detail.component";
import {AgreeCreateComponent} from "./agree/agree-create/agree-create.component";
import {AgreeListComponent} from "./agree/agree-list/agree-list.component";
import {AgreeDeleteComponent} from "./agree/agree-delete/agree-delete.component";
import {AgreeDetailComponent} from "./agree/agree-detail/agree-detail.component";

const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},

  { path: 'invite/create', component: InviteCreateComponent},
  { path: 'invite/:id/detail', component: InviteDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'invite/:id/delete', component: InviteDeleteComponent, canActivate: [LoggedInGuard] },
  { path: 'invite/myInvites', component: InviteListComponent},

  { path: 'agrees/:id', component: AgreeDetailComponent},
  { path: 'agree/create', component: AgreeCreateComponent},
  { path: 'agree/:id/detail', component: AgreeDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'agree/:id/delete', component: AgreeDeleteComponent, canActivate: [LoggedInGuard] },
  { path: 'agree/myAgrees', component: AgreeListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
