import { Controller, Get, Res, Post, Body, Param, Response, Delete, Query, HttpException } from "@nestjs/common";
import { SnacksService } from "./snacks.service";
import { Snack } from "./snack";
import { ApiOperation, ApiPropertyOptional, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SnackParams } from "./snackParams";

const fs = require("fs");


@ApiTags("snacks")
@Controller("snacks")
export class SnacksController {
    constructor(private readonly snackservice: SnacksService) {}

    @Post()
    @ApiOperation({summary: "Create a new snack."})
    @ApiResponse({
        status:201,
        description: "The newly added snack",
        type:Snack
    })
    addSnack(@Body() snack:Snack, @Response() res) {
        var addSnackResult = this.snackservice.createSnack(snack)
        return res.status(201).json(addSnackResult)
    }
    
    @Get()
    @ApiOperation({summary: "Get a list of snacks."})
    getSnacks(@Query() snackParams:SnackParams, @Response() res) {
        var snacks = this.snackservice.getSnacks(snackParams)
        return res.status(200).json(snacks)
    }

    @Get(":snack_id")
    @ApiOperation({summary: "Get a single snack by id."})
    @ApiResponse({
        status: 200,
        description: "The requested Snack from the snackbox",
        type: Snack,
    })
    getSnack(@Param("snack_id") snack_id:string, @Response() res) {
        var snackResult = this.snackservice.getSnack(Number(snack_id))
        return res.status(200).json(snackResult)
    }

    @Delete(":snack_id")
    @ApiOperation({summary: "Delete a snack by id."})
    @ApiResponse({
        status:200,
        description: "The Snack has been deleted successfully.",
        type: Boolean
    })
    deleteSnack(@Param("snack_id") snack_id:string, @Response() res) {
        var snack = this.snackservice.getSnack(Number(snack_id))
        return res.status(200).json(this.snackservice.deleteSnack(snack))
    }
}
