import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private apiUrl = 'https://iot-production-c059.up.railway.app/api/actualizar-movimiento';

  constructor(private http: HttpClient) {}

  updateOrCreateSignal(movement: string, index: number): Observable<any> {
    const payload = {
      Movimiento: movement.toLowerCase(),
      index: index
    };

    return this.http.post(this.apiUrl, payload);
  }
}
