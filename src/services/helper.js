import { format, parseISO, isEqual, formatDistanceToNow } from "date-fns";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

let formatDate = (isoDate, formatString = 'MMMM dd, yyyy HH:mm:ss') => {
    return format(parseISO(isoDate), formatString);
}

let getTimeDistance = (isoDate) => {
    return formatDistanceToNow(parseISO(isoDate), { addSuffix: true });
}

let isEdited = (createdAt, updatedAt) => {
    return !isEqual(parseISO(createdAt), parseISO(updatedAt));
}

let handleConfirmAction = (action, handleAction) => {
    confirmAlert({
        title: `Confirm to ${action}`,
        message: 'Are you sure to do this?',
        buttons: [
            {
                label: 'Yes',
                onClick: handleAction,
            },
            {
                label: 'No',
                onClick: () => { },
            }
        ]
    })
}

export default {
    formatDate,
    getTimeDistance,
    isEdited,
    handleConfirmAction,
} 