class Lesson {
    public name: string;
    public room: string;
    public teacher: string;
    public type_id: number;
    public building_id: number;
    public start_time: string;
    public end_time: string;

    constructor(name: string, room: string, teacher: string,
        type_id: string, building_id: string, start_time: Date, end_time: Date) {
        this.name = name;
        this.room = room;
        this.teacher = teacher;
        switch (type_id) {
            case 'Лабораторная работа':
                this.type_id = 1;
                break;
            case 'Практика':
                this.type_id = 2;
                break;
            case 'Лекция':
                this.type_id = 3;
                break;
            default:
                this.type_id = 4;
                break;
        }
        //this.type_id = Number.parseInt(type_id);
        this.building_id = Number.parseInt(building_id);

        this.start_time = `${start_time.getHours().toString().padStart(2, '0')}:${start_time.getMinutes().toString().padStart(2, '0')}`;
        this.end_time = `${end_time.getHours().toString().padStart(2, '0')}:${end_time.getMinutes().toString().padStart(2, '0') }`;
    }
}

export default Lesson;