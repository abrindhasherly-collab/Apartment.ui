import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  UserService,
  User
} from '../user.service';

// import {
//   User
// } from '../user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {

  users = signal<User[]>([]);

  loading = signal(false);

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {

    this.loading.set(true);

    this.userService
      .getAll()
      .subscribe({

        next: users => {

          this.users.set(users);

          this.loading.set(false);
        },

        error: error => {

          console.error(error);

          this.loading.set(false);
        }

      });
  }

  deleteUser(id: number): void {

    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.userService
      .delete(id)
      .subscribe({

        next: () => {

          this.loadUsers();

        },

        error: error => {

          console.error(error);

          alert('Delete failed.');
        }

      });
  }
}