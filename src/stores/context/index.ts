import { TPersonalSchedule } from '@/api/PersonalScheduleAPI';
import { createContext } from 'react';

export const PersonalScheduleContext = createContext<
	TPersonalSchedule | undefined
>(undefined);
