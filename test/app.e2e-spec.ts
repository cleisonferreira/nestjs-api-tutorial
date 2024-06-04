import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto, SignupDto } from 'src/auth/dto';
import { EnvironmentService } from 'src/environment/environment.service';

describe('App e2e', () =>
{
  let app: INestApplication;
  let prisma: PrismaService;
  let environment: EnvironmentService;

  beforeAll(async () =>
  {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true })
    );

    await app.init();

    environment = app.get(EnvironmentService);

    await app.listen(environment.app.port);

    prisma = app.get(PrismaService);

    await prisma.clearDb();
  });

  describe('App e2e is running', () =>
  {
    it('should run', () =>
    {
      return pactum.spec()
      .get(environment.app.url)
      .expectStatus(404);
    });
  });

  describe('Auth', () =>
  {

    describe('Signup', () =>
    {
      const dto: SignupDto = {
        firstName: 'User',
        lastName: 'One',
        email: 'user1@email.com',
        password: '123'
      };

      it('should signup', () =>
      {
        return pactum
          .spec()
          .post(`${environment.app.url}/auth/signup`)
          .withBody(dto)
          .expectStatus(201);
      });
    });

    /*
    describe('Signin', () =>
    {
      it.todo('should signin');
    });
    */
  });

  /*
    describe('User', () =>
    {
      describe('Get me', () =>
      {
  
      });
  
      describe('Edit user', () =>
      {
  
      });
    });
  
    describe('Bookmarks', () =>
    {
      describe('Create bookmark', () =>
      {
  
      });
  
      describe('Get bookmark', () =>
      {
  
      });
  
      describe('Get by id', () =>
      {
  
      });
  
      describe('Edit bookmark', () =>
      {
  
      });
  
      describe('Delete bookmark', () =>
      {
  
      });
    });
  */
  it.todo('should pass');


  afterAll(() =>
  {
    app.close();
  });
});
