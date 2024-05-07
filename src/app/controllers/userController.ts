import { Response } from "express-serve-static-core";
import { User } from "../../types/user.type";
import userRepository from "../repositories/userRepository";
import { logger } from "../../utils/logger";
import { compare, hash } from 'bcryptjs';
import { UserDTO } from "../../dtos/user.dto";
import jsonwentoken from 'jsonwebtoken';

class UserController {
  async create(req: {body: User}, res: Response) {
  
    const user: User = req.body;

    const emailAlreadyTaken = await userRepository.findUserByEmail(user.email);

    if(emailAlreadyTaken) {
      logger.error(`E-mail already taken`);
      return res.status(409).json({ message: 'Internal server error', details: 'E-mail already taken' });
    }

    const hashedPassword = await hash(user.password, 12);
    user.password = hashedPassword;
    
    try {
      const createdUser = await userRepository.createUser(user);
      logger.info(`User ${createdUser.id} created`);
      res.status(201).json(createdUser);
      
    } catch (e) {

      logger.error(`Error on create user ${e}`);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async login(req: {body: UserDTO}, res: Response) {
    const { email, password } = req.body;

    const user = await userRepository.findUserByEmail(email);
    
    if(!user) {
      logger.error(`Error login`);
      return res.status(401).json({message: 'Invalid credentials', details: 'User does not exists'})
    }

    const isPasswordValid = await compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json({message: 'Invalid credentials', details: 'Wrong password'})
    }

    const token =  jsonwentoken.sign(
      {sub: user.id},
      process.env.JWT_KEY!!,
      { expiresIn: '7d'})
    
    return res.status(202).json({ sucess: 'true', token: token})

  }
}

export default new UserController;