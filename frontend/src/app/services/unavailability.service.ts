import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface Unavailability {
  _id?: string; 
  startDate: Date;
  endDate: Date;
  user: string;
  /* recurrence: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'; */
  note?: string;
}


@Injectable({ providedIn: 'root' })
export class UnavailabilityService {
  private apiUrl = 'http://localhost:8000/unavailability';

  constructor(private http: HttpClient) {}

  getAll(): Promise<Unavailability[]> {
    return lastValueFrom(this.http.get<Unavailability[]>(`${this.apiUrl}/${localStorage.getItem('username')}`));
  }

  /* async addOne(data: any): Promise<Unavailability[]> {
    const token = localStorage.getItem('loginToken');

    const res = await fetch(`${this.apiUrl}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ data })
    });

    return await res.json() ?? [];
  } */


  addOne(data: Unavailability): Promise<Unavailability> {
    return lastValueFrom(this.http.post<Unavailability>(`${this.apiUrl}/create`, data));
  }

  deleteOne(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  updateOne(id: string, data: Partial<Unavailability>): Promise<Unavailability> {
    return lastValueFrom(this.http.patch<Unavailability>(`${this.apiUrl}/${id}`, data));
  }


}
