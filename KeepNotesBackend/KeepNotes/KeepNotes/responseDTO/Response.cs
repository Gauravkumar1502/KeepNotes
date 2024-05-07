namespace KeepNotes.responseDTO
{
    public class Response
    {
        public required int StatusCode { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}
