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
    try {
      const existingUser = await this.userDocumentModel.findOne({ email: createUserDto.email }).lean().exec();

      if (existingUser) {
        return 'User already exists';
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = new this.userDocumentModel({
        ...createUserDto,
        password: hashedPassword
      });

      return newUser.save();
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.userDocumentModel.find().lean().exec();
    } catch (error) {
      throw new Error(`Failed to find all users: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      return this.userDocumentModel.findById(id).lean().exec();
    } catch (error) {
      throw new Error(`Failed to find user by id: ${error.message}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.userDocumentModel.findById(id).lean().exec();
      if (!existingUser) {
        throw new Error('User not found');
      }

      let hashedPassword = existingUser.password;

      if (updateUserDto.password && !(bcrypt.compare(updateUserDto.password, existingUser.password))) {
        hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      }

      const res = await this.userDocumentModel
          .findByIdAndUpdate({ _id: id }, { ...updateUserDto, password: hashedPassword }, { new: true })
          .lean()
          .exec();

      return res;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.userDocumentModel.deleteOne({ _id: id }).lean().exec();

      if (result.deletedCount === 0) {
        throw new Error('User not found');
      }

      return `User with id ${id} has been deleted`;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}