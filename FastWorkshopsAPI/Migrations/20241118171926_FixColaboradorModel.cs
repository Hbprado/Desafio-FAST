using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FastWorkshopsAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixColaboradorModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ColaboradorWorkshop");

            migrationBuilder.AddColumn<int>(
                name: "WorkshopId",
                table: "Colaboradores",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Colaboradores_WorkshopId",
                table: "Colaboradores",
                column: "WorkshopId");

            migrationBuilder.AddForeignKey(
                name: "FK_Colaboradores_Workshops_WorkshopId",
                table: "Colaboradores",
                column: "WorkshopId",
                principalTable: "Workshops",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Colaboradores_Workshops_WorkshopId",
                table: "Colaboradores");

            migrationBuilder.DropIndex(
                name: "IX_Colaboradores_WorkshopId",
                table: "Colaboradores");

            migrationBuilder.DropColumn(
                name: "WorkshopId",
                table: "Colaboradores");

            migrationBuilder.CreateTable(
                name: "ColaboradorWorkshop",
                columns: table => new
                {
                    ParticipantesId = table.Column<int>(type: "int", nullable: false),
                    WorkshopsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColaboradorWorkshop", x => new { x.ParticipantesId, x.WorkshopsId });
                    table.ForeignKey(
                        name: "FK_ColaboradorWorkshop_Colaboradores_ParticipantesId",
                        column: x => x.ParticipantesId,
                        principalTable: "Colaboradores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ColaboradorWorkshop_Workshops_WorkshopsId",
                        column: x => x.WorkshopsId,
                        principalTable: "Workshops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ColaboradorWorkshop_WorkshopsId",
                table: "ColaboradorWorkshop",
                column: "WorkshopsId");
        }
    }
}
