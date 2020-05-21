import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './notification/notification.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoucherFormComponent } from './voucher-form/voucher-form.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    CalculatorComponent,
    VoucherFormComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
