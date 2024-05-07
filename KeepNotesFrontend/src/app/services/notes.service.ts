import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private baseUrl = 'http://localhost:8080/api/v1/notes';
  constructor(private http: HttpClient) { }
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/all`);
  }
  getNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/${id}`);
  }
}
