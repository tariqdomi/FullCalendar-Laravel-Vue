<?php

namespace Database\Seeders;

use App\Models\Appointment;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Appointment::create([
            'title' => 'Doctor Appointment',
            'start' => '2024-10-15 10:00:00',
            'end' => '2024-10-15 11:00:00',
            'description' => 'Routine check-up',
        ]);

        Appointment::create([
            'title' => 'Dental Appointment',
            'start' => '2024-10-16 14:00:00',
            'end' => '2024-10-16 15:00:00',
            'description' => 'Teeth cleaning',
        ]);
    }
}
