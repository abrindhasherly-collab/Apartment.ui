import {
  DatePipe
} from '@angular/common';

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

@Component({
  selector: 'app-notice-list',
  standalone: true,

  imports: [
    RouterLink,
    DatePipe
  ],

  templateUrl: './notice-list.html',
  styleUrl: './notice-list.css'
})
export class NoticeList implements OnInit {

  notices = signal<Notice[]>([]);

  loading = signal(false);

  errorMessage = signal('');

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

          this.loadNotices();
        },

        error: error => {

          console.error(error);

          alert('Delete failed.');
        }

      });
  }
}