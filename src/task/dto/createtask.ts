import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    default: 'Task Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    default: 'Task Description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    default: 1,
  })
  @IsInt()
  priority: number;

  @ApiProperty({
    default: 'pending',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['pending', 'in progress', 'completed'], {
    message:
      'Status must be one of the following: pending, in progress, completed',
  })
  status: string;
}
