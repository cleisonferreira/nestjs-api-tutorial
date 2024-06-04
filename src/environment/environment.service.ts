import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface Application
{
    readonly name: string;
    readonly protocol: string;
    readonly host: string;
    readonly port: number;
    url: string;
}

interface DataBase
{
    readonly connector: string;
    readonly name: string;
    readonly port: number;
    readonly user: string;
    readonly passwd: string;
    readonly parameters: string;
    url: string;
}

interface Jwt
{
    secret: string;
    expiresIn: string;
}

@Injectable()
export class EnvironmentService 
{
    public app: Application;
    public db: DataBase;
    public jwt: Jwt;

    constructor(config: ConfigService)
    {
        //console.log(config);

        this.initApp(config);
        this.initDb(config);
        this.initJwt(config);

    }

    private initApp(config: ConfigService)
    {
        this.app = {
            name: config.get('APP_NAME'),
            protocol: config.get('APP_PROTOCOL'),
            host: config.get('APP_HOST'),
            port: config.get('APP_PORT'),
            url: ''
        };

        this.app.url = `${this.app.protocol}://${this.app.host}:${this.app.port}`;
    }

    private initDb(config: ConfigService)
    {
        this.db = {
            connector: config.get('DATABASE_CONNECTOR'),
            name: config.get('DATABASE_NAME'),
            port: config.get('DATABASE_PORT'),
            user: config.get('DATABASE_USER'),
            passwd: config.get('DATABASE_PASSWD'),
            parameters: config.get('DATABASE_PARAMETERS'),
            url: config.get('DATABASE_URL'),
        };

        this.db.url = `${this.db.connector}://${this.db.user}:${this.db.passwd}@localhost:${this.db.port}/${this.db.name}${this.db.parameters}`;
    }

    private initJwt(config: ConfigService)
    {
        this.jwt = {
            secret: config.get('JWT_SECRET'),
            expiresIn: config.get('JWT_EXPIRES_IN'),
        };
    }

    private baseUrpl;

}