import { applyDecorators } from '@nestjs/common';
import { IsInt, IsPositive } from 'class-validator';

export function IsId(): PropertyDecorator {
  return applyDecorators(IsInt(), IsPositive());
}
