import { TUserInfo } from '@/api/LoginAPI';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TUserState = {
	user: TUserInfo | undefined;
	userClockStatus: 'Clock-In' | 'Clock-Out';
	setUser: (user: TUserInfo) => void;
	getUser: () => TUserInfo | undefined;
	getUserClockStatus: () => 'Clock-In' | 'Clock-Out';
	clearUser: () => void;
	getUserIsActive: () => boolean;
	setUserClockStatus: (userClockStatus: 'Clock-In' | 'Clock-Out') => void;
};

const useUserStore = create<TUserState>()(
	persist(
		(set, get) => ({
			user: undefined as TUserInfo | undefined,
			userClockStatus: 'Clock-In' as 'Clock-In' | 'Clock-Out',
			setUser: (user: TUserInfo) => set({ user }),
			getUser: () => get().user,
			getUserClockStatus: () => get().userClockStatus,
			setUserClockStatus: (userClockStatus: 'Clock-In' | 'Clock-Out') =>
				set({ userClockStatus }),
			clearUser: () => {
				set({ user: undefined });
				localStorage.clear();
			},
			getUserIsActive: () => get().user?.isActive ?? false,
		}),
		{
			name: 'User-Info-Storage', // name of the item in the storage (must be unique)
		}
	)
);

export { useUserStore };
