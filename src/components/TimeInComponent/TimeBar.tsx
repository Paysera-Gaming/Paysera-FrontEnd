// icons
// import TimeForm from './TimeForm';

import TimerDisplay from '@/components/TimeInComponent/TimerDisplay';
import {Button} from "@/components/ui/button.tsx";
import useConfirmationStore from "@/stores/GlobalAlertStore.ts";


export default function Timebar() {
    const {openConfirmation, closeConfirmation} = useConfirmationStore();

    // this needs to be an await i'd rather not use a set timeout
    // but this could be a timeout as well
    async function openAnotherModal() {
        await closeConfirmation(); // Close parent modal first

        await openConfirmation({
            title: 'This is Child Dialogue',
            description: 'Are you sure you want to Foo?',
            cancelLabel: 'Cancel',
            actionLabel: 'Say Foo',
            onAction: () => {
                alert('You said Foo');
            },
            onCancel: () => {
                alert('You said Bar');
            },
        })
    }


    return (
        <header
            className="border-border border-solid border w-full rounded-md p-2 px-5 flex items-center justify-between">
            {/* timer display */}
            <TimerDisplay></TimerDisplay>

            {/* form */}
            {/*<TimeForm></TimeForm>*/}

            <Button
                onClick={() => {
                    openConfirmation({
                        title: "This is Parent Dialogue",
                        description: "Are you sure you want to continue to child dialogue",
                        cancelLabel: "Cancel",
                        actionLabel: "Continue",
                        onAction: async() => {
                            await openAnotherModal()
                        },
                        onCancel: () => {
                        },
                    })
                }}
            >Testing</Button>


        </header>
    );
}
