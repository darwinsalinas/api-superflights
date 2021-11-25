import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PassengerDto } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@Controller('api/v1/passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() passengerDto: PassengerDto) {
    return this.passengerService.create(passengerDto);
  }

  @Get()
  getAll() {
    return this.passengerService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.passengerService.getOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() passengerDto: PassengerDto) {
    return this.passengerService.update(id, passengerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.passengerService.delete(id);
  }
}
