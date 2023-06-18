const CLOCK = new Clock();

const CLOCK_1_SELECTOR = '#clock-1';
const CLOCK_2_SELECTOR = '#clock-2';

const PLAY_PAUSE_SELECTOR = '.play-pause-button';
const VOLUME_SELECTOR = '.volume-button';
const SETTINGS_SELECTOR = '.settings-button';

const POP_UP = '.pop-up-interface';
const INFO_TEXT = '.info-text';
const COVER_BACKDROP = '.cover-backdrop';

const BTN_UPDATE_TIMERS = '#btn-update-timers';


const C1_MINS = '#c-1-minutes';
const C1_SECONDS = '#c-1-seconds';
const C1_INCRE = '#c-1-increment';

const C2_MINS = '#c-2-minutes';
const C2_SECONDS = '#c-2-seconds';
const C2_INCRE = '#c-2-increment';

const WHITE_CLOCK = '.white-clock';


let c_times = {
    c_1: 90000,
    c_2: 90000
}

// MAIN --------------------------------

// add click event listeners

$(document).ready(() => {

    // add event listeners
    $(CLOCK_1_SELECTOR).on('click', clock_1_clicked);
    $(CLOCK_2_SELECTOR).on('click', clock_2_clicked);

    $(PLAY_PAUSE_SELECTOR).on('click', play_pause_clicked);
    $(VOLUME_SELECTOR).on('click', volume_clicked);
    $(SETTINGS_SELECTOR).on('click', settings_clicked);

    $(COVER_BACKDROP).on('click', hide_pop_up_interface);

    $(BTN_UPDATE_TIMERS).on('click', update_timers);
    // --- --- --- ---

    CLOCK.reset(c_times.c_1, c_times.c_2)
    update_display_game_reset();

});
// ---------------------------------



// DISPLAY UPDATE FUNCS --------------------------
// --------------------------------- // ---------------------------------
const update_clock_tick = (clock_selector, time_left_in_msec) => {

    $(clock_selector).html(format_time(time_left_in_msec));

    if (CLOCK.state === State.GAMEOVER) {        
        update_display_gameover(clock_selector);
    }
}

const update_display_game_reset = () => {
    
    // control bar // volume - play/pause - timer
    show_volume_btn();
    show_play_pause_btn('play_arrow');
    show_timer_btn();
    
    // clocks
    reset_both_clock_btns();

    update_clock_tick(CLOCK_1_SELECTOR, c_times.c_1);
    update_clock_tick(CLOCK_2_SELECTOR, c_times.c_2);

    // TODO // banner updates
    highlight_nav();
}

const update_display_game_paused = () => {
    
    // control bar // volume - play/pause - timer
    show_play_pause_btn('play_arrow', 'faded');
    show_timer_btn();
    
    // clocks
    fade_both_clock_btns();

    // TODO // banner updates
    fade_nav();
}

const update_display_game_resumed = () => {
    
    // control bar // volume - play/pause - timer
    show_play_pause_btn('pause');
    fade_timer_btn();
    
    // clocks
    unfade_both_clock_btns();

    // TODO // banner updates
    fade_nav();
}

const update_display_gameover = (lost_clock_selector) => {

    // control bar // volume - play/pause - timer
    show_play_pause_btn('replay', 'teal');
    fade_timer_btn();
    
    // clocks 
    unfade_both_clock_btns();
    $(lost_clock_selector).removeClass('teal').addClass('red');

    // TODO // banner updates
    highlight_nav();
}


// DOM SELECTORS ----------------------------
// -------------------------------------------
const reset_both_clock_btns = () => {
    
    $(CLOCK_1_SELECTOR).removeClass('current-clock disabled red').addClass('teal');
    $(CLOCK_2_SELECTOR).removeClass('current-clock disabled red').addClass('teal');
    
    $(CLOCK_1_SELECTOR).html(format_time(c_times.c_1));
    $(CLOCK_2_SELECTOR).html(format_time(c_times.c_2));
}

const fade_both_clock_btns = () => {

    $(CLOCK_1_SELECTOR).addClass('faded')
    $(CLOCK_2_SELECTOR).addClass('faded')
}
const unfade_both_clock_btns = () => {

    $(CLOCK_1_SELECTOR).removeClass('faded')
    $(CLOCK_2_SELECTOR).removeClass('faded')
}

const show_volume_btn = () => {
    // TO DO // handle sound

    $(`${VOLUME_SELECTOR} i`).html('volume_up');
    $(VOLUME_SELECTOR).removeClass('grey');
    $(VOLUME_SELECTOR).addClass('teal');
}

const fade_volume_btn = () => {
    // TO DO // handle sound
        
    $(`${VOLUME_SELECTOR} i`).html('volume_off');
    $(VOLUME_SELECTOR).removeClass('teal');
    $(VOLUME_SELECTOR).addClass('grey');
}

const show_play_pause_btn = (icon, color='teal') => {
    $(PLAY_PAUSE_SELECTOR).removeClass('teal faded').addClass(color);
    $(`${PLAY_PAUSE_SELECTOR} i`).html(icon);
}

const show_timer_btn = () => {
    // TO DO // handle settings

    $(SETTINGS_SELECTOR).removeClass('grey');
    $(SETTINGS_SELECTOR).addClass('teal');
}
const fade_timer_btn = () => {
    // TO DO // handle settings

    $(SETTINGS_SELECTOR).removeClass('teal');
    $(SETTINGS_SELECTOR).addClass('grey');
}

const highlight_nav = () => {
    $('nav').css({'backgroundColor': '#EE6E73'});
}
const fade_nav = () => {
    $('nav').css({'backgroundColor': '#dfdfdf'});
}
// -------------------------------------------


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

const process_clock_btn_click = (c_1, c_2) => {

    const isTicking = CLOCK.state === State.TICKING;
    const isReady = CLOCK.state === State.READY;


    if (isTicking || isReady) {

        if (isTicking) {
            CLOCK.switchTurn(update_clock_tick, c_1);
            
            $(c_1).addClass('current-clock');
            $(c_2).removeClass('current-clock');
        }

        else if (isReady) {

            $(c_1).addClass('white-clock').removeClass('black-clock');
            $(c_2).addClass('black-clock').removeClass('white-clock');

            change_times(c_1, c_times.c_1, c_times.c_2);

            CLOCK.start(update_clock_tick, c_1);
            
            // view selector updates
            $(c_1).addClass('current-clock');
            $(c_2).removeClass('current-clock');

            fade_timer_btn();

            $(`${PLAY_PAUSE_SELECTOR} i`).html('pause');

            fade_nav();
        }

        // view visual update on going game
        $(c_2).addClass('disabled');
        $(c_1).removeClass('disabled');
    }
}

//  //  set timer funcs
const update_timers = () => { 
    
    let c1_min = Number($(C1_MINS)[0].value);
    let c1_sec = Number($(C1_SECONDS)[0].value);
    let c1_incre = Number($(C1_INCRE)[0].value);

    let c2_min = Number($(C2_MINS)[0].value);
    let c2_sec = Number($(C2_SECONDS)[0].value);
    let c2_incre = Number($(C2_INCRE)[0].value);

    // change to milli seconds
    let c1_time = ((c1_min * 60) + c1_sec) * 1000;
    let c2_time = ((c2_min * 60) + c2_sec) * 1000;

    console.log(c1_min + ':' + c1_sec);
    console.log(c2_min + ':' + c2_sec);

    console.log(c1_time);
    console.log(c2_time);


    c_times.c_1 = c1_time;
    c_times.c_2 = c2_time;
}
// -------------------------------
const change_times = () => {
    
    if ($(WHITE_CLOCK).attr('id') == 'clock-1') {
        CLOCK.set_timers(c_times.c_1, c_times.c_2);
    }
    else if ($(WHITE_CLOCK).attr('id') == 'clock-2') {
        CLOCK.set_timers(c_times.c_2, c_times.c_1);
    }
    else {
        alert('clock id errors.');
    }
}
// -------------------------------


// EVENT LISTENERS -------- ------------
// ---------- ---------------
const clock_1_clicked = () => {
    process_clock_btn_click(CLOCK_2_SELECTOR, CLOCK_1_SELECTOR);
}
const clock_2_clicked = () => {
    process_clock_btn_click(CLOCK_1_SELECTOR, CLOCK_2_SELECTOR);
}

const play_pause_clicked = () => {
    
    if (CLOCK.state === State.TICKING) {
        CLOCK.pause();

        update_display_game_paused();
    }
    else if (CLOCK.state === State.PAUSED) {
        CLOCK.resume(update_clock_tick, '.current-clock');

        update_display_game_resumed();
    }
    else if (CLOCK.state === State.READY) {
        show_pop_up_interface();
    }
    else if (CLOCK.state === State.GAMEOVER) {
        // TO FIX CLOCK RESET TIMER
        CLOCK.reset(180000, 90000);

        update_display_game_reset();
    }
}
const volume_clicked = () => {
    // TO FIX // condition check with volume obj
    if ($(`${VOLUME_SELECTOR} i`).html() == 'volume_up') {
        fade_volume_btn();
    }
    else {
        show_volume_btn();
    }
}

const settings_clicked = () => {

    // will only work in game ready or game paused state

    if (CLOCK.state === State.READY || CLOCK.state === State.PAUSED) {
        show_pop_up_interface('clock-settings');
    }
}

const show_pop_up_interface = (pass="start") => {
    
    $(POP_UP).removeClass('hide');
    $(INFO_TEXT).removeClass('hide');
    $(COVER_BACKDROP).removeClass('hide');

    if (pass == "start") {
        $(INFO_TEXT)[0].innerHTML = "When both players are ready, black hits their button prior to white's first move, thus starting the clock on white's end.";
    }
    else if (pass == "clock-settings") {
        $(INFO_TEXT)[0].innerHTML = "Clock Settings";
        $('.interface-container').removeClass('hide');
    }
    else {
        $(INFO_TEXT)[0].innerHTML = "ERROR!!";
    }
}

const hide_pop_up_interface = () => {

    $(POP_UP).addClass('hide').children().addClass('hide');
    
    $(COVER_BACKDROP).addClass('hide');
}
// ---------- ---------------