import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

// import {
//   Notice
// } from '../notice.model';

import {
  NoticeService
} from '../notice.service';

@Component({
  selector: 'app-notice-details',
  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './notice-details.html',
  styleUrl: './notice-details.css'
})
export class NoticeDetails implements OnInit {

  notice = signal<any>(null);

  loading = signal(false);

  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private noticeService: NoticeService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadNotice(id);
  }

  loadNotice(id: number): void {

    this.loading.set(true);

    this.noticeService
      .getById(id)
      .subscribe({

        next: data => {

          this.notice.set(data);

          this.loading.set(false);
        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Notice not found.'
          );

          this.loading.set(false);
        }

      });
  }

  deleteNotice(): void {

    const data = this.notice();

    if (!data) {
      return;
    }

    if (!confirm('Are you sure you want to delete this notice?')) {
      return;
    }

    this.noticeService
      .delete(data.id)
      .subscribe({

        next: () => {

          this.router.navigate(['/notices']);
        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Unable to delete notice.'
          );
        }

      });
  }
}