import { ApiProperty } from '@nestjs/swagger';

export class ScheduleIdDto {
  @ApiProperty()
  scheduleId: string;
}
