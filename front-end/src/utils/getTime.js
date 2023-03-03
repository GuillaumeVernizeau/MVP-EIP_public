export function getElapseTime(time) {
    const elapsed_time = Math.floor((Date.now() / 1000 - time) / 60);
    if (elapsed_time > 60)
        return (`${Math.floor(elapsed_time / 60)}h${elapsed_time % 60}`);
    return (`${elapsed_time}min`);
}