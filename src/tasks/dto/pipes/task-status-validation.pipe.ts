import { PipeTransform } from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    console.log('value', value);
    return value;
  }
}