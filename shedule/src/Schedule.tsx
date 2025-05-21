/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import './App.css'
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, Inject, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { removeClass } from '@syncfusion/ej2-base';
import Lesson from './lesson';
import DayLessons from './day';
import ScheduleClass from './ScheduleClass';
import WeekLessons from './week';

function Schedule() {


    const onPopupOpen = (args: any) => {
        if (args.type === 'Editor') {
            const statusElement = args.element.querySelector('#EventType');
            if (statusElement) {
                statusElement.setAttribute('name', 'EventType');
            }
        }
    }

    const editorTemplate = (props) => {
        console.log(props);
        
        let date: Date;
        if (props.EndTime) {
            console.log(props.EndTime);
            date = props.EndTime;
            console.log(date);
            
            date.setHours(date.getHours() + 1);
            console.log(date);
        }

        return (props !== undefined ? <table className="custom-event-editor" > <tbody>
            <tr><td className="e-textlabel">Предмет</td><td colSpan={4}>
                <input id="Summary" className="e-field e-input" type="text" name="Subject"  />
            </td></tr>

            <tr><td className="e-textlabel">Препод</td><td colSpan={4}>
                <input id="teacher" className="e-field e-input" type="text" name="teacher" />
            </td></tr>

            <tr><td className="e-textlabel">Аудитория</td><td colSpan={4}>
                <input id="class" className="e-field e-input" type="text" name="class" />
            </td></tr>

            <tr><td className="e-textlabel">Тип занятия</td><td colSpan={4}>
                <DropDownListComponent
                    id="lessonType"
                    placeholder=''
                    data-name="lessonType"
                    className="e-field"
                    dataSource={['Лабораторная работа', 'Практика', 'Лекция', 'Другое']}
                    value={props.EventType || null}
                    name="lessonType">
                </DropDownListComponent>
            </td></tr>

            <tr><td className="e-textlabel">Корпус</td><td colSpan={4}>
                <DropDownListComponent
                    id="building" placeholder=''
                    data-name="building"
                    className="e-field"
                    dataSource={['1', '2', '3', '4', '5']}
                    value={props.EventType || null}>
                </DropDownListComponent>
            </td></tr>


            <tr><td className="e-textlabel">Начало в </td><td colSpan={4}>
                <DateTimePickerComponent
                    step={5}
                    format='HH:mm'
                    id="StartTime"
                    data-name="StartTime"
                    name="StartTime"
                    value={new Date(props.endTime || props.EndTime)}
                    className="e-field"

                    min={new Date(
                        new Date(props.endTime || props.EndTime).getFullYear(),
                        new Date(props.endTime || props.EndTime).getMonth(),
                        new Date(props.endTime || props.EndTime).getDay(), 8)}
                    max={new Date(
                        new Date(props.endTime || props.EndTime).getFullYear(),
                        new Date(props.endTime || props.EndTime).getMonth(),
                        new Date(props.endTime || props.EndTime).getDay(), 21, 20)}
                ></DateTimePickerComponent>
            </td></tr>

            <tr><td className="e-textlabel">Конец в </td><td colSpan={4}>
                <DateTimePickerComponent
                    step={5}
                    format='HH:mm'
                    id="EndTime"
                    data-name="EndTime"
                    value={date || new Date(props.endTime || props.EndTime)}
                    className="e-field"

                    min={new Date(
                        new Date(props.endTime || props.EndTime).getFullYear(),
                        new Date(props.endTime || props.EndTime).getMonth(),
                        new Date(props.endTime || props.EndTime).getDay(), 8)}
                    max={new Date(
                        new Date(props.endTime || props.EndTime).getFullYear(),
                        new Date(props.endTime || props.EndTime).getMonth(),
                        new Date(props.endTime || props.EndTime).getDay(), 21, 20)} >
                </DateTimePickerComponent>
            </td></tr>
        </tbody ></table > : <div></div>);
}

    const onRenderCell = (args: any) => {
        if (args.elementType === "dateHeader" || args.elementType === "monthCells") {
            removeClass(args.element.childNodes, "e-navigate");

            switch (args.date.getDay()) {
                case 0:
                    args.element.textContent = 'Воскресенье';
                    break;
                case 1:
                    args.element.textContent = 'Понедельник';
                    break;
                case 2:
                    args.element.textContent = 'Вторник';
                    break;
                case 3:
                    args.element.textContent = 'Среда';
                    break;
                case 4:
                    args.element.textContent = 'Четверг';
                    break;
                case 5:
                    args.element.textContent = 'Пятница';
                    break;
                case 6:
                    args.element.textContent = 'Суббота';
                    break;
            }
        }
    }

    let dataEvenWeek: any = [];
    const eventSettingsEvenWeek = { dataSource: dataEvenWeek };
    let dataNotEvenWeek: any = [];
    const eventSettingsNotEvenWeek = { dataSource: dataNotEvenWeek };

    const handleGetEventData = () => {
        const evenWeekDays: DayLessons[] = [new DayLessons(1), new DayLessons(2), new DayLessons(3), new DayLessons(4), new DayLessons(5), new DayLessons(6)];
        const notEvenWeekDays: DayLessons[] = [new DayLessons(1), new DayLessons(2), new DayLessons(3), new DayLessons(4), new DayLessons(5), new DayLessons(6)];

        dataEvenWeek.forEach((event: any) => {

            const lesson: Lesson = new Lesson(
                event.Subject,
                event.class,
                event.teacher,
                event.lessonType,
                event.building,
                new Date(event.StartTime),
                new Date(event.EndTime));
                
            evenWeekDays[new Date(event.StartTime).getDay() % 7 - 1].subjects.push(lesson);
        });

        dataNotEvenWeek.forEach((event: any) => {

            const lesson: Lesson = new Lesson(
                event.Subject,
                event.class,
                event.teacher,
                event.lessonType,
                event.building,
                new Date(event.StartTime),
                new Date(event.EndTime));
                
            notEvenWeekDays[new Date(event.StartTime).getDay() % 7 - 1].subjects.push(lesson);
        });

        const evenWeek = new WeekLessons(true, evenWeekDays);
        const notEvenWeek = new WeekLessons(false, notEvenWeekDays);

        const schedule = new ScheduleClass([evenWeek, notEvenWeek]);
        console.log(JSON.stringify(schedule));
    };

    return (
        <div>
            <div className='week-evennes-description'>Чётная неделя</div>
            <ScheduleComponent
                editorTemplate={editorTemplate.bind(this)}
                showQuickInfo={false}
                popupOpen={onPopupOpen.bind(this)}
                minDate={new Date(new Date(2025, 8, 1))}
                maxDate={new Date(new Date(2025, 8, 6, 21, 20))}
                startHour='08:00'
                endHour='21:20'
                workHours={{ highlight: true, start: '08:00', end: '21:20' }}
                firstDayOfWeek={1}
                renderCell={onRenderCell}
                showHeaderBar={false}
                workDays={[1, 2, 3, 4, 5, 6]}
                eventSettings={eventSettingsEvenWeek}
                className='schedule-component'
                            >

                <ViewsDirective>
                    <ViewDirective option="Day"></ViewDirective>
                    <ViewDirective option="Week"></ViewDirective>
                </ViewsDirective>

                <Inject services={[Day, Week, DragAndDrop]}></Inject>
            </ScheduleComponent>

            <div className='week-evennes-description'>Нечётная неделя</div>
            <ScheduleComponent
                editorTemplate={editorTemplate.bind(this)}
                showQuickInfo={false}
                popupOpen={onPopupOpen.bind(this)}
                minDate={new Date(new Date(2025, 8, 8))}
                maxDate={new Date(new Date(2025, 8, 13, 21, 20))}
                startHour='08:00'
                endHour='21:20'
                workHours={{ highlight: true, start: '08:00', end: '21:20' }}
                firstDayOfWeek={1}
                renderCell={onRenderCell}
                showHeaderBar={false}
                workDays={[1, 2, 3, 4, 5, 6]}
                eventSettings={eventSettingsNotEvenWeek}
                className='schedule-component'
                >
                <ViewsDirective>
                    <ViewDirective option="Day"></ViewDirective>
                    <ViewDirective option="Week"></ViewDirective>
                </ViewsDirective>

                <Inject services={[Day, Week, DragAndDrop]}></Inject>
            </ScheduleComponent>
            <div className='save-button-container'>
                <button className="schedule-save-button" onClick={handleGetEventData}>Сохранить расписание</button>
            </div>
            
      </div>
  );
}

export default Schedule;