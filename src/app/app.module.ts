import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PackageComponent } from "../components/package/package";
import { BrowserModule } from '@angular/platform-browser';
import { TableDataProvider } from '../components/package/package.service';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { TableData } from '../components/package/package.model';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PackageComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PackageComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TableDataProvider,
    HttpClient,
    TableData
  ]
})
export class AppModule {}
