import { error } from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';

export function invalidQueryNotice() {
    const errorNotice = error({
        text: "Please enter a valid query",
        delay: 2000,
    });
};

export function errorNotice() {
    const errorNotice = error({
        text: "Oops! Something went wrong :(",
        delay: 2000,
    });
};

export default { invalidQueryNotice, errorNotice };