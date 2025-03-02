import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  orderBy,
  limit,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  getLastSpO2(): Observable<number | null> {
    const colRef = collection(this.firestore, 'datosFisiologicos');
    const q = query(colRef, orderBy('timestamp', 'desc'), limit(1));

    return collectionData(q, { idField: 'id' }).pipe(
      map((docs) => (docs.length > 0 ? docs[0]['SpO2'] : null))
    );
  }
  getRealTimeBPM(): Observable<number | null> {
    const colRef = collection(this.firestore, 'datosFisiologicos');
    const q = query(colRef, orderBy('timestamp', 'desc'), limit(1));

    return collectionData(q, { idField: 'id' }).pipe(
      map((docs) => (docs.length > 0 ? docs[0]['BPM'] : null))
    );
  }

  getLast10Spo2(): Observable<number[]> {
    const colRef = collection(this.firestore, 'datosFisiologicos');
    const q = query(colRef, orderBy('timestamp', 'desc'), limit(10));

    return collectionData(q, { idField: 'id' }).pipe(
      map((docs) => docs.map((doc) => doc['SpO2']).reverse())
    );
  }

  getLast10BPMs(): Observable<number[]> {
    const colRef = collection(this.firestore, 'datosFisiologicos');
    const q = query(colRef, orderBy('timestamp', 'desc'), limit(10));

    return collectionData(q, { idField: 'id' }).pipe(
      map((docs) => docs.map((doc) => doc['BPM']).reverse())
    );
  }
}
