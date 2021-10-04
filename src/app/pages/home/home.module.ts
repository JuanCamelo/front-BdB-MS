import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

//devextreme 
import { DevextrmeModule } from "../../components/devextrme/devextrme.module";

const routes: Routes = [
  {
    path: 'h',
    component: HomeComponent    
  },
  { path: '**', redirectTo: 'h',  }
]

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    DevextrmeModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
