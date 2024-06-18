import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userDocumentModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userDocumentModel.findOne({ email: createUserDto.email }).exec();

    if (existingUser) {
      return 'User already exists';
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userDocumentModel({
      ...createUserDto,
      password: hashedPassword
    });

    return newUser.save();
  }

  findAll() {
    return this.userDocumentModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
