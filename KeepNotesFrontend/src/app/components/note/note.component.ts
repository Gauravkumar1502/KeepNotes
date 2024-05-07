import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { NotesService } from '../../services/notes.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, FormsModule, InputTextareaModule, RouterLink, ConfirmDialogModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {
  note: Note = {
    id: '',
    title: '',
    content: '',
    createdAt: null,
    updatedAt: null
  };
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private noteService: NotesService, private router: Router) {
  }
  
  ngOnInit(): void {
    let id = this.router.url.split('/')[2];
    if (id) {
      this.noteService.findById(id).subscribe({
        next: (n) => {
          this.note = n;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  deleteNote(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this note?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.noteService.deleteById(this.note.id).subscribe({
          next: (response) => {
            console.log(`isDeleted from note: ${JSON.stringify(response)}`);
            console.log(`isDeleted from note: ${response.statusCode}`);
            if (response.statusCode === 200) {
              console.log(`isDeleted from note inside: ${response.statusCode}`);
              this.messageService.add({severity:'success', summary: 'Success', detail: 'Note deleted successfully'});
              setTimeout(() => {
                this.router.navigate(['/notes']);
              }, 1500);
            }else {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Note not deleted due to some error'});
            }
          },
          error: (err) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Note not deleted due to some error'});
          }
        });
      },
      reject: () => {
        this.messageService.add({severity:'info', summary: 'Info', detail: 'You have rejected the deletion'});
      }
    });
  }
}
