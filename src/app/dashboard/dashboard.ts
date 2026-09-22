import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
   totalResidents = 43;
  totalPayments = 25;
  totalComplaints = 8;
  totalEmergencies = 3;


}
