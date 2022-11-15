using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RegistrationAPI.Models
{
    public class JWTService
    {
        public String SecretKey { get; set; }
        public String TokenDuration { get; set; }

        private readonly IConfiguration _config;

        public JWTService(IConfiguration config)
        {
            this._config = config;
            this.SecretKey = config.GetSection("JwtConfig").GetSection("Key").Value;
            this.TokenDuration = config.GetSection("JwtConfig").GetSection("Duration").Value;
        }

        public string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecretKey));

            var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var payload = new[]
            {
                new Claim("userID",user.UserID.ToString()),
                new Claim("firstname",user.FirstName),
                new Claim("lastname", user.LastName),
                new Claim("email", user.Email),
                new Claim("mobile",user.Mobile),
                new Claim("gender",user.Gender)
            };

            var jwtToker = new JwtSecurityToken(
                    issuer: "localhost",
                    audience: "localhost",
                    claims: payload,
                    expires: DateTime.Now.AddMinutes(Convert.ToDouble(TokenDuration)),
                    signingCredentials: signature
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtToker);
        }

        internal static void jwtObj()
        {
            throw new NotImplementedException();
        }
    }
}
