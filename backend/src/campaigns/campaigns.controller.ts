import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './campaign.entity';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.campaignsService.findOne(+id);
  }

  @Post()
  create(@Body() campaign: Campaign) {
    return this.campaignsService.create(campaign);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() campaign: Campaign) {
    return this.campaignsService.update(+id, campaign);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.campaignsService.remove(+id);
  }
}
