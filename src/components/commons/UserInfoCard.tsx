import { useState } from 'react';

export default function UserInfoCard() {
	const [getInfo, setInfo] = useState('Joe biden');
	return <section>{getInfo}</section>;
}
