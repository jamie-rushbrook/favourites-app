import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { FavoritesPage } from '../pages/favorites/favorites';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailsPage } from '../pages/details/details';
import {GamedetailsPage} from "../pages/gamedetails/gamedetails";
import { Api } from '../providers/api';
import { FavoriteService } from '../providers/favorite-service';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    FavoritesPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailsPage,
    GamedetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FavoritesPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailsPage,
    GamedetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: 'api', useClass: Api},
    {provide: 'favorites', useClass: FavoriteService}
  ]
})
export class AppModule {}
