import moment from 'moment'

export default class HandleCommon {
  /* Handle date time */
  static handleDateOfBirth = (date: Date | string) => {
    const dateOfBirth = `${moment(date).format('M')}
            / ${moment(date).format('D')}
            / ${moment(date).format('YYYY')}`
    return dateOfBirth;
  }

  /* Convert Bytes */
  static formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}