import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  UserService
} from '../user.service';

import {
  AuthService
} from '../../auth/auth.service';

@Component({
  selector: 'app-user-form',
  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm implements OnInit {

  userForm: FormGroup;

  isEdit = signal(false);

  loading = signal(false);

  errorMessage = signal('');

  userId = 0;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.userForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        ''
      ],

      phoneNumber: [
        '',
        Validators.required
      ],

      role: [
        2,
        Validators.required
      ],

      status: [
        1
      ]

    });
  }

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.userId = Number(id);

      this.isEdit.set(true);

      this.userForm
        .get('password')
        ?.clearValidators();

      this.userForm
        .get('password')
        ?.updateValueAndValidity();

      this.loadUser(this.userId);
    }
  }

  loadUser(id: number): void {

    this.loading.set(true);

    this.userService
      .getById(id)
      .subscribe({

        next: user => {

          this.userForm.patchValue(user);

          this.loading.set(false);
        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Unable to load user.'
          );

          this.loading.set(false);
        }

      });
  }

  saveUser(): void {

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      return;
    }

    this.loading.set(true);

    this.errorMessage.set('');

    if (this.isEdit()) {

      const updateData = {

        name: this.userForm.value.name,

        email: this.userForm.value.email,

        phoneNumber:
          this.userForm.value.phoneNumber,

        role: this.userForm.value.role,

        status: this.userForm.value.status

      };

      this.userService
        .update(
          this.userId,
          updateData
        )
        .subscribe({

          next: () => {

            this.router.navigate(['/users']);
          },

          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to update user.'
            );

            this.loading.set(false);
          }

        });

    } else {

      const registerData = {

        name: this.userForm.value.name,

        email: this.userForm.value.email,

        password: this.userForm.value.password,

        phoneNumber:
          this.userForm.value.phoneNumber,

        role: this.userForm.value.role

      };

      this.authService
        .register(registerData)
        .subscribe({

          next: () => {

            this.router.navigate(['/users']);
          },

          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to create user.'
            );

            this.loading.set(false);
          }

        });
    }
  }

  cancel(): void {

    this.router.navigate(['/users']);
  }
}