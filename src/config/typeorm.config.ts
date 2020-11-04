import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type:'postgres',
  host:process.env.ORM_HOST || 'localhost' ,
  port:Number(process.env.ORM_PORT) || 5432,
  username: process.env.ORM_USERNAME ||'postgres',
  password: process.env.ORM_PASSWORD ||'root',
  database: process.env.ORM_DATABASE ||'taskmanament',
  entities: [__dirname+'/../**/*.entity.{ts,js}'],
  synchronize: true,
  ssl: { rejectUnauthorized: false }
};