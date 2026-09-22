import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { environment } from '../../../../Environments/environment';
import { CreatePayment, Payment, UpdatePayment } from '../Model/payment-model';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = `${environment.apiUrl}/Payment`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  getById(id: number): Observable<Payment> {
    return this.http.get<Payment>(
      `${this.apiUrl}/${id}`
    );
  }

  create(payment: CreatePayment): Observable<Payment> {
    return this.http.post<Payment>(
      this.apiUrl,
      payment
    );
  }

  update(id: number,payment: UpdatePayment
  ): Observable<Payment> {
    return this.http.put<Payment>(
      `${this.apiUrl}/${id}`,
      payment
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}