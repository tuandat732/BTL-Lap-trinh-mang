import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { gpslog } from "src/database/models/gps.model";
import { Model } from 'mongoose';
import { ApiOK } from "src/common/responses/api-ok";
import { ApiError } from "src/common/responses/api-error";
import { JwtService } from "@nestjs/jwt";
import { Utils } from "../../common/utils/ultis";

@Injectable()
export class gpsService {
    constructor(
        @InjectModel('gpslog') private readonly gpsModel: Model<gpslog>,
        private readonly jwtService: JwtService,
    ) { }
    async gpsgetlog(data: any, request) {
        const admin = Utils.decodeJwtService(request.headers['authorization'], this.jwtService);
        console.log(admin)
        if (admin['role'] !== 'admin') throw new ApiError('Bạn không có quyền để thực hiện hành động này', "E3");
        let offset = Number(data.offset) || 0
        let limit = Number(data.limit) || 0
        let userId = data.userId
        try {
            let searchres = await this.gpsModel.findOne({ userId: userId })
                .skip(offset)
                .limit(limit)
                .lean()

            let res = searchres
            return new ApiOK({
                result: searchres.logLocation
            })

        } catch (err) {
            return new ApiError(err.message)
        }
    }

}