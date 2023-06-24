/*** APP JS is the CONTROLLER
 * 
 * CLOCK is the model, calculating logics
 * 
 * VIEW is view, rendering visuals
 * 
 * CONTROLLER connects model and view
 * It controls the following
 *  *   capture clock button clicks and process time stop, start and switch turns
 *  *   capture volume button clicks and process audio on/off
 *  *   capture play/pause button clicks and process game state
 *  *   capture clock settings and update timers, timing methods and increments
 * 
 */




// MAIN --------------------------------

// add click event listeners
const CLOCK = new Clock();
const VIEW = new View();
const CONTROLLER = new Controller(CLOCK, VIEW);

$(document).ready(() => {

    // add event listeners
    $(CLOCK_1_SELECTOR).on('click', clock_1_clicked);
    $(CLOCK_2_SELECTOR).on('click', clock_2_clicked);

    $(PLAY_PAUSE_SELECTOR).on('click', () => CONTROLLER.play_pause_clicked());
    $(VOLUME_SELECTOR).on('click', () => CONTROLLER.volume_clicked());
    $(SETTINGS_SELECTOR).on('click', () => CONTROLLER.settings_clicked());

    $(COVER_BACKDROP).on('click', () => CONTROLLER.hide_pop_up_interface());

    $(BTN_UPDATE_TIMERS).on('click', () => CONTROLLER.update_timers());
    $(BTN_RESET_DEFAULT).on('click', () => console.log('reset to implement'));
    $(BTN_CLOSE_POP_UP).on('click', () => CONTROLLER.hide_pop_up_interface());
    // --- --- --- ---

    $(BTN_TOGGLE_SECOND_TIMER).on('change', () => CONTROLLER.toggle_2nd_timer());

    
    CONTROLLER.reset_default_clock_settings();

    VIEW.update_display_game_reset();

});
// ---------------------------------


// EVENT LISTENER functions -------- ------------
// ---------- ---------------
const clock_1_clicked = () => {
    CONTROLLER.clock_btn_clicked(CLOCK_2_SELECTOR, CLOCK_1_SELECTOR);
}
const clock_2_clicked = () => {
    CONTROLLER.clock_btn_clicked(CLOCK_1_SELECTOR, CLOCK_2_SELECTOR);
}
