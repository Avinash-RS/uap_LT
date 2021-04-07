export class AssesmentsUtil {
  getDuration(duration: number): string {
    let durationText = '';
    if (duration < 60) {
      durationText = `${duration} Mins`;
    } else if (duration === 60) {
      durationText = `1 Hr`;
    } else {
      durationText = `${duration / 60} Hrs`;
    }
    return durationText;
  }
  getUpdateTime(time: string, status: string): string {
    const date = new Date(time);
    const currentTime = new Date();
    const differenceInTime = currentTime.getTime() - date.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    let updateTimeText = '';
    if (Math.trunc(differenceInDays) <= 1) {
      updateTimeText = 'today';
    } else {
      updateTimeText = `${Math.trunc(differenceInDays)} days ago`;
    }
    return status === 'Draft' ? `created ${updateTimeText}` : updateTimeText;
  }
}
