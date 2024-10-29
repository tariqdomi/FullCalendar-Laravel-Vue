<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Appointment;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function index()
    {
        $appointments = Appointment::all();
        return Inertia::render('Calendar', [
            'appointments' => $appointments,
            'selectedDate'  => now(),
        ]);
    }
}
