// ENUMS
// -------------
const State = Object.freeze({
  READY: 0,
  TICKING: 1,
  PAUSED: 2,
  GAMEOVER: 3
});
// -------------
const PlayerTurn = Object.freeze({
  White: 0,
  Black: 1
});
// -------------

const TEN_MILLI_SEC = 10;

// Class 
// -------------
class Clock {

    constructor() {
        this.state = State.READY; // initial state
        this.playerTurn = PlayerTurn.White; // p1 starts the game 

        this.white_status = {
            time: 1801, // starting time in milli seconds
            move: 0, // number of moves made by player 1

            increment: 0
        };
        this.black_status = {
            time: 62000, // starting time in milli seconds
            move: 0, // number of moves made by player 2
            
            increment: 0
        };

        this.interval = null; // setInterval variable
    }

    start(viewUpdateCallBack, viewSelector) {

        if (this.state === State.READY) {
            this.state = State.TICKING;
        }

        if (this.state === State.TICKING) {

            this.interval = setInterval(() => {
                const currentPlayer = this.playerTurn === PlayerTurn.White ? this.white_status : this.black_status;
                currentPlayer.time -= TEN_MILLI_SEC;

                if (currentPlayer.time < TEN_MILLI_SEC) {
                    this.state = State.GAMEOVER;
                    clearInterval(this.interval);
                }
                
                viewUpdateCallBack(viewSelector, currentPlayer.time);

            }, TEN_MILLI_SEC); // Ten instead of One milli sec used for performance and accracy wise
        }
    }

    pause() {
        if (this.state === State.TICKING) {
            this.state = State.PAUSED;

            clearInterval(this.interval);
        }
    }

    resume(viewUpdateCallBack, viewSelector) {
        if (this.state === State.PAUSED) {
            this.state = State.READY;

            this.start(viewUpdateCallBack, viewSelector);
        }
    }

    switchTurn(viewUpdateCallBack, viewSelector) {
        if (this.state === State.TICKING) {
            const currentPlayer = this.playerTurn === PlayerTurn.White ? this.white_status : this.black_status;
            currentPlayer.move++;

            this.playerTurn = this.playerTurn === PlayerTurn.White ? PlayerTurn.Black : PlayerTurn.White;
            
            clearInterval(this.interval);

            this.start(viewUpdateCallBack, viewSelector);
        }
    }

    reset(t_1=90000, t_2=90000) {

        this.state = State.READY;
        this.playerTurn = PlayerTurn.White;

        this.white_status = {
            time: t_1,
            move: 0,
        };
        this.black_status = {
            time: t_2,
            move: 0,
        };

        clearInterval(this.interval);
    }

    set_timers(t_1, t_2) {
        this.white_status.time = t_1;
        this.black_status.time = t_2;
    }
}
// -------------