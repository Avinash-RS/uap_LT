import { HourAndMinuteModel } from './task-card/task-cards.model';

export class LandingPageUtils {
  getHourAndMinutes(taskDuration: number): HourAndMinuteModel {
    const hours = Math.floor(taskDuration / 60);
    const minutes = Math.round((taskDuration / 60 - hours) * 60);
    return { hour: hours, minute: minutes };
  }

  getDurationMessage(hourAndModel: HourAndMinuteModel): string {
    if (!hourAndModel.hour) {
      return `${hourAndModel.minute} Minute`;
    } else if (!hourAndModel.minute) {
      return `${hourAndModel.hour} Hour`;
    } else {
      return `${hourAndModel.hour} Hour and ${hourAndModel.minute} Minute`;
    }
  }
}
