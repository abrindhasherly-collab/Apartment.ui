import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './authlayout.html',
  styleUrl: './authlayout.css'
})
export class AuthLayoutComponent {
}