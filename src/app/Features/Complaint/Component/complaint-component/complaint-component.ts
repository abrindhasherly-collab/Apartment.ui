import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Complaint,
  CreateComplaint,
  UpdateComplaint
} from '../../Model/complaint-model';

import { ComplaintService } from '../../Service/comlaint-service';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './complaint-component.html',
  styleUrl: './complaint-component.css'
})
export class ComplaintComponent implements OnInit {

  // =========================
  // Signals
  // =========================

  complaints = signal<Complaint[]>([]);

  searchText = signal('');
  statusFilter = signal('All Status');

  loading = signal(false);
  errorMessage = signal('');

  showForm = signal(false);
  editMode = signal(false);

  selectedComplaintId = signal<number | null>(null);


  // =========================
  // Form
  // =========================

  complaintForm: CreateComplaint = {
    residentId: 0,
    flatId: 0,
    title: '',
    description: ''
  };


  constructor(
    private complaintService: ComplaintService
  ) { }


  // =========================
  // On Init
  // =========================

  ngOnInit(): void {
    this.loadComplaints();
  }


  // =========================
  // Load Complaints
  // =========================

  loadComplaints(): void {

    this.loading.set(true);

    this.complaintService.getAll().subscribe({

      next: data => {

        this.complaints.set(data);

        this.loading.set(false);
      },

      error: error => {

        console.error(error);

        this.errorMessage.set(
          'Unable to load complaints.'
        );

        this.loading.set(false);
      }

    });
  }


  // =========================
  // Filter Complaints
  // =========================

  filteredComplaints = computed(() => {

    const complaints = this.complaints();

    const search = this.searchText()
      .toLowerCase()
      .trim();

    const status = this.statusFilter();

    return complaints.filter(complaint => {

      const matchesSearch =
        complaint.title
          .toLowerCase()
          .includes(search) ||

        complaint.description
          .toLowerCase()
          .includes(search) ||

        complaint.residentId
          .toString()
          .includes(search) ||

        complaint.flatId
          .toString()
          .includes(search);


      const matchesStatus =
        status === 'All Status' ||
        this.getStatus(complaint.status) === status;


      return matchesSearch && matchesStatus;
    });
  });


  // =========================
  // Add Complaint
  // =========================

  openAddForm(): void {

    this.editMode.set(false);

    this.showForm.set(true);

    this.selectedComplaintId.set(null);

    this.complaintForm = {
      residentId: 0,
      flatId: 0,
      title: '',
      description: ''
    };
  }


  // =========================
  // Edit Complaint
  // =========================

  openEditForm(complaint: Complaint): void {

    this.editMode.set(true);

    this.showForm.set(true);

    this.selectedComplaintId.set(complaint.id);

    this.complaintForm = {

      residentId: complaint.residentId,

      flatId: complaint.flatId,

      title: complaint.title,

      description: complaint.description
    };
  }


  // =========================
  // Save Complaint
  // =========================

  saveComplaint(): void {

    if (
      this.complaintForm.residentId <= 0 ||
      this.complaintForm.flatId <= 0 ||
      !this.complaintForm.title ||
      !this.complaintForm.description
    ) {
      return;
    }


    // =========================
    // UPDATE
    // =========================

    if (
      this.editMode() &&
      this.selectedComplaintId() !== null
    ) {

      const existing = this.complaints().find(
        x => x.id === this.selectedComplaintId()
      );


      if (!existing) {
        return;
      }


      const updateData: UpdateComplaint = {

        ...this.complaintForm,

        status: existing.status
      };


      this.complaintService
        .update(
          this.selectedComplaintId()!,
          updateData
        )
        .subscribe({

          next: () => {

            this.closeForm();

            this.loadComplaints();
          },

          error: error => {

            console.error(error);
          }

        });

    }

    // =========================
    // CREATE
    // =========================

    else {

      this.complaintService
        .create(this.complaintForm)
        .subscribe({

          next: () => {

            this.closeForm();

            this.loadComplaints();
          },

          error: error => {

            console.error(error);
          }

        });
    }
  }


  // =========================
  // Delete Complaint
  // =========================

  deleteComplaint(id: number): void {

    if (
      !confirm(
        'Are you sure you want to delete this complaint?'
      )
    ) {
      return;
    }


    this.complaintService
      .delete(id)
      .subscribe({

        next: () => {

          this.loadComplaints();
        },

        error: error => {

          console.error(error);
        }

      });
  }


  // =========================
  // Close Form
  // =========================

  closeForm(): void {

    this.showForm.set(false);
  }


  // =========================
  // Status
  // =========================

  getStatus(status: number): string {

    switch (status) {

      case 1:
        return 'Pending';

      case 2:
        return 'In Progress';

      case 3:
        return 'Resolved';

      case 4:
        return 'Rejected';

      default:
        return 'Unknown';
    }
  }
}