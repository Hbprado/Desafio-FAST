using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FastWorkshopsAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddEmailToColaborador : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Colaboradores",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Colaboradores");
        }
    }
}
