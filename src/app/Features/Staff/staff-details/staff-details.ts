import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { Staff, StaffService } from '../Service/staff-service';
// import { Staff } from '../../models/staff.model';

@Component({
  selector: 'app-staff-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './staff-details.html',
  styleUrl: './staff-details.css'
})
export class StaffDetails implements OnInit {

  staff?: Staff;

  loading = false;


  constructor(
    private staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadStaff(id);

  }


  loadStaff(id: number): void {

    this.loading = true;

    this.staffService
      .getById(id)
      .subscribe({

        next: (data) => {

          this.staff = data;

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Error loading staff:',
            error
          );

          this.loading = false;

          alert(
            'Staff details not found.'
          );

          this.router.navigate([
            '/staff'
          ]);

        }

      });

  }


  editStaff(): void {

    if (this.staff) {

      this.router.navigate([
        '/staff/edit',
        this.staff.id
      ]);

    }

  }

}