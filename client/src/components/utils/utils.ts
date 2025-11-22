import { notifications } from '@mantine/notifications';

export const Notification = ({ message, title, isError }: any) => {
    return notifications.show({
        title: title,
        message: message,
        color: isError ? 'red' : 'blue',
        position: 'top-right'
    })

} 