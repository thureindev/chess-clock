
// HELPER FUNCTIONS // ------------------------
// ----------------------
const format_time = (time_in_msec) => {

    // hour in msec = 3,600,000 = 60 * 60 * 1000 

    const mod_hour = time_in_msec % 3600000;
    const mod_minute = mod_hour % 60000;
    const mod_sec = mod_minute % 1000;

    const hour = Math.floor(time_in_msec / 3600000);
    const min = Math.floor(mod_hour / 60000);
    const sec = Math.floor(mod_minute / 1000);

    // divide by hundred to take only 3rd leftmost digit of msec
    const msec = Math.floor(mod_sec / 10);

    return `${hour === 0? "": hour + ':'}${min === 0? "": min + ':'}${sec < 10? "0" + sec: sec}<span>.${msec < 10? "0" + msec: msec}</span>`;
}
