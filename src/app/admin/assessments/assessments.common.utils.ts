import * as moment from 'moment'; //in your component
export class AssesmentsUtil {
  getDuration(duration: number): string {
    let durationText = '';
    if (duration < 60) {
      durationText = `${this.getFixedDuration(duration)} Mins`;
    } else if (duration === 60) {
      durationText = `1 Hr`;
    } else {
      durationText = `${this.getFixedDuration(duration / 60)} Hrs`;
    }
    return durationText;
  }

  getFixedDuration(duration) {
    if (Number.isInteger(duration)) {
      return duration;
    } else {
      var rhours = Math.floor(duration);
      var minutes = (duration - rhours) * 60;
      var rminutes = Math.round(minutes);
      return Number(rhours + '.' + rminutes).toFixed(2);
    }
  }
  getUpdateTime(time: string, status: string): string {
    let dateOn = moment(time).format('MM-DD-YYYY');
    let today = moment();
    // const date = new Date(time);
    // const currentTime = new Date();
    // const differenceInTime = currentTime.getTime() - date.getTime();
    // const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const differenceInDays = today.diff(dateOn, 'days');
    let updateTimeText = '';
    if (Math.trunc(differenceInDays) < 1) {
      updateTimeText = 'today';
    } else {
      updateTimeText = `${Math.trunc(differenceInDays) == 1 ? Math.trunc(differenceInDays) + ' day ago' : Math.trunc(differenceInDays) + ' days ago'}`;
    }
    return status === 'Draft' ? `created ${updateTimeText}` : updateTimeText;
  }
}
