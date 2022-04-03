import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller({ path: '', version: VERSION_NEUTRAL })
export class appController {
  @Get()
  @ApiOperation({
    summary: 'get server time',
    operationId: 'indexOperation',
  })
  @ApiOkResponse({
    description: 'The survey time',
  })
  index(): string {
    return new Date().toISOString();
  }
}
