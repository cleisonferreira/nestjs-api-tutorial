import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EnvironmentService } from 'src/environment/environment.service';


@Injectable()
export class PrismaService extends PrismaClient
{
    constructor(env: EnvironmentService)
    {
        super({
            datasources: {
                db: {
                    url: env.db.url,
                }
            }
        });
    }
}

