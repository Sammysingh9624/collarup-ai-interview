/* eslint-disable @typescript-eslint/no-explicit-any */

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

export function getUserMessagesAfterLastAssistant(messages: { role: string; content: string; isFinal?: boolean }[]) {
    const lastAssistantIndex = messages
        .map((msg, index) => (msg.role === 'assistant' ? index : -1))
        .filter((index) => index !== -1)
        .pop();

    if (lastAssistantIndex === undefined) {
        return messages.map((msg) => msg.content);
    }

    return messages.slice(lastAssistantIndex + 1).map((msg) => msg.content);
}
export const mergeBuffers = (lhs: any, rhs: any) => {
    const mergedBuffer = new Int16Array(lhs.length + rhs.length);
    mergedBuffer.set(lhs, 0);
    mergedBuffer.set(rhs, lhs.length);
    return mergedBuffer;
};

export const calculateRMS = (buffer: any) => {
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) {
        sum += buffer[i] * buffer[i];
    }
    const mean = sum / buffer.length;
    return Math.sqrt(mean);
};
