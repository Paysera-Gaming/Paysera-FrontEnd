import { TUserInfo } from '@/api/LoginAPI';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
	user: TUserInfo | null;
};

type Actions = {
	setUser: (user: TUserInfo) => void;
	clearUser: () => void;
};

const useUserStore = create<State & Actions>()(
	persist(
		(set, get) => ({
			user: null,
			setUser: () => set({ user: get().user }),
			clearUser: () => set({ user: null }),
		}),
		{
			name: 'usert-storage', // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
		}
	)
);

export { useUserStore };
