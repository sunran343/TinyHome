import {notification} from "antd";

export const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
        duration: 0.7
    });
};
