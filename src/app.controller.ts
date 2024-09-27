import { Controller, Post, Get, Body, ForbiddenException  } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentDto } from './payment.dto';
// import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async Payment(@Body() payment: PaymentDto): Promise<string> {
    const baseUrl = {sandbox :   "https://app-demo.payadmit.com",
                     production: "https://app.payadmit.com"}

  //   const paymantPayadmit = {
  //     "paymentType": "DEPOSIT",
  //     "paymentMethod": "BASIC_CARD",
  //     "amount": payment.amount.toString(),
  //     "currency": payment.currency
  // }

    const headers : AxiosRequestConfig = {
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": "Bearer DmEyeLK5kF3LsGXe3rR5VFNo3xaah95e"
      },
      // validateStatus: function (status: number) {
      //   return status === 200;
      // },
    };

    console.log(payment)

    var data : string = ''

    // пример get запрса
    // const response = await axios
    // .get('https://app-demo.payadmit.com/api/v1/payments', headers)
    // .catch((error) => {
    //   result = JSON.stringify(error.response.data)
    //   return result
    //       // throw new ForbiddenException('API not available');
    // });

    const response = await axios
    .post(baseUrl.sandbox + '/api/v1/payments', payment, headers)
    .then((result) => {
      data = JSON.stringify(result.data)
    })
    .catch((error) => {
      data = JSON.stringify(error.response.data)
          // throw new ForbiddenException('API not available');
    });

    return data
  }
}
