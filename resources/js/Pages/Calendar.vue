<template>

    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Calendar
            </h2>
        </template>

        <!-- {{ appointments }} -->

        <div class="py-4">
            <div class="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="month-view">
                    <h2 class="text-xl font-semibold mb-4">{{ monthTitle }}</h2>
                    <div class="grid grid-cols-7 gap-0">
                        <div v-for="(day, index) in days" :key="index"
                            class="font-bold text-center border border-gray-300">
                            {{ day }}
                        </div>
                        <div v-for="date in calendarDays" :key="date.date" class="border border-gray-300 p-2 relative">
                            <span class="block text-center">{{ date.day }}</span>
                            <div v-if="date.appointments.length" class="mt-1">
                                <ul>
                                    <li v-for="appointment in date.appointments" :key="appointment.id" class="text-sm">
                                        {{ appointment.title }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>



<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import { computed, watch } from 'vue';
import { toRefs } from 'vue'; // Import toRefs to handle props

// Props definition
const props = defineProps({
    appointments: {
        type: Array,
        required: true,
    },
    selectedDate: {
        type: String,
        required: true,
    },
});

// Reactive references
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const calendarDays = ref([]);

// Convert the selectedDate string to a Date object
const dateInstance = new Date(props.selectedDate);

// Computed property for month title
const monthTitle = computed(() => {
    if (isNaN(dateInstance)) {
        return 'Invalid Date';
    }
    const options = { month: 'long', year: 'numeric' };
    return dateInstance.toLocaleDateString(undefined, options);
});

// Function to generate calendar days
const generateCalendarDays = () => {
    if (isNaN(dateInstance)) {
        console.error('Invalid selectedDate prop:', props.selectedDate);
        return; // Exit if selectedDate is invalid
    }

    const firstDayOfMonth = new Date(dateInstance.getFullYear(), dateInstance.getMonth(), 1);
    const lastDayOfMonth = new Date(dateInstance.getFullYear(), dateInstance.getMonth() + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    calendarDays.value = Array.from({ length: 42 }, (_, i) => {
        const date = new Date(dateInstance.getFullYear(), dateInstance.getMonth(), i - startDay + 1);
        // console.log(date);
        // Filter appointments that fall on the same date
        const dayAppointments = props.appointments.filter(appointment =>
            new Date(appointment.start).toDateString() === date.toDateString() // Check the 'start' date
        );
        console.log(dayAppointments);
        return {
            date: date,
            day: date.getDate() > 0 && date.getDate() <= totalDays ? date.getDate() : '',
            appointments: dayAppointments,
        };
    });
};
// Watch for changes in selectedDate to regenerate calendar days
watch(() => props.selectedDate, (newDate) => {
    dateInstance = new Date(newDate); // Update the Date instance if selectedDate changes
    generateCalendarDays();
});

// Generate calendar days initially
generateCalendarDays();
</script>


<style></style>