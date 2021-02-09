import moment from 'moment'

export default class DateTime {
  /* Handle date time */
  static handleDateOfBirth = (date: Date) => {
    const dateOfBirth = `${moment(date).format('M')}
            / ${moment(date).format('D')}
            / ${moment(date).format('YYYY')}`
    return dateOfBirth;
  }
}