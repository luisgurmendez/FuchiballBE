import moment from 'moment';

export class DateUtil {

  /**
   * @static
   * @param date The starting date
   * @param dayIndex The index of a day [0,1,2,3,4,5,6] = [Sun, Mon, ... , Sat ]
   * @returns Returns the next instance of a specific day
   */
  static getNextSpecificDay(date: Date, dayIndex: number): Date {

    const mDate = moment(date);
    mDate.add(1, 'day');
    mDate.day(dayIndex);
    return mDate.toDate();
  }
}

