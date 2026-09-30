import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  CreatePayment,
  Payment,
  UpdatePayment
} from '../../Model/payment-model';

import { PaymentService } from '../../Service/payment-service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css'
})
export class PaymentComponent implements OnInit {

  // =========================
  // Signals
  // =========================

  payments = signal<Payment[]>([]);

  searchText = signal('');
  statusFilter = signal('All Status');

  loading = signal(false);
  errorMessage = signal('');

  showForm = signal(false);
  editMode = signal(false);

  selectedPaymentId = signal<number | null>(null);


  // =========================
  // Toast Signals
  // =========================

  toastMessage = signal('');
  toastType = signal<'success' | 'error'>('success');
  showToast = signal(false);


  // =========================
  // Computed filtered payments
  // =========================

  filteredPayments = computed(() => {

    const payments = this.payments();

    const search = this.searchText()
      .toLowerCase()
      .trim();

    const status = this.statusFilter();

    return payments.filter(payment => {

      const matchesSearch =
        payment.flatId.toString().includes(search) ||
        payment.amount.toString().includes(search);

      const matchesStatus =
        status === 'All Status' ||
        this.getStatus(payment.status) === status;

      return matchesSearch && matchesStatus;
    });

  });


  // =========================
  // Form
  // =========================

  paymentForm: CreatePayment = {
    maintenanceId: null,
    flatId: 0,
    amount: 0,
    paymentDate: '',
    paymentMethod: 1,
    paymentType: 1
  };


  constructor(
    private paymentService: PaymentService
  ) {}


  // =========================
  // On Init
  // =========================

  ngOnInit(): void {

    this.loadPayments();

  }


  // =========================
  // Load Payments
  // =========================

  loadPayments(): void {

    this.loading.set(true);

    this.paymentService.getAll().subscribe({

      next: (data) => {

        this.payments.set(data);

        this.loading.set(false);

      },

      error: (error) => {

        console.error(error);

        this.errorMessage.set(
          'Unable to load payments.'
        );

        this.loading.set(false);

        this.showToastMessage(
          'Unable to load payments.',
          'error'
        );

      }

    });

  }


  // =========================
  // Search
  // =========================

  onSearchChange(value: string): void {

    this.searchText.set(value);

  }


  // =========================
  // Status Filter
  // =========================

  onStatusChange(value: string): void {

    this.statusFilter.set(value);

  }


  // =========================
  // Open Add Form
  // =========================

  openAddForm(): void {

    this.editMode.set(false);

    this.showForm.set(true);

    this.selectedPaymentId.set(null);

    this.paymentForm = {

      maintenanceId: null,

      flatId: 0,

      amount: 0,

      paymentDate: '',

      paymentMethod: 1,

      paymentType: 1

    };

  }


  // =========================
  // Open Edit Form
  // =========================

  openEditForm(payment: Payment): void {

    this.editMode.set(true);

    this.showForm.set(true);

    this.selectedPaymentId.set(payment.id);

    this.paymentForm = {

      maintenanceId: payment.maintenanceId,

      flatId: payment.flatId,

      amount: payment.amount,

      paymentDate: payment.paymentDate.substring(0, 10),

      paymentMethod: payment.paymentMethod,

      paymentType: payment.paymentType

    };

  }


  // =========================
  // Save Payment
  // =========================

  savePayment(): void {

    // =========================
    // Basic Validation
    // =========================

    if (
      this.paymentForm.flatId <= 0 ||
      this.paymentForm.amount <= 0 ||
      !this.paymentForm.paymentDate
    ) {

      this.showToastMessage(
        'Please fill all required fields.',
        'error'
      );

      return;
    }


    // =========================
    // Maintenance Payment
    // =========================

    if (
      this.paymentForm.paymentType === 1 &&
      !this.paymentForm.maintenanceId
    ) {

      this.showToastMessage(
        'Maintenance ID is required for maintenance payment.',
        'error'
      );

      return;
    }


    // =========================
    // Rent Payment
    // =========================

    if (this.paymentForm.paymentType === 2) {

      this.paymentForm.maintenanceId = null;

    }


    // =========================
    // Update
    // =========================

    if (
      this.editMode() &&
      this.selectedPaymentId() !== null
    ) {

      const existing = this.payments().find(
        x => x.id === this.selectedPaymentId()
      );


      if (!existing) {

        this.showToastMessage(
          'Payment not found.',
          'error'
        );

        return;
      }


      const updateData: UpdatePayment = {

        ...this.paymentForm,

        status: existing.status

      };


      this.paymentService
        .update(
          this.selectedPaymentId()!,
          updateData
        )
        .subscribe({

          next: () => {

            this.closeForm();

            this.showToastMessage(
              'Payment updated successfully.',
              'success'
            );

            this.loadPayments();

          },

          error: (error) => {

            console.error(error);

            this.showToastMessage(
              'Unable to update payment.',
              'error'
            );

          }

        });

    }


    // =========================
    // Create
    // =========================

    else {

      this.paymentService
        .create(this.paymentForm)
        .subscribe({

          next: () => {

            this.closeForm();

            this.showToastMessage(
              'Payment created successfully.',
              'success'
            );

            this.loadPayments();

          },

          error: (error) => {

            console.error(error);

            this.showToastMessage(
              'Unable to create payment.',
              'error'
            );

          }

        });

    }

  }


  // =========================
  // Delete Payment
  // =========================

  deletePayment(id: number): void {

    if (
      !confirm(
        'Are you sure you want to delete this payment?'
      )
    ) {

      return;

    }


    this.paymentService
      .delete(id)
      .subscribe({

        next: () => {

          this.showToastMessage(
            'Payment deleted successfully.',
            'success'
          );

          this.loadPayments();

        },

        error: (error) => {

          console.error(error);

          this.showToastMessage(
            'Unable to delete payment.',
            'error'
          );

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
  // Toast
  // =========================

  showToastMessage(
    message: string,
    type: 'success' | 'error'
  ): void {

    this.toastMessage.set(message);

    this.toastType.set(type);

    this.showToast.set(true);


    setTimeout(() => {

      this.showToast.set(false);

    }, 3000);

  }


  // =========================
  // Payment Status
  // =========================

  getStatus(status: number): string {

    switch (status) {

      case 1:
        return 'Pending';

      case 2:
        return 'Success';

      case 3:
        return 'Failed';

      default:
        return 'Unknown';

    }

  }


  // =========================
  // Payment Type
  // =========================

  getPaymentType(type: number): string {

    return type === 1
      ? 'Maintenance'
      : 'Rent';

  }


  // =========================
  // Payment Method
  // =========================

  getPaymentMethod(method: number): string {

    switch (method) {

      case 1:
        return 'Cash';

      case 2:
        return 'UPI';

      case 3:
        return 'Card';

      case 4:
        return 'Bank Transfer';

      default:
        return 'Unknown';

    }

  }

}