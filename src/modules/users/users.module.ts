import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UpdateUserUseCaseSymbol,
  UpdateUserPasswordUseCaseSymbol,
} from '@/domains/ports/in';
import {
  UpdateUserService,
  UpdateUserPasswordService,
} from '@/domains/services';
import { UserRepositoryPort } from '@/domains/ports/out/user-repository.port';
import { UserOrmEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersRepository,
    {
      provide: UpdateUserUseCaseSymbol,
      useClass: UpdateUserService,
    },
    {
      provide: UpdateUserPasswordUseCaseSymbol,
      useClass: UpdateUserPasswordService,
    },
    {
      provide: UpdateUserUseCaseSymbol,
      useFactory: (_userRepository: UserRepositoryPort) => {
        return new UpdateUserService(_userRepository);
      },
      inject: [UsersRepository],
    },
    {
      provide: UpdateUserPasswordUseCaseSymbol,
      useFactory: (_userRepository: UserRepositoryPort) => {
        return new UpdateUserPasswordService(_userRepository);
      },
      inject: [UsersRepository],
    },
  ],
  exports: [UsersRepository, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
})
export class UsersModule {}
