// ENUMS
// -------------
const GameState = Object.freeze({
  READY: 0,
  TICKING: 1,
  PAUSED: 2,
  GAMEOVER: 3
});
// -------------
const TurnState = Object.freeze({
  WHITE: 0,
  BLACK: 1
});
// -------------

// constants
const TEN_MILLI_SEC = 10;

// Class 
// -------------
class Clock {

    constructor() {
        this.state = GameState.READY; // initial state
        this.playerTurn = TurnState.WHITE; // p1 starts the game 

        this.white_clock = {
            time: 300000, // starting time in milli seconds
            move: 0, // number of moves played

            increment: 0 // increment seconds in milli seconds
        };
        this.black_clock = {
            time: 300000, // starting time in milli seconds
            move: 0, // number of moves played
            
            increment: 0 // increment seconds in milli seconds
        };

        this.tickingClock = null; // to keep track of ticking clock on turns

        this.tickingFunction = null; // to keep global setInterval function to this obj
    }

    start(viewUpdateCallBack, viewSelector) {

        // GameState.READY is a state where the game started from reset
        // or the game resumed from paused
        if (this.state === GameState.READY) {
            
            // if tickingClock is null, the game started from reset
            // Thus white becomes tickingClock
            if (this.tickingClock === null) {
                this.tickingClock = this.white_clock;
            }

            // Ready game should start ticking to carry on ticking process
            this.state = GameState.TICKING;
        }

        // Start the clock
        if (this.state === GameState.TICKING) {

            // Use JS global [setInterval] func to tick every ten milli seconds ### lookup [setInterval] to understand how it works
            this.tickingFunction = setInterval(() => {
                // consume current player's clock
                this.tickingClock.time -= TEN_MILLI_SEC;

                // check gameover status
                if (this.tickingClock.time < TEN_MILLI_SEC) {
                    this.tickingClock.time = 0;

                    this.state = GameState.GAMEOVER;

                    clearInterval(this.tickingFunction);
                }
                
                viewUpdateCallBack(viewSelector, this.tickingClock.time);

            }, TEN_MILLI_SEC); // Ten instead of One milli sec used for performance and accracy wise
        }
    }

    switchTurn(viewUpdateCallBack, viewSelector) {
        /*** switchTurn only happens while game is ongoing */
        if (this.state === GameState.TICKING) {

            // stop previous [setInterval] process 
            clearInterval(this.tickingFunction);

            // Update moves and calculate increment
            this.tickingClock.move++;

            // ### implement increment here -------------------------------------

            if (this.playerTurn === TurnState.WHITE) {
                this.playerTurn = TurnState.BLACK;
                this.tickingClock = this.black_clock;
                
                console.log('BLACK to play');
            }
            else if (this.playerTurn === TurnState.BLACK) {
                this.playerTurn = TurnState.WHITE;
                this.tickingClock = this.white_clock;

                console.log('WHITE to play');
            }
            else {
                console.log('Error occured in determining player state');
            }

            // start a new [setInterval] process
            this.start(viewUpdateCallBack, viewSelector);
        }
    }

    reset(t_1=300000, t_2=300000) {

        clearInterval(this.tickingFunction);
        this.tickingClock = null
        this.tickingFunction = null

        this.state = GameState.READY;
        this.playerTurn = TurnState.WHITE;

        this.white_clock = {
            time: t_1,
            move: 0,

            // ### need to include incre
        };
        this.black_clock = {
            time: t_2,
            move: 0,

            // ### need to include incre
        };
    }

    set_timers(t_1, t_2) {
        this.white_clock.time = t_1;
        this.black_clock.time = t_2;
    }

    pause() {
        /*** Game can be paused only while game is ongoing */
        if (this.state === GameState.TICKING) {
            this.state = GameState.PAUSED;

            // stop previous [setInterval] process 
            clearInterval(this.tickingFunction);
        }
    }

    resume(viewUpdateCallBack, viewSelector) {
        /*** Game can be resumed only while game is paused */
        if (this.state === GameState.PAUSED) {
            this.state = GameState.READY;

            // start a new [setInterval] process
            this.start(viewUpdateCallBack, viewSelector);
        }
    }
}
// -------------