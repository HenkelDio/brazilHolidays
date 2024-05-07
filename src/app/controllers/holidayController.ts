import holidayRepository from '../repositories/holidayRepository.ts';

class HolidayController {
  findAll() {
    return holidayRepository.findAll();
  }

  findNextHoliday() {
    return holidayRepository.findNextHoliday();
  }
}

export default new HolidayController;