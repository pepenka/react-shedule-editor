import  Day  from './day';
class Week {
    public is_even: boolean;
    public days: Day[];

    constructor(is_even: boolean, days: Day[]) {
        this.is_even = is_even;
        this.days = days;
    }
}

export default Week;