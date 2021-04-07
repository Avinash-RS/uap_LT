export class AdminUtils {
  timeConversion(scheduleTime: string): string {
    const time = scheduleTime.toLowerCase().split(':');
    // tslint:disable-next-line: radix
    const hours = parseInt(time[0]);
    const amPm = time[1];
    if (amPm.indexOf('am') !== -1 && hours === 12) {
      time[0] = '00';
    }
    if (amPm.indexOf('pm') !== -1 && hours < 12) {
      time[0] = (hours + 12).toString();
    }
    return (
      time
        .join(':')
        .replace(/(am|pm)/, '')
        .trim() + ':00'
    );
  }
}
