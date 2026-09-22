import {
  Component,
  signal
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm: FormGroup;

  errorMessage = signal('');

  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({

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
        '',
        Validators.required
      ],

      phoneNumber: [
        '',
        Validators.required
      ],

      role: [
        2,
        Validators.required
      ]

    });
  }

  register(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }

    this.loading.set(true);

    this.errorMessage.set('');

    this.authService
      .register(this.registerForm.value)
      .subscribe({

        next: () => {

          this.loading.set(false);

          alert('Registration successful.');

          this.router.navigate(['/login']);
        },

        error: (error) => {

          console.error(error);

          this.loading.set(false);

          this.errorMessage.set(
            'Registration failed.'
          );
        }

      });
  }
}