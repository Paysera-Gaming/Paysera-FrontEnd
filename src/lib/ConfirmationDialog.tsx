// ConfirmationDialog.tsx
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useConfirmationStore from "@/stores/GlobalAlertStore.ts";

const ConfirmationDialog = () => {
    const { open, title, description, cancelLabel, actionLabel, onAction, closeConfirmation,onCancel } = useConfirmationStore();

    return (
        <AlertDialog open={open} onOpenChange={closeConfirmation}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={()=>{
                        closeConfirmation();
                        onCancel();
                    }}>{cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction onClick={onAction}>{actionLabel}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmationDialog;