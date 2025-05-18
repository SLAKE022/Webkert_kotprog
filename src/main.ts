import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

// Register Hungarian locale globally
registerLocaleData(localeHu);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
