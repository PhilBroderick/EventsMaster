import { InjectionToken } from '@angular/core';

import { Event } from '../core/event-overlay.service';

export const EVENT_DIALOG_DATA = new InjectionToken<Event>('EVENT_DIALOG_DATA');
