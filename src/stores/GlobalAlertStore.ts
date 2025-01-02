import {create} from "zustand";

interface IConfirmationState{
    open: boolean,
    title: string|null,
    description: string|null,
    cancelLabel:string|null,
    actionLabel:string|null,
    onAction:() => void,
    onCancel:() => void,
}


interface IConfirmationAction{
    openConfirmation:(data:{
        title: string,
        description: string,
        cancelLabel:string,
        actionLabel:string,
        onAction:() => void,
        onCancel:() => void,
    })=>void,
    closeConfirmation:()=>void,
}

const useConfirmationStore = create<IConfirmationState & IConfirmationAction>(
    (set) => ({
        open: false,
        title: null,
        description: null,
        cancelLabel: null,
        actionLabel: null,
        onAction: () => {},
        onCancel: () => {},
        openConfirmation: (data) =>
            set(() => ({
                open: true,
                title: data.title,
                description: data.description,
                cancelLabel: data.cancelLabel,
                actionLabel: data.actionLabel,
                onAction: data.onAction,
                onCancel: data.onCancel,
            })),
        closeConfirmation: () =>
            set(() => ({
                open: false,
                title: null,
                description: null,
                cancelLabel: null,
                actionLabel: null,
                onAction: () => {},
                onCancel: () => {},
            })),
    })
);






export default useConfirmationStore;

