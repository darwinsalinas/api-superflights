import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDto } from './dto/flight.dto';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { PassengerService } from '../passenger/passenger.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('flights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flights')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  create(@Body() flightDto: FlightDto) {
    return this.flightService.create(flightDto);
  }

  @Get()
  index(): Promise<FlightDto[]> {
    return this.flightService.index();
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<IFlight> {
    return this.flightService.show(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() flightDto: FlightDto) {
    return this.flightService.update(id, flightDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.flightService.delete(id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengerService.getOne(passengerId);
    if (!passenger) {
      throw new NotFoundException('Passenger not found');
    }
    return this.flightService.addPassenger(flightId, passengerId);
  }
}
