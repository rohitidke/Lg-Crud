import { ErrorHandler, NgModule } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { PackageComponent } from "../components/package/package";
import { PackageModel } from "../components/package/package.model";
import { SearchtablePipe } from "../components/package/package.searchtable.pipe";
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
    HttpModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PackageService,
    PackageModel,
    SearchtablePipe,
    PackageComponent,
  ],
})
export class AppModule { }
