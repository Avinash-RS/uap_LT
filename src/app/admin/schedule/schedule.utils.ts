export class ScheduleUtils {
  getScheduledOn(ScheduledTime: string): string {
    const scheduledDate = new Date(ScheduledTime);
    const month = scheduledDate.getMonth();
    const year = scheduledDate.getFullYear();
    const date = scheduledDate.getDate();
    let hh = scheduledDate.getHours();
    const m = scheduledDate.getMinutes();
    let dd = 'AM';
    if (hh >= 12) {
      hh = hh - 12;
      dd = 'PM';
    }
    if (hh === 0) {
      hh = 12;
    }
    let minutext;
    if (m < 10) {
      minutext = `0${m}`;
    } else {
      minutext = m;
    }
    let hourText;
    if (hh < 10) {
      hourText = `0${hh}`;
    } else {
      hourText = hh;
    }
    const timeText = `${hourText}:${minutext} ${dd}`;
    const scheduledTimeOn = `${date}-${this.getMonth(month)}-${year} ${timeText}`;
    return scheduledTimeOn;
  }
  getMonth(month: number): string {
    const allMonth = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC'
    ];
    const monthText = allMonth[month];
    return monthText;
  }
}
