import { SetMetadata } from '@nestjs/common';

export const Role = Symbol('role');
export const MinRole = (MinRole: number) => SetMetadata(Role, MinRole);
