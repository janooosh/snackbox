import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { count } from "console";
import { Snack } from "./snack";
import { SnackParams } from "./snackParams";

const fs = require("fs")

@Injectable()
export class SnacksService {

    getSnacks(snackParams?:SnackParams) {
        
        try {
            let snacks = fs.readFileSync("snackbox.json","utf8")
            snacks = JSON.parse(snacks)

            if(!snackParams) {
                return snacks
            } 
            if(!snackParams.minPrice && !snackParams.maxPrice) {
                return snacks;
            }           
            if(snackParams.minPrice && snackParams.maxPrice) {
                if(snackParams.minPrice > snackParams.maxPrice) {
                    throw new HttpException("minPrice must not be larger than maxPrice.", HttpStatus.BAD_REQUEST)
                }
                return snacks.filter(snack => snack.price >= snackParams.minPrice && snack.price < snackParams.maxPrice)
            }
            else if(snackParams.minPrice) {
                return snacks.filter(snack => snack.price >= snackParams.minPrice)
            }
            else if(snackParams.maxPrice) {
                return snacks.filter(snack => snack.price <= snackParams.maxPrice)
            }
            
        }
        catch(err)
        {
            console.log("File can not be read: ",err)
            throw new HttpException("Oh no, the Snackbox is missing :(",HttpStatus.NOT_FOUND)
        }
    }

    getSnack(snack_id:number) {
        var snacks = this.getSnacks();
        var snackResult = snacks.find(snack => snack.id === snack_id)

        if(!snackResult) {
            throw new HttpException("The Snack is not found", HttpStatus.NOT_FOUND)
        }
        return snackResult
    }

    createSnack(snack:Snack) {
        var snackbox = this.getSnacks()

        if(snackbox.length > 0) {
            let maxId = snackbox[snackbox.length-1].id
            snack.id = maxId+1
        }
        else {
            snack.id = 1
        }

        snackbox.push(snack)

        this.updateSnackbox(snackbox)
        return snack
    }

    updateSnackbox(snacks:[JSON]) {
        fs.writeFile("snackbox.json",JSON.stringify(snacks,null,2), function(err) {
            if(err) {
                console.error("Can not update the Snackbox")
                console.error(err)
            }
        })
    }

    deleteSnack(snack:Snack):boolean {
        var snackbox = this.getSnacks();
        var newSnackbox = snackbox.filter(s => s.id != snack.id)

        this.updateSnackbox(newSnackbox)
        return true
    }

    
}