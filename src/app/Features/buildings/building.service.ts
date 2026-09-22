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
//   Building,
//   CreateBuilding,
//   UpdateBuilding
// } from './building.model';
export interface Building {

  id: number;

  name: string;

  address: string;

  totalFloors: number;

  totalFlats: number;

  isActive: boolean;
}


export interface CreateBuilding {

  name: string;

  address: string;

  totalFloors: number;

  totalFlats: number;
}


export interface UpdateBuilding {

  name: string;

  address: string;

  totalFloors: number;

  totalFlats: number;

  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class BuildingService {

  private apiUrl =
    'https://localhost:xxxx/api/Buildings';

  buildings = signal<Building[]>([]);

  loading = signal(false);

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Building[]> {

    this.loading.set(true);

    return this.http
      .get<Building[]>(this.apiUrl)
      .pipe(

        tap(data => {

          this.buildings.set(data);

          this.loading.set(false);

        })

      );
  }

  getById(id: number): Observable<Building> {

    return this.http.get<Building>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    data: CreateBuilding
  ): Observable<Building> {

    return this.http.post<Building>(
      this.apiUrl,
      data
    );
  }

  update(
    id: number,
    data: UpdateBuilding
  ): Observable<Building> {

    return this.http.put<Building>(
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