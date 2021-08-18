import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NgxTypedJsModule } from 'ngx-typed-js';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, NgxTypedJsModule],
  declarations: [AuthComponent],
})
export class AuthModule {}
