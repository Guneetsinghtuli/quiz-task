export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    const formattedTime = date.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "numeric",
    });
    return `${formattedDate} ${formattedTime}`;
};