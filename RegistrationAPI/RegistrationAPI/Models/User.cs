﻿namespace RegistrationAPI.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Gender { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
