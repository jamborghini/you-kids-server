import { SetMetadata } from '@nestjs/common';

export const MinRole = (MinRole: number) => SetMetadata('role', MinRole);
