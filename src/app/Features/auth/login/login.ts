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
  selector: 'app-login',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;

  errorMessage = signal('');

  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

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
      ]

    });
  }

  login(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    this.loading.set(true);

    this.errorMessage.set('');

    this.authService
      .login(this.loginForm.value)
      .subscribe({

        next: (response:any) => {

          localStorage.setItem(
            'token',
            response.token
          );

          this.loading.set(false);

          this.router.navigate(['/users']);
        },

        error: (error:any) => {

          console.error(error);

          this.loading.set(false);

          this.errorMessage.set(
            'Invalid email or password.'
          );
        }

      });
  }
}