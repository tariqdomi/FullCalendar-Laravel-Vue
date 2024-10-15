<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import listPlugin from '@fullcalendar/list';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

const { props } = usePage();



const cells = document.querySelectorAll('.fc-daygrid-day');
cells.forEach(cell => {
    cell.style.height = '20px'; // Set your desired height
});



const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, multiMonthPlugin, listPlugin],
    initialView: 'dayGridMonth',
    customButtons: {
        myCustomButton: {
            text: 'custom',
            click: function () {
                alert('clicked the custom button!');
            }
        }
    },
    headerToolbar: {
        start: 'dayGridMonth timeGridWeek timeGridDay multiMonthYear dayGridWeek',
        center: 'title',
        end: 'myCustomButton listWeek today prev next'
    },
    //dayMaxEventRows: 2,
    dayMaxEvents: true,
    allDaySlot: false,
    slotEventOverlap: false,
    slotDuration: "00:15:00", // default 30
    slotMinTime: "08:00:00",
    slotMaxTime: "18:30:00",
    slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
    },
    // eventColor: 'green',
    events: props.appointments.map(appointment => ({
        title: appointment.title,
        start: appointment.start,
        end: appointment.end,
        color: false ? 'green' : 'red',
    })),
    eventClick: (info) => {
        alert('Event: ' + info.event.title);
        alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        alert('View: ' + info.view.type);

        // change the border color just for fun
        info.el.style.borderColor = 'red';
    },
    eventMouseEnter: (info) => {
        // Change cursor style to pointer on mouse enter
        info.el.style.cursor = 'pointer';
    },
    eventMouseLeave: (info) => {
        // Reset cursor style on mouse leave (optional)
        info.el.style.cursor = '';
    },
    // Set the max height for the calendar
    height: 750, // Sets the height of the entire calendar, including header and footer. Automatically adjust the height based on content
    //contentHeight: 200, //Sets the height of the view area of the calendar.
    //maxHeight: 2000, // Set your desired max height (in pixels)
    //aspectRatio: 1.8,
    expandRows: false,
    fixedWeekCount: false,
    nowIndicator: true,
    //businessHours: true,
    businessHours: [ // specify an array instead
        {
            daysOfWeek: [0, 1, 2, 3], // Monday, Tuesday, Wednesday
            startTime: '08:00', // 8am
            endTime: '18:00' // 6pm
        },
        {
            daysOfWeek: [4, 5], // Thursday, Friday
            startTime: '10:00', // 10am
            endTime: '16:00' // 4pm
        }
    ],
    eventDisplay: 'list-item',
});
</script>

<template>

    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Dashboard
            </h2>
        </template>

        <div class="py-4">
            <div class="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="flex-1 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <FullCalendar :options="calendarOptions" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
