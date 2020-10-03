import { Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { UsersModule } from './modules/users/users.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/users', { useNewUrlParser: true }),
  ],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  configure() {}
}
