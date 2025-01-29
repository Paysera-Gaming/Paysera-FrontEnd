import { deletePersonalSchedule } from '@/api/PersonalScheduleAPI';
import { PersonalScheduleContext } from '@/stores/context';
import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

export default function RemovePersonalScheduleDialog() {
	const [openWarn, setWarn] = useState<boolean>(false);

	const personalScheduleContext = useContext(PersonalScheduleContext);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			if (personalScheduleContext?.id) {
				return deletePersonalSchedule(personalScheduleContext.id);
			}
		},
	});

	return <>TESTING</>;
}
