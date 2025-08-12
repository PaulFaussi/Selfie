// services/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarEvent } from '../calendar/event-form/event-form.component';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = 'http://localhost:9000/evento';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('loginToken') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
  }

  getAllEvents(): Promise<CalendarEvent[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .toPromise()
      .then(events => {
        if (!events) return [];
        return events.map(e => ({
          id: e._id,
          title: e.title,
          description: e.description,
          startDate: new Date(e.startDate),
          endDate: new Date(e.endDate),
          allDay: e.allDay,
          startTime: e.startTime,
          endTime: e.endTime,
          reminderMinutes: e.reminderMinutes,
          recurrence: e.recurrence,
          color: e.color,
          assegnati: e.assegnati || [],
          partecipazioni: e.partecipazioni || []
        }));
      });
  }

  addEvent(event: CalendarEvent): Promise<CalendarEvent> {
    const toSend = {
      ...event,
      startDate: (event.startDate instanceof Date) ? event.startDate.toISOString() : event.startDate,
      endDate: (event.endDate instanceof Date) ? event.endDate.toISOString() : event.endDate
    };
    return lastValueFrom(this.http.post<any>(this.apiUrl, toSend, { headers: this.getAuthHeaders() }))
      .then(e => ({
        ...e,
        id: e._id,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate)
      }));
  }

  updateEvent(event: CalendarEvent): Promise<void> {
    const toSend = {
      ...event,
      startDate: (event.startDate instanceof Date) ? event.startDate.toISOString() : event.startDate,
      endDate: (event.endDate instanceof Date) ? event.endDate.toISOString() : event.endDate
    };
    return lastValueFrom(this.http.put<void>(`${this.apiUrl}/${event.id}`, toSend, { headers: this.getAuthHeaders() }));
  }

  deleteEvent(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }));
  }

  deleteSeries(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.apiUrl}/series/${id}`, { headers: this.getAuthHeaders() }));
  }

  rispondiAInvito(eventId: string, utente: string, stato: 'accettato' | 'rifiutato' | 'in_attesa'): Promise<void> {
    return lastValueFrom(
      this.http.patch<void>(
        `${this.apiUrl}/${eventId}/rispondi`,
        { utente, stato },
        { headers: this.getAuthHeaders() }
      )
    );
  }
}
