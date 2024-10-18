<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import listPlugin from '@fullcalendar/list';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

const { props } = usePage();

onMounted(() => {
    // const cells = document.querySelectorAll('.fc-daygrid-day');
    // cells.forEach(cell => {
    //     cell.style.maxHeight = "50px !important"; // Set your desired height
    //     cell.style.height = "40px !important"; // Set your desired height

    // });
    //console.log(props);
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
    dayMaxEventRows: 4,
    dayMaxEvents: false,
    allDaySlot: false,
    slotEventOverlap: false,
    slotDuration: "00:15:00", // default 30
    slotMinTime: "08:00:00",
    slotMaxTime: "22:30:00",
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
        color: true ? 'green' : 'red',
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
    height: 'auto', // Sets the height of the entire calendar, including header and footer. Automatically adjust the height based on content
    //contentHeight: 200, //Sets the height of the view area of the calendar.
    //maxHeight: 2000, // Set your desired max height (in pixels)
    //aspectRatio: 1.8,
    expandRows: true,
    fixedWeekCount: false,
    nowIndicator: true,
    //businessHours: true,
    businessHours: [ // specify an array instead
        {
            daysOfWeek: [0, 1, 2, 3], // Monday, Tuesday, Wednesday
            startTime: '08:00', // 8am
            endTime: '22:00' // 6pm
        },
        {
            daysOfWeek: [4, 5], // Thursday, Friday
            startTime: '10:00', // 10am
            endTime: '16:00' // 4pm
        }
    ],
    eventDisplay: 'list-item',
    navLinks: true,
    viewDidMount: function ({ view }) {
        // Log the view type when the view mounts
        // if (view.type == 'dayGridMonth') {
        //     calendarOptions.height = 850;
        // }
        console.log("Current View Type:", view.type);
    },
});


const fullCalendar = ref(null);

// Function to handle view changes and log the current view type
// function handleDatesSet(dateInfo) {
//     // const view = fullCalendar.value.getApi().view; // Accessing the view property
//     const view = dateInfo.view;
//     console.log("Current View Type:", view.type); // Log the current view type
// }

// Log the initial view when the component mounts
// onMounted(() => {
//     const view = fullCalendar.value.getApi().view; // Accessing the view property
//     console.log("Initial View Type:", view.type); // Log the initial view type
// });

// function handleDatesSet(dateInfo) {
//     console.log("Current View Type:", dateInfo.view.type); // Correctly log the current view type
// }

// const currentViewClass = ref('month-view');

// function handleDatesSet({ view }) {
//     console.log("Current View Type:", view.type); // Log the current view type

//     if (view.type === 'dayGridMonth') {
//         currentViewClass.value = 'month-view'; // Class for month view
//     } else if (view.type === 'timeGridWeek') {
//         currentViewClass.value = 'week-view'; // Class for week view
//     } else if (view.type === 'timeGridDay') {
//         currentViewClass.value = 'day-view'; // Class for day view
//     } else {
//         currentViewClass.value = ''; // Reset class if view is not recognized
//     }
// }
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
                <div :class="currentViewClass"
                    class="flex-1 overflow-hidden bg-white shadow-sm sm:rounded-lg calendar-container">
                    <FullCalendar ref="fullCalendar" :options="calendarOptions">
                        <template v-slot:eventContent='arg'>
                            <b>{{ arg.timeText }}</b>
                            <i>{{ arg.event.title }}</i>
                        </template>
                    </FullCalendar>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>



<style>
.calendar-container {
    height: 600px;
    /* Set a fixed height for the calendar container */
    overflow: auto;
    /* Allow scrolling if necessary */
}

/* Styles for different views */
.month-view {
    background-color: #c741b1;
    /* Light blue background for month view */
}

.week-view {
    background-color: #ffebcd;
    /* Blanched almond background for week view */
}

.day-view {
    background-color: #ffe4e1;
    /* Misty rose background for day view */
}
</style>