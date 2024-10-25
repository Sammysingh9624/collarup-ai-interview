export const getTimeFromDate = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
};
export const getRandomLightColor = () => {
    const r = Math.floor(200 + Math.random() * 55); // 200-255
    const g = Math.floor(200 + Math.random() * 55); // 200-255
    const b = Math.floor(200 + Math.random() * 55); // 200-255
    return `rgb(${r},${g},${b})`;
};

export function getUserMessagesAfterLastAssistant(messages: { role: string; content: string }[]) {

    const lastAssistantIndex = messages
        .map((msg, index) => (msg.role === 'assistant' ? index : -1))
        .filter((index) => index !== -1)
        .pop();


    if (lastAssistantIndex === undefined) {
        return messages.map((msg) => msg.content);
    }


    return messages.slice(lastAssistantIndex + 1).map((msg) => msg.content);
}
