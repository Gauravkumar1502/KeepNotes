using KeepNotes.models;
using Microsoft.EntityFrameworkCore;

namespace KeepNotes.data
{
    public class NotesContext : DbContext
    {
        public NotesContext(DbContextOptions<NotesContext> options) : base(options)
        {

        }
        public DbSet<Note> Notes { get; set; }
    }
}
