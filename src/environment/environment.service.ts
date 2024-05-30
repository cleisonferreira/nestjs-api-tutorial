import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface Application
{
    readonly name: string;
    readonly host: string;
    readonly port: number;
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

@Injectable()
export class EnvironmentService 
{
    public app: Application;
    public db: DataBase;

    constructor(config: ConfigService)
    {
        //console.log(config);

        this.initApp(config);
        this.initDb(config);

    }
    private initApp(config: ConfigService)
    {
        this.app = {
            name: config.get('APP_NAME'),
            host: config.get('APP_HOST'),
            port: config.get('APP_PORT')
        };
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
        
        this.db.url=`${this.db.connector}://${this.db.user}:${this.db.passwd}@localhost:${this.db.port}/${this.db.name}${this.db.parameters}`;
    }

}