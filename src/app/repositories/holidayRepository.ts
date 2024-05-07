import moment from 'moment';
import holidays from '../../data/holidays';
import holidayService from '../services/holidayService';

class HolidayRepository {
  findAll() {
    return holidays;
  }

  findNextHoliday() {
    const date = new Date();
    const timestamp = date.getTime();
    const nextHoliday = holidays.filter(item => holidayService.formatDate(item.date) > timestamp)[0];
    
    if (nextHoliday) {
      let remainingDays: number = 0;

      if(!moment(nextHoliday.date, 'DD/MM/YYYY').isSame(moment(timestamp), 'days')) {
        remainingDays = moment(nextHoliday.date, 'DD/MM/YYYY').diff(moment(timestamp), 'days') + 1
      }
  
      const response = {
        remainingDays,
        ...nextHoliday
      };
  
      return response;
    } else {
      return null;
    }
  }
}

export default new HolidayRepository;