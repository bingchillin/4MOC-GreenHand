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

  async findOne(id: string) {
    return await this.userDocumentModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    const existingUser = await this.userDocumentModel
      .findByIdAndUpdate({ _id: id }, { ...updateUserDto, password: hashedPassword }, { new: true })
      .exec();

    return existingUser;
  }

  async remove(id: string) {
    const result = await this.userDocumentModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('User not found');
    }

    return `User with id ${id} has been deleted`;
  }
}
