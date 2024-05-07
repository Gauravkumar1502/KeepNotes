import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private baseUrl = 'http://localhost:8080/api/v1/notes';
  private notes: Note[] = [];
  constructor(private http: HttpClient) {
    console.log('NotesService created and constructed');
    // this.notes = this.getNotesList();
  }
  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/all`);
  }
  findById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/${id}`);
  }
  // new Response { StatusCode = 200, Title = "Success", Description = "Note deleted successfully" });
  deleteById(id: string): Observable<any> {
    // Add a return statement to fix the issue
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }
  add(note: { title: string, content: string }): Observable<{ id: string, title: string, content: string }> {
    return this.http.post<{ id: string, title: string, content: string }>(`${this.baseUrl}/add`, note);
  }
  updateById(note: { id: string, title: string, content: string }): Observable<{ id: string, title: string, content: string }> {
    console.log(`note: ${JSON.stringify(note)}`);
    return this.http.put<{ id: string, title: string, content: string }>(`${this.baseUrl}/update`, note);
  }

  // getNotesList(): Note[] {
  //   this.getAll().subscribe({
  //     next: (notes) => {
  //       this.notes = notes;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  //   return this.notes;
  // }
  // getNoteById(id: string): Note {
  //   let note = this.notes.find((note) => note.id === id);
  //   if (note) return note;
  //   return {
  //     id: '',
  //     title: '',
  //     content: '',
  //     createdAt: null,
  //     updatedAt: null
  //   };
  // }
}
