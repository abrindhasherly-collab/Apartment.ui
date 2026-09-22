import {
  Component,
  signal
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,

  imports: [
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  menuOpen = signal(false);

  constructor(
    private router: Router
  ) {}

  toggleMenu(): void {
    this.menuOpen.update(
      value => !value
    );
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  logout(): void {

    localStorage.removeItem('token');

    this.closeMenu();

    this.router.navigate(['/login']);
  }
}