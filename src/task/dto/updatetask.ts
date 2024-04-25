import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class updateTaskDto {
  @ApiProperty({
    default: 'Updated Title',
  })
  @IsOptional()
  title?: string;

  @ApiProperty({
    default: 'Updated Description',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    default: 'pending',
  })
  @IsOptional()
  @IsEnum(['pending', 'in progress', 'completed'], {
    message:
      'Status must be one of the following: pending, in progress, completed',
  })
  status?: string;

  @ApiProperty({
    default: 1,
  })
  @IsOptional()
  priority?: number;
}
