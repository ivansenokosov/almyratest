import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({
    baseURL: 'https://app-demo.payadmit.com', // Your API base URL
    timeout: 5000, // Timeout value in milliseconds
    // Other Axios configuration options
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Check Dependency Injection:
// import { Injectable } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';

// @Injectable()
// export class MyController {
//   constructor(private readonly httpService: HttpService) {
//     // ...
//   }
// }
// Avoid injecting AXIOS_INSTANCE_TOKEN directly as it might lead to dependency resolution issues.
// Check Import Statements:
// Ensure that you are importing HttpService from @nestjs/axios and not from any other` location or external library.
// import { HttpService } from '@nestjs/axios';
