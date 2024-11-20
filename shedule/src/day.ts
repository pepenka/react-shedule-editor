import Lesson from './lesson';
class DayLessons {
    public day_number: number = 1;
    public subjects: Lesson[] = [];

    constructor(day: number) {
        this.day_number = day;
    }
}

export default DayLessons;