import { Component } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, ButtonModule, InputTextModule, InputTextareaModule],
  providers: [MessageService],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css'
})
export class EditNoteComponent {

  id: string = "";
  noteFormGroup = this.fb.group({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  buttonLabel: string = "Update";

  constructor(private fb: FormBuilder, 
    private noteService: NotesService, 
    private router: Router,
    private messageService: MessageService) {
    this.id = this.router.url.split('/')[2];
  }

  ngOnInit(): void {
    if (this.id && this.id !== "") {
      if(this.id === "new"){
        this.buttonLabel = "Add";
        return;
      }
      this.noteService.findById(this.id).subscribe({
        next: (n) => {
          this.noteFormGroup.setValue({
            title: n.title,
            content: n.content
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  onSubmit() {
    if ( this.id && this.id !== "" ) {
      if (this.noteFormGroup.invalid) {
        this.messageService.add({severity:'error', summary:'Invalid input', detail:'Please fill in all fields'});
        return;
      }
      if (this.buttonLabel === "Add") {
        this.addNote();
        return;
      }
      this.updateNote();
    }
  }

  addNote() {
    this.noteService.add({
      title: this.noteFormGroup.value.title as string,
      content: this.noteFormGroup.value.content as string
    }).subscribe({
      next: (n) => {
        this.messageService.add({severity:'success', summary:'Note added', detail:'Note added successfully'});
        setTimeout(() => {
          this.router.navigate(['/notes']);
        }, 1500);
      },
      error: (err) => {
        alert('Error adding note');
        console.log(err);
      }
    });
  }

  updateNote() {
    this.noteService.updateById({
      id: this.id,
      title: this.noteFormGroup.value.title as string,
      content: this.noteFormGroup.value.content as string
    }).subscribe({
      next: (n) => {
        this.messageService.add({severity:'success', summary:'Note updated', detail:'Note updated successfully'});
        setTimeout(() => {
          this.router.navigate(['/notes']);
        }, 1500);
      },
      error: (err) => {
        alert('Error updating note');
        console.log(err);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/notes']);
  }
}
