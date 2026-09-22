import {
  Injectable,
  signal
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  tap
} from 'rxjs';

// import {
//   Notice,
//   CreateNotice,
//   UpdateNotice
// } from './notice.model';
export interface Notice {

  id: number;

  title: string;

  description: string;

  postedDate: string;

  postedBy: number;

  status: number;
}


export interface CreateNotice {

  title: string;

  description: string;

  postedBy: number;

  status: number;
}


export interface UpdateNotice {

  title: string;

  description: string;

  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private apiUrl =
    'https://localhost:xxxx/api/Notices';

  notices = signal<Notice[]>([]);

  loading = signal(false);

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Notice[]> {

    this.loading.set(true);

    return this.http
      .get<Notice[]>(this.apiUrl)
      .pipe(

        tap(data => {

          this.notices.set(data);

          this.loading.set(false);

        })

      );
  }

  getById(id: number): Observable<Notice> {

    return this.http.get<Notice>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    data: CreateNotice
  ): Observable<Notice> {

    return this.http.post<Notice>(
      this.apiUrl,
      data
    );
  }

  update(
    id: number,
    data: UpdateNotice
  ): Observable<Notice> {

    return this.http.put<Notice>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  delete(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}