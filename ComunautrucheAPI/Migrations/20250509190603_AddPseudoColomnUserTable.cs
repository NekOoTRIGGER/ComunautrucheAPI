using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ComunautrucheAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPseudoColomnUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Pseudo",
                table: "Users",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pseudo",
                table: "Users");
        }
    }
}
