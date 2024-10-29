import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityQueryModule } from './city-query/city-query.module';

@Module({
  imports: [CityQueryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
