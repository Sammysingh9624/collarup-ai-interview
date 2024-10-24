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
