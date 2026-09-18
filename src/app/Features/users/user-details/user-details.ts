import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

// import {
//   User
// } from '../user.model';

import {
  UserService
} from '../user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './user-details.html',
  styleUrl: './user-details.css'
})
export class UserDetails implements OnInit {

  user = signal<any>(null);

  loading = signal(false);

  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadUser(id);
  }

  loadUser(id: number): void {

    this.loading.set(true);

    this.userService
      .getById(id)
      .subscribe({

        next: data => {

          this.user.set(data);

          this.loading.set(false);
        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'User not found.'
          );

          this.loading.set(false);
        }

      });
  }

  deleteUser(): void {

    const data = this.user();

    if (!data) {
      return;
    }

    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.userService
      .delete(data.id)
      .subscribe({

        next: () => {

          this.router.navigate(['/users']);
        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Unable to delete user.'
          );
        }

      });
  }

  getRole(role: number): string {

    switch (role) {

      case 1:
        return 'Secretary';

      case 2:
        return 'Resident';

      case 3:
        return 'Watchman';

      case 4:
        return 'Owner';

      default:
        return 'Unknown';
    }
  }

  getStatus(status: number): string {

    return status === 1
      ? 'Active'
      : 'Inactive';
  }
}