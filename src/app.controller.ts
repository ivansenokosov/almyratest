import { Controller, Post, Body  } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentDto } from './payment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async Payment(@Body() payment: PaymentDto): Promise<string> {
    return this.appService.send(payment);
  }
}
