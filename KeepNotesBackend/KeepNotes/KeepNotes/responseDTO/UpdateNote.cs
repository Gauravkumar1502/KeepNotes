namespace KeepNotes.responseDTO
{
    public class UpdateNote
    {
        public required Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
    }
}
