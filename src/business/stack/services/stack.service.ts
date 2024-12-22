import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Stack } from '../entities/stack.entity';
import { ConfigService } from '@nestjs/config';
import { CreateStackDto } from '../dto/createStack.dto';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StackService {
  constructor(
    @InjectRepository(Stack)
    private stackRepository: Repository<Stack>,
    private configService: ConfigService,
  ) {}

  async getAllStackRecords(): Promise<Stack[]> {
    return await this.stackRepository.find();
  }

  async createStackRecord(options: { body: CreateStackDto }): Promise<Stack> {
    const { stack, level, email } = options.body;

    const existingEmail = await this.stackRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new BadRequestException('Email must be unique');
    }

    const records = await await this.stackRepository.find();
    const lastRecord = records[records.length - 1];
    const newRecord = this.stackRepository.create({
      id: lastRecord.id + 1,
      stack,
      level,
      email,
    });

    await this.sendEmail(newRecord.id, email, level, stack);

    await this.stackRepository.save(newRecord);

    return newRecord;
  }

  private async sendEmail(
    id: number,
    email: string,
    level: string,
    stack: string,
  ): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        host: 'gurtam-fortune.com',
        port: 465,
        secure: true,
        auth: {
          user: this.configService.getOrThrow('EMAIL_USER'),
          pass: this.configService.getOrThrow('EMAIL_PASSWORD'),
        },
      });

      await transporter.sendMail({
        from: 'noreply@gurtam-fortune.com',
        to: email,
        subject: 'Your Draw Number — Gurtam Fortune Cookies',
        html: `
        Hello there, 
        <br><br>
        Gurtam person here! Thank you for being a part of our exciting online project where we delved into the career predictions for 2025. We hope you found out the exciting insights about your future. Your engagement adds tremendous value to our initiative!
        <br><br>
        Your unique code for the prize giveaway is ${id}. The results will be announced on the 16th of January, at 16.00 on our official <a href="https://www.instagram.com/gurtam_people/">instagram page</a>
        <br><br>
        We wish you the best of luck!
        <br><br>
        If you're ready to take your skills to the next level, seize the opportunity! <a href="https://gurtam.com/en/jobs">Click</a> to find out how to secure a real interview at Gurtam.
        <br><br>
        Thank you for your participation and attention! Looking forward to crossing paths again on the pages of our project.
        <br><br>
        Best Regards,
        <br>
        Gurtam People
        `,
      });
    } catch (error) {
      throw new BadRequestException('Error sending email.' + error);
    }
  }
}
