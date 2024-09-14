import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserStore } from '@/stores/userStore';
interface ProtectedRouteProps {
	requiredLevel: 'EMPLOYEE' | 'TEAM_LEADER' | 'ADMIN';
	page: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	requiredLevel,
	page,
}) => {
	if (useUserStore.getState().user?.accessLevel === requiredLevel) {
		return <>{page}</>;
	} else {
		return <Navigate to="/login" />;
	}
};

export default ProtectedRoute;
