import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NoteFormDialogComponent } from './components/note-form-dialog/note-form-dialog.component';
import { NotesComponent } from './components/notes/notes.component';

export const routes: Routes = [
    { path: '', redirectTo: 'notes', pathMatch: 'full' },
    {
        path: 'notes',
        component: NotesComponent,
        title: 'Notes',
    },
    { path: 'note/new', component: NoteFormDialogComponent },
    { path: 'note/:id', component: NoteFormDialogComponent },
    { path: '**', component: PageNotFoundComponent },

];
