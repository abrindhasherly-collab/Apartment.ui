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
export interface User {

  id: number;

  name: string;

  email: string;

  phoneNumber: string;

  role: number;

  status: number;

  createdDate: string;
}


export interface RegisterUser {

  name: string;

  email: string;

  password: string;

  phoneNumber: string;

  role: number;
}


export interface UpdateUser {

  name: string;

  email: string;

  phoneNumber: string;

  role: number;

  status: number;
}

// import {
//   User,
//   RegisterUser,
//   UpdateUser
// } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl =
    'https://localhost:xxxx/api/Users';

  users = signal<User[]>([]);

  loading = signal(false);

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<User[]> {

    this.loading.set(true);

    return this.http
      .get<User[]>(this.apiUrl)
      .pipe(

        tap(users => {

          this.users.set(users);

          this.loading.set(false);

        })

      );
  }

  getById(id: number): Observable<User> {

    return this.http.get<User>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    user: RegisterUser
  ): Observable<User> {

    return this.http.post<User>(
      `${this.apiUrl}`,
      user
    );
  }

  update(
    id: number,
    user: UpdateUser
  ): Observable<User> {

    return this.http.put<User>(
      `${this.apiUrl}/${id}`,
      user
    );
  }

  delete(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}