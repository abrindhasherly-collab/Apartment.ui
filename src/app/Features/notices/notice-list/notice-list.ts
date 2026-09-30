import { DatePipe } from '@angular/common';

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
  NoticeService,
  Notice
} from '../notice.service';
import 
{ CommonModule } from '@angular/common';

@Component({
  selector: 'app-notice-list',
  standalone: true,

  imports: [
    RouterLink,
    DatePipe,
    CommonModule,
  ],

  templateUrl: './notice-list.html',
  styleUrl: './notice-list.css'
})
export class NoticeList implements OnInit {

  notices = signal<Notice[]>([]);

  loading = signal(false);

  errorMessage = signal('');


  // Toast Signals
  toastMessage = signal('');

  toastType = signal<'success' | 'error'>('success');

  showToast = signal(false);


  constructor(
    private noticeService: NoticeService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.loadNotices();

  }


  loadNotices(): void {

    this.loading.set(true);

    this.errorMessage.set('');


    this.noticeService
      .getAll()
      .subscribe({

        next: notices => {

          this.notices.set(notices);

          this.loading.set(false);

        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Unable to load notices.'
          );

          this.loading.set(false);


          this.showToastMessage(
            'Unable to load notices.',
            'error'
          );

        }

      });

  }


  deleteNotice(id: number): void {

    if (
      !confirm(
        'Are you sure you want to delete this notice?'
      )
    ) {

      return;

    }


    this.noticeService
      .delete(id)
      .subscribe({

        next: () => {

          this.showToastMessage(
            'Notice deleted successfully.',
            'success'
          );

          this.loadNotices();

        },

        error: error => {

          console.error(error);

          this.showToastMessage(
            'Delete failed.',
            'error'
          );

        }

      });

  }


  // Toast
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

}