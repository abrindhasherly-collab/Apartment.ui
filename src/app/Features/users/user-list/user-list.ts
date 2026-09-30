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
import { FormsModule } from '@angular/forms';

// import {
//   User
// } from '../user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,

  imports: [
    RouterLink, FormsModule
  ],

  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {

  users = signal<User[]>([]);

  loading = signal(false);

  searchText = '';
  selectedStatus = 'all';

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

  getActiveUsersCount(): number {
  return this.users().filter(user => user.status === 1).length;
}

getInactiveUsersCount(): number {
  return this.users().filter(user => user.status !== 1).length;
}

getInitials(name: string): string {
  if (!name) {
    return 'U';
  }

  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

filteredUsers() {
  const search = this.searchText.toLowerCase().trim();

  return this.users().filter(user => {

    const matchesSearch =
      !search ||
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search);

    const matchesStatus =
      this.selectedStatus === 'all' ||
      (this.selectedStatus === 'active' && user.status === 1) ||
      (this.selectedStatus === 'inactive' && user.status !== 1);

    return matchesSearch && matchesStatus;
  });
}
}