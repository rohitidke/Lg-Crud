import { ErrorHandler, NgModule } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { PackageComponent } from "../components/package/package";
import { TableData } from "../components/package/package.model";
import { PackageService } from "../components/package/package.service";
import { HomePage } from "../pages/home/home";
import { MyApp } from "./app.component";

@NgModule({
  bootstrap: [IonicApp],
  declarations: [
    MyApp,
    HomePage,
    PackageComponent,
  ],
  entryComponents: [
    MyApp,
    HomePage,
    PackageComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PackageService,
    HttpClient,
    TableData,
  ],
})
export class AppModule {}
