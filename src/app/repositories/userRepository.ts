import { User } from "../../types/user.type";
import { PrismaClient } from '@prisma/client'

class UserRepository {
  prisma = new PrismaClient()

  async createUser(user: User) {
    return await this.prisma.user.create({data: user});
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {email: email}
    })
  }
}

export default new UserRepository;