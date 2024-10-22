import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import PrimeVue from "primevue/config";
// import 'primevue/resources/themes/aura/theme.css'; // Ensure you import the theme CSS
// import 'primevue/resources/primevue.min.css'; // Core styles
// import 'primeicons/primeicons.css'; // Icons
import Aura from "@primevue/themes/aura";
//import preset from 'tailwindcss-primeui/src/utils/preset';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(PrimeVue, {
                theme: {
                    preset: Aura,
                    options: {
                        darkModeSelector: '.my-app-dark',
                    },
                },
                // theme: {
                //     preset: Aura,
                //     options: {
                //         darkModeSelector: false || 'none',
                //     }
                // }
            })
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
