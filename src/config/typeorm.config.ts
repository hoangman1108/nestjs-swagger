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
  host: 'ec2-54-172-219-218.compute-1.amazonaws.com',
  port: 5432,
  username: 'xcgsokpbekmhnz',
  password: '7bf1dd9efefe7f114e7c1069aefc22da34d642cb4166c88bea89c9aacb9a73f8',
  database: 'dbhff829s08gea',
  entities: [__dirname+'/../**/*.entity.{ts,js}'],
  synchronize: true,
  ssl: { rejectUnauthorized: false }
};