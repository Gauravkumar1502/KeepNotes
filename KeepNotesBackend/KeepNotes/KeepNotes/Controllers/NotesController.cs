using KeepNotes.data;
using KeepNotes.models;
using KeepNotes.responseDTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeepNotes.Controllers
{
    [Route("api/v1/notes")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly NotesContext _notesDBContext;
        public NotesController(NotesContext notesDBContext)
        {
            _notesDBContext = notesDBContext;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            // get all notes sorted by created date
            var notes = await _notesDBContext.Notes.OrderByDescending(n => n.CreatedAt).ToListAsync();
            if (notes == null || notes.Count == 0)
            {
                return NotFound();
            }
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var note = await _notesDBContext.Notes.FirstOrDefaultAsync(n => n.Id == id);
            if (note == null)
            {
                return NotFound(new Response { StatusCode = 404, Title = "Not Found", Description = "No note found with id: " + id });
            }
            return Ok(note);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create(AddNote note)
        {
            if (note == null)   return BadRequest(new Response { StatusCode = 400, Title = "Empty Body", Description = "Note Request Body is Empty" });
            if (string.IsNullOrEmpty(note.Title) || string.IsNullOrEmpty(note.Content)) return BadRequest(new Response { StatusCode = 400, Title = "Empty Fields", Description = "Title or Content cannot be empty" });
            var newNote = new Note
            {
                Id = Guid.NewGuid(),
                Title = note.Title,
                Content = note.Content,
                CreatedAt = DateTime.Now,
                UpdatedAt = null
            };
            await _notesDBContext.Notes.AddAsync(newNote);
            await _notesDBContext.SaveChangesAsync();
            return Ok(newNote);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(UpdateNote note)
        {
            if (note == null) return BadRequest(new Response { StatusCode = 400, Title = "Empty Body", Description = "Note Request Body is Empty" });
            if (string.IsNullOrEmpty(note.Title) || string.IsNullOrEmpty(note.Content)) return BadRequest(new Response { StatusCode = 400, Title = "Empty Fields", Description = "Title or Content cannot be empty" });
            var existingNote = await _notesDBContext.Notes.FirstOrDefaultAsync(n => n.Id == note.Id);
            if (existingNote == null)
            {
                return NotFound(new Response { StatusCode = 404, Title = "Not Found", Description = "No note found with id: " + note.Id });
            }
            existingNote.Title = note.Title;
            existingNote.Content = note.Content;
            existingNote.UpdatedAt = DateTime.Now;
            _notesDBContext.Notes.Update(existingNote);
            await _notesDBContext.SaveChangesAsync();
            return Ok(existingNote);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var note = await _notesDBContext.Notes.FirstOrDefaultAsync(n => n.Id == id);
            if (note == null)
            {
                return NotFound(new Response { StatusCode = 404, Title = "Not Found", Description = "No note found with id: " + id });
            }
            _notesDBContext.Notes.Remove(note);
            await _notesDBContext.SaveChangesAsync();
            return Ok(new Response { StatusCode = 200, Title = "Success", Description = "Note deleted successfully" });
        }
    }
}
