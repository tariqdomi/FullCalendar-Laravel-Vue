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



const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, multiMonthPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
        start: 'dayGridMonth timeGridWeek timeGridDay multiMonthYear',
        center: 'title',
        end: 'listWeek today prev next'
    },
    slotEventOverlap: false,
    slotDuration: "00:15:00", // default 30
    slotMinTime: "08:00:00",
    slotMaxTime: "18:30:00",
    slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
    },
    events: props.appointments.map(appointment => ({
        title: appointment.title,
        start: appointment.start,
        end: appointment.end,
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
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <FullCalendar :options="calendarOptions" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
