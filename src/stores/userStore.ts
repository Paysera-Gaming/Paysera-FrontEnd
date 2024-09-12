import { TUserInfo } from '@/api/LoginAPI';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type TUserState = {
	user: TUserInfo | undefined;
	setUser: (user: TUserInfo) => void;
	getUser: () => TUserInfo | undefined;
	clearUser: () => void;
	getUserIsActive: () => boolean;
};

const useUserStore = create<TUserState>()(
	persist(
		(set, get) => ({
			user: undefined,
			setUser: (user: TUserInfo) => set({ user }),
			getUser: () => get().user,
			clearUser: () => set({ user: undefined }),
			getUserIsActive: () => get().user?.isActive ?? false,
		}),
		{
			name: 'User-Info-Storage', // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
		}
	)
);

export { useUserStore };
