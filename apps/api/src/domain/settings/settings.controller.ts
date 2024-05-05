import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LEVEL_STEPS } from '@constants/levels.constants';
import { ROUTES } from '@constants/routes.constants';

@ApiTags(ROUTES.settings)
@Controller(ROUTES.settings)
export class SettingsController {
  @ApiOperation({ summary: 'Get game settings' })
  @ApiResponse({ status: 200, type: '' })
  @ApiResponse({ status: 404, description: 'Garden was not found' })
  @Get('')
  public async getGameSettings(): Promise<any> {
    const settings = {
      levelSteps: LEVEL_STEPS
    };

    return settings;
  }
}
