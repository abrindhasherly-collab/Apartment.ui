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


export interface ApartmentDocument {
  id: number;
  title: string;
  description: string;
  fileName: string;
  filePath: string;
  uploadedDate: string;
  uploadedBy: number;
  status: number;
}


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl =
    'https://localhost:xxxx/api/Documents';

  documents = signal<ApartmentDocument[]>([]);
  loading = signal(false);


  constructor(
    private http: HttpClient
  ) {}


  getAll(): Observable<ApartmentDocument[]> {

    this.loading.set(true);

    return this.http
      .get<ApartmentDocument[]>(this.apiUrl)
      .pipe(
        tap(documents => {
          this.documents.set(documents);
          this.loading.set(false);
        })
      );
  }


  getById(
    id: number
  ): Observable<ApartmentDocument> {

    return this.http.get<ApartmentDocument>(
      `${this.apiUrl}/${id}`
    );
  }


  create(
    title: string,
    description: string,
    file: File,
    uploadedBy: number
  ): Observable<ApartmentDocument> {

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append(
      'uploadedBy',
      uploadedBy.toString()
    );

    return this.http.post<ApartmentDocument>(
      this.apiUrl,
      formData
    );
  }


  update(
    id: number,
    title: string,
    description: string,
    status: number,
    file?: File
  ): Observable<ApartmentDocument> {

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append(
      'status',
      status.toString()
    );

    if (file) {
      formData.append('file', file);
    }

    return this.http.put<ApartmentDocument>(
      `${this.apiUrl}/${id}`,
      formData
    );
  }


  delete(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}