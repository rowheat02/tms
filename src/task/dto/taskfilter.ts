import { IsEnum, IsOptional } from 'class-validator';

export class taskFilterDto {
  @IsOptional()
  @IsEnum(['pending', 'in progress', 'completed'], {
    message:
      'Status must be one of the following: pending, in progress, completed',
  })
  status?: string;

  @IsOptional()
  priority?: number;
}
