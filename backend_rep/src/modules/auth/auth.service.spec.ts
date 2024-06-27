import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { RESPONSE_MESSAGES } from 'src/common/constants';
import { PrismaModule } from '../prisma/prisma.module';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  const testUsers = [
    {
      email: 'demo-account@email.test.com',
      password: 'password',
    },
    {
      email: 'demo-account-2@email.test.com',
      password: 'password',
    },
  ];

  const testErrorUsers = {
    userNotFound: {
      email: 'user-not-found@gmail.com',
      password: 'password',
    },

    userWrongPassword: {
      email: 'demo-account@email.test.com',
      password: 'wrong-password',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const data = testUsers[0];
    const { data: user, err } = await service.register(data);
    expect(user.email).toBe(data.email);
    expect(user.password).not.toBe(data.password);
    expect(user.id).toBeDefined();
    expect(err).toBeUndefined();
  });

  it('should register fail if email already exists', async () => {
    const data1 = testUsers[0];
    const data2 = testUsers[0];

    const { data: user1, err: err1 } = await service.register(data1);
    const { data: user2, err: err2 } = await service.register(data2);

    expect(user1).toBeUndefined();
    expect(err1).toBeDefined();
    expect(
      err1 instanceof Prisma.PrismaClientKnownRequestError &&
        err1.code === 'P2002',
    ).toBeTruthy();

    expect(user2).toBeDefined();
    expect(err2).toBeUndefined();
  });

  it('should login a user', async () => {
    const data = testUsers[0];

    const { data: token, err } = await service.login(data);
    expect(token).toBeDefined();
    expect(err).toBeUndefined();
  });

  it('should fail if user not found', async () => {
    const { data: token, err } = await service.login(
      testErrorUsers.userNotFound,
    );
    expect(token).toBeUndefined();
    expect(err).toBe({
      message: RESPONSE_MESSAGES.ERROR_USER_NOT_FOUND,
    });
  });

  it('should fail if password incorrect', async () => {
    const { data: token, err } = await service.login(
      testErrorUsers.userWrongPassword,
    );
    expect(token).toBeUndefined();
    expect(err).toBe({
      message: RESPONSE_MESSAGES.ERROR_PASSWORD_INCORRECT,
    });
  });

  // CLEAN
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: testUsers.map((user) => user.email),
        },
      },
    });
    await prisma.$disconnect();
  });
});
