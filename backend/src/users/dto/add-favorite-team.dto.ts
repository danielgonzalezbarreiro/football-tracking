import { IsInt, IsPositive } from "class-validator";

export class AddFavoriteTeamDto {
  @IsInt( { message: 'Team ID must be an integer'})
  @IsPositive( {message: 'Team ID must be a positive integer'} )
  teamId: number;
}