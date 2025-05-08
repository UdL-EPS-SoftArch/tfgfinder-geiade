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
import {InviteUpdateComponent} from "./invite/invite-update/invite-update.component";

const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},

  { path: 'invite/:id/create', component: InviteCreateComponent},
  { path: 'invite/:id/update', component: InviteUpdateComponent, canActivate: [LoggedInGuard]},
  { path: 'invite/:id/delete', component: InviteDeleteComponent, canActivate: [LoggedInGuard] },
  { path: 'invite/myInvites', component: InviteListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
