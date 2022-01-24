import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SnackParams {
    @ApiPropertyOptional()
    minPrice:number
    @ApiPropertyOptional()
    maxPrice:number
}