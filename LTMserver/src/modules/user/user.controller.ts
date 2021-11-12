import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    Post,
    Request,
    Param,
    Delete,
    Put,
    Query
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { Auth } from "../../common/decorator/auth.decorator";
import { AppConfig } from "../../common/contants/app-config";
import { ApiError } from "../../common/responses/api-error";
import { isEmpty } from 'class-validator';
import { getlistuser } from './user.dto';
import { userService } from './user.service';
@Controller('user')
@ApiTags('user')
export class userController {
    constructor(private readonly userService: userService) { }
    @Get('/getListUser')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get location " })
    async getListuser(@Query() data: getlistuser, @Request() request) {
        return await this.userService.getlistuser(data, request);

    }
    @Get('/getMe')
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Get location " })
    async getMe(@Request() request) {
        return await this.userService.getme(request);

    }
}