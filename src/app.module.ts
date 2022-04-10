import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PlacesModule } from './places/places.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PlacesModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
