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

import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
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

      confirmPassword: [
        '',
        Validators.required
      ],

      phoneNumber: [
        '',
        Validators.required
      ]

    });

  }

  register(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }

    const password =
      this.registerForm.value.password;

    const confirmPassword =
      this.registerForm.value.confirmPassword;

    if (password !== confirmPassword) {

      this.toastr.error(
        'Passwords do not match.',
        'Error'
      );

      this.errorMessage.set(
        'Passwords do not match.'
      );

      return;
    }

    this.loading.set(true);

    this.errorMessage.set('');

    const registerData = {

      name:
        this.registerForm.value.name,

      email:
        this.registerForm.value.email,

      password:
        this.registerForm.value.password,

      phoneNumber:
        this.registerForm.value.phoneNumber

    };

    this.authService
      .register(registerData)
      .subscribe({

        next: () => {

          this.loading.set(false);

          this.toastr.success(
            'Registration successful.',
            'Success'
          );

          this.router.navigate(['/login']);

        },

        error: (error) => {

          console.error(error);

          this.loading.set(false);

          this.toastr.error(
            'Registration failed.',
            'Error'
          );

          this.errorMessage.set(
            'Registration failed.'
          );

        }

      });

  }

}