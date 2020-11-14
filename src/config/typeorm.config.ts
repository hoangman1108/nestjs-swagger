import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type:'postgres',
//   host:'172.17.0.1' ,
//   port: 5432,
//   username: 'postgres',
//   password: 'root',
//   database: 'taskmanament',
//   entities: [__dirname+'/../**/*.entity.{ts,js}'],
//   synchronize: true,
//   // ssl: { rejectUnauthorized: false } // 
// };

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-54-196-89-124.compute-1.amazonaws.com',
  port: 5432,
  username: 'hmnbuhicrdudfo',
  password: 'dea2cab953a92d623469b8f40cffe34d2a6cc03d30afc56d2c75cee303970cda',
  database: 'd677d7teiohoma',
  entities: [__dirname+'/../**/*.entity.{ts,js}'],
  synchronize: true,
  ssl: { rejectUnauthorized: false }
};