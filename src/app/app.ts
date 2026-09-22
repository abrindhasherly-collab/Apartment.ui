import {
  Component,
  signal
} from '@angular/core';

import {
  Router,
  RouterOutlet,
  NavigationEnd
} from '@angular/router';

import { filter } from 'rxjs';

import { NavbarComponent } from './Shared/Navbar/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    NavbarComponent
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  showNavbar = signal(false);

  constructor(private router: Router) {

    this.router.events
      .pipe(
        filter(
          event => event instanceof NavigationEnd
        )
      )
      .subscribe(
        (event: NavigationEnd) => {

          const authPage =
            event.urlAfterRedirects === '/login' ||
            event.urlAfterRedirects === '/register';

          this.showNavbar.set(!authPage);
        }
      );
  }
}