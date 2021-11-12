import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/database/models/user.model";
import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";
import { JwtModule } from "@nestjs/jwt";
import { userController } from "./user.controller";
import { userService } from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRATION_TIME,
                },
            }),
        }),
    ],
    controllers: [userController],
    providers: [userService],
})
export class userModule { }