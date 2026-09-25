import { ApplicationConfig } from '@angular/core';

import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

import { authInterceptor } from './Shared/Interceptor/auth-interceptor';

export const appConfig: ApplicationConfig = {

  providers: [

    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),

    provideAnimationsAsync(),

    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    })

  ]

};