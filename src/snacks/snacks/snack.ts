import {IsCurrency, IsNotEmpty, IsNumber, IsPositive, Max, Min} from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Snack {   
    id:number;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @Min(0)
    @Max(1000)
    price: number; 

    @ApiProperty()
    @Min(0)
    @Max(100)
    stock: number;

    @ApiProperty()
    @IsNotEmpty()
    hasNuts: boolean;

    @ApiPropertyOptional()
    isVegan: boolean = false;

    @ApiPropertyOptional()
    brand: string;

    @ApiPropertyOptional()
    tags: string[] = [];


}