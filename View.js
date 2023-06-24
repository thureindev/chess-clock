


class View {
    constructor() {
        this.clock_1 = CLOCK_1_SELECTOR;
        this.clock_2 = CLOCK_2_SELECTOR;

        this.default_times = DEFAULT_TIMES;

        this.clock_1_timer_text = null;
        this.clock_1_moves_text = null;

        this.clock_2_timer_text = null;
        this.clock_2_moves_text = null;

        this.play_pause_button = PLAY_PAUSE_SELECTOR;
        this.volume_button = VOLUME_SELECTOR;
        this.settings_button = SETTINGS_SELECTOR;
    }

    update_clock_tick (clock_selector, time_left_in_msec) {

        $(clock_selector).html(format_time(time_left_in_msec));
    
        if (CLOCK.state === GameState.GAMEOVER) {
            this.update_display_gameover(clock_selector);
        }
    }

    update_timer_texts (c_1, c_2) {
        

        $('#clock-1')[0].innerHTML = format_time(c_1);

        $('#clock-2')[0].innerHTML = format_time(c_2);
    }
    
    update_display_game_reset () {
        
        // control bar // volume - play/pause - timer
        this.show_volume_btn();
        this.show_play_pause_btn('play_arrow');
        this.show_timer_btn();
        
        // clocks
        this.reset_both_clock_btns();

        this.update_clock_tick(this.clock_1, this.default_times.c_1);
        this.update_clock_tick(this.clock_2, this.default_times.c_2);

        // TODO // banner updates
        this.highlight_nav();
    }

    update_display_game_paused () {
        
        // control bar // volume - play/pause - timer
        this.show_play_pause_btn('play_arrow', 'faded');
        this.show_timer_btn();
        
        // clocks
        this.fade_both_clock_btns();

        // TODO // banner updates
        this.fade_nav();
    }

    update_display_game_resumed () {
        
        // control bar // volume - play/pause - timer
        this.show_play_pause_btn('pause');
        this.fade_timer_btn();
        
        // clocks
        this.unfade_both_clock_btns();

        // TODO // banner updates
        this.fade_nav();
    }

    update_display_gameover = (lost_clock_selector) => {

        // control bar // volume - play/pause - timer
        this.show_play_pause_btn('replay', 'teal');
        this.fade_timer_btn();
        
        // clocks 
        this.unfade_both_clock_btns();
        $(lost_clock_selector).removeClass('teal').addClass('red');

        // TODO // banner updates
        this.highlight_nav();
    }

    reset_both_clock_btns () {
    
        $(this.clock_1).removeClass('current-clock disabled red').addClass('teal');
        $(this.clock_2).removeClass('current-clock disabled red').addClass('teal');
        
        $(this.clock_1).html(format_time(DEFAULT_TIMES.c_1));
        $(this.clock_2).html(format_time(DEFAULT_TIMES.c_2));
    }
    
    fade_both_clock_btns () {
    
        $(this.clock_1).addClass('faded')
        $(this.clock_2).addClass('faded')
    }
    
    unfade_both_clock_btns () {
    
        $(this.clock_1).removeClass('faded')
        $(this.clock_2).removeClass('faded')
    }
    
    show_volume_btn () {
        // TO DO // handle sound
    
        $(`${VOLUME_SELECTOR} i`).html('volume_up');
        $(VOLUME_SELECTOR).removeClass('grey');
        $(VOLUME_SELECTOR).addClass('teal');
    }
    
    fade_volume_btn () {
        // TO DO // handle sound
            
        $(`${VOLUME_SELECTOR} i`).html('volume_off');
        $(VOLUME_SELECTOR).removeClass('teal');
        $(VOLUME_SELECTOR).addClass('grey');
    }
    
    show_play_pause_btn = (icon, color='teal') => {
        $(PLAY_PAUSE_SELECTOR).removeClass('teal faded').addClass(color);
        $(`${PLAY_PAUSE_SELECTOR} i`).html(icon);
    }
    
    show_timer_btn () {
        // TO DO // handle settings
    
        $(SETTINGS_SELECTOR).removeClass('grey');
        $(SETTINGS_SELECTOR).addClass('teal');
    }

    fade_timer_btn () {
        // TO DO // handle settings
    
        $(SETTINGS_SELECTOR).removeClass('teal');
        $(SETTINGS_SELECTOR).addClass('grey');
    }
    
    highlight_nav () {
        $('nav').css({'backgroundColor': '#EE6E73'});
    }

    fade_nav () {
        $('nav').css({'backgroundColor': '#dfdfdf'});
    }
    // -------------------------------------------
    
}