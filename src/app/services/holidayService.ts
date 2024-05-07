class HolidayService {

  formatDate(date: string): number {
    const timestamp = new Date(date).getTime();
    return timestamp;
  }

  isToday(currentTimestamp: number, nextTimestamp: number): boolean {
    const start = this.transformDate(currentTimestamp);
    const end = this.transformDate(nextTimestamp);
    console.log(start)
    console.log(end)
    return start === end;
  }

  transformDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString();

    return day 
  }

}

export default new HolidayService;