import { Controller, Get, Param } from 'routing-controllers';
import 'reflect-metadata';

@Controller()
export class UserController {
  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return 'This action returns user #' + id;
  }
}