import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, startWith } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class ClockService {

  private offsetMs = 0;

  private readonly tick$ = interval(1000).pipe(startWith(0));
  private readonly virtualTime$ = new BehaviorSubject<Date>(this.getNow());

  constructor() {
    this.tick$.subscribe(() => {
      this.virtualTime$.next(this.getNow());
    });
  }


  private getNow(): Date {
    return new Date(Date.now() + this.offsetMs);
  }

  get time$() {
    return this.virtualTime$.asObservable();
  }

  setVirtualNow(date: Date) {
    this.offsetMs = date.getTime() - Date.now();
    this.virtualTime$.next(this.getNow());
  }

  reset() {
    this.offsetMs = 0;
    this.virtualTime$.next(this.getNow());
  }

  getCurrent(): Date {
    return this.getNow();
  }

  getCurrentString(): string {
    const current: Date = this.getCurrent();

    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = current.getFullYear();
    const month = pad(current.getMonth() + 1); // Mese inizia da 0
    const day = pad(current.getDate());
    const hour = pad(current.getHours());
    const minute = pad(current.getMinutes());

    return `${year}-${month}-${day}T${hour}:${minute}`;
  }
}
