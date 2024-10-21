<template>

    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Dashboard
            </h2>
        </template>

        <div class="py-4">
            <div class="card flex justify-center">
                <div class="w-56">
                    <InputText v-model.number="value" class="w-full mb-4" />
                    <Slider v-model="value" class="w-full" />
                </div>
            </div>
            <div class="card flex justify-center">

                <Button label="Show" @click="visible = true" />
                <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
                    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
                    <div class="flex items-center gap-4 mb-4">
                        <label for="username" class="font-semibold w-24">Username</label>
                        <InputText id="username" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex items-center gap-4 mb-8">
                        <label for="email" class="font-semibold w-24">Email</label>
                        <InputText id="email" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex justify-end gap-2">
                        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                        <Button type="button" label="Save" @click="visible = false"></Button>
                    </div>
                </Dialog>
            </div>
        </div>
    </AuthenticatedLayout>

</template>

<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import Button from "primevue/button"
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

import Slider from 'primevue/slider';




const value = ref(null);

const visible = ref(false);
</script>