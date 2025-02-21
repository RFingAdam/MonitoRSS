import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserModel } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async initDiscordUser(discordUserId: string) {
    const exists = await this.userModel.exists({ discordUserId }).lean();

    if (!exists) {
      await this.userModel.create({
        discordUserId,
      });
    }
  }
}
