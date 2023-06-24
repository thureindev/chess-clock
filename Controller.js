
class Controller {
    constructor(clock, view) {
        this.clock = clock;
        this.view = view;

        this.c_times = {
            c_1: DEFAULT_TIMES.c_1,
            c_2: DEFAULT_TIMES.c_2
        }
        
        this.isDiffTimers = false;
    }

    clock_btn_clicked (c_1, c_2) {
        /*** Takes exactly 2 args. 
         * First arg is the clock selector to be started. 
         * Second arg is the clock selector to stopped.
         * These 2 parameters will be handed over to CLOCK (model) and VIEW objects to handle them respectively
         * */
    
        const isTicking = this.clock.state === GameState.TICKING;
        const isReady = this.clock.state === GameState.READY;
    
        if (isTicking || isReady) {
    
            // While clock is ticking, ie. the game is ongoing, 
            // '.current-clock' css class will be swapped
            // ### todo create new swap-current-clock function in VIEW obj and use it here.
            if (isTicking) {
                this.clock.switchTurn(this.view.update_clock_tick, c_1);
                
                $(c_1).addClass('current-clock');
                $(c_2).removeClass('current-clock');
            }
    
            // WHILE clock is ready, ie. the game has just started,
            // '.white_clock' and '.black-clock' functions are assigned.
            // ### todo create assign clock-colors function in VIEW obj and use it here.
            else if (isReady) {
    
                $(c_1).addClass('white-clock').removeClass('black-clock');
                $(c_2).addClass('black-clock').removeClass('white-clock');
    
                this.change_times(c_1, DEFAULT_TIMES.c_1, DEFAULT_TIMES.c_2);
    
                this.clock.start(this.view.update_clock_tick, c_1);
                
                // view selector updates
                $(c_1).addClass('current-clock');
                $(c_2).removeClass('current-clock');
    
                // ### todo review
                this.view.fade_timer_btn();
    
                $(`${PLAY_PAUSE_SELECTOR} i`).html('pause');
    
                // ### TODO REVIEW
                this.view.fade_nav();
            }
            
            // view visual update on going game
            $(c_2).addClass('disabled');
            $(c_1).removeClass('disabled');
        }
    }
    
    update_timers () { 
        
        let c1_min = Number($(C1_MINS)[0].value);
        let c1_sec = Number($(C1_SECONDS)[0].value);
        // let c1_incre = Number($(C1_INCRE)[0].value);
        
        // change to milli seconds
        let c1_time = ((c1_min * 60) + c1_sec) * 1000;
        // set to timer
        c_times.c_1 = c1_time;

        if (isDiffTimers) {
            let c2_min = Number($(C2_MINS)[0].value);
            let c2_sec = Number($(C2_SECONDS)[0].value);
            // let c2_incre = Number($(C2_INCRE)[0].value);
        
            // change to milli seconds
            let c2_time = ((c2_min * 60) + c2_sec) * 1000;
            // set to timer
            c_times.c_2 = c2_time;
        }
        else {
            // set to timer
            c_times.c_2 = c1_time;
        }
    }

    // -------------------------------
    change_times () {
        
        if ($(WHITE_CLOCK).attr('id') == 'clock-1') {
            this.clock.set_timers(this.c_times.c_1, this.c_times.c_2);
        }
        else if ($(WHITE_CLOCK).attr('id') == 'clock-2') {
            this.clock.set_timers(this.c_times.c_2, this.c_times.c_1);
        }
        else {
            alert('clock id errors.');
        }
    }
    // -------------------------------

    play_pause_clicked () {
    
        console.log(this.clock);

        console.log(this);

        if (this.clock.state === GameState.TICKING) {
            this.clock.pause();
    
            this.view.update_display_game_paused();
        }
        else if (this.clock.state === GameState.PAUSED) {
            this.clock.resume(this.view.update_clock_tick, '.current-clock');
    
            this.view.update_display_game_resumed();
        }
        else if (this.clock.state === GameState.READY) {
            this.show_pop_up_interface();
        }
        else if (this.clock.state === GameState.GAMEOVER) {
            // TO FIX CLOCK RESET TIMER
            this.clock.reset(180000, 90000);
    
            this.view.update_display_game_reset();
        }
    }
    
    volume_clicked () {
        // TO FIX // condition check with volume obj
        if ($(`${VOLUME_SELECTOR} i`).html() == 'volume_up') {
            this.fade_volume_btn();
        }
        else {
            this.show_volume_btn();
        }
    }
    
    settings_clicked () {
    
        // will only work in game ready or game paused state
    
        if (this.clock.state === GameState.READY || this.clock.state === GameState.PAUSED) {
            this.show_pop_up_interface('clock-settings');
        }
    }
    
    // ---------- ---------------
    
    // ---------- ---------------

    show_pop_up_interface (pass="start") {
        
        $(POP_UP).removeClass('hide');
        $(INFO_TEXT).removeClass('hide');
        $(COVER_BACKDROP).removeClass('hide');

        if (pass == "start") {
            $('.interface-container.gamestart-info').removeClass('hide');
        }
        else if (pass == "clock-settings") {
            $('.interface-container.clock-settings').removeClass('hide');
        }
        else {
            console.log('pop-up-interface error in show_pop_up_interface function');
        }
    }

    hide_pop_up_interface () {

        $(POP_UP).addClass('hide').children().addClass('hide');
        
        $(COVER_BACKDROP).addClass('hide');
    }

    toggle_2nd_timer () {
        
        if ($(SECOND_TIMER).hasClass('hide')) {
            isDiffTimers = true;
            $(SECOND_TIMER).removeClass('hide');
        }
        else {
            isDiffTimers = false;
            $(SECOND_TIMER).addClass('hide');
        }
    }

    reset_default_clock_settings () {
        // reset clock timers
        this.clock.reset(this.c_times.c_1, this.c_times.c_2)

        // reset differt clocks toggle
        $(BTN_TOGGLE_SECOND_TIMER).prop('checked', false);
        

        // ### todo reset time methods
        
    }
    // ---------- ---------------
}