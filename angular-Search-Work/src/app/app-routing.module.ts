import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {UpworkComponent} from "./components/upwork/upwork.component";
import {AdminhomeComponent} from "./components/adminhome/adminhome.component";
import {EnterpriseComponent} from "./components/enterprise/enterprise.component";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'upwork',
    component:UpworkComponent
  },
  {
  path:'admin',
    component:AdminhomeComponent
  },
  {
    path:'enterprise',
    component:EnterpriseComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
