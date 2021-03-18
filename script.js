var ball = document.getElementById('ball');
var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');

const rod1Name = "Rod1";
const rod2Name = "Rod2";

let score = 0,
    maxScore = 0,
    movement,
    rod = "null",
    ballSpeedX = 2,
    ballSpeedY = 2;

let gameOn = false;

let windowWidth = window.innerWidth,
    windowHeight = window.innerHeight;



(function () {
    alert("This is the first time you are playing this game. LET'S START");
    maxScore = 0;
    rod = "Rod1"
    
    resetBoard(rod);
})();



function resetBoard(rodName) {

    rod1.style.left = (windowWidth - rod1.offsetWidth) / 2 + 'px';
    rod2.style.left = (windowWidth - rod2.offsetWidth) / 2 + 'px';
    ball.style.left = (windowWidth - ball.offsetWidth) / 2 + 'px';


    // Lossing player gets the ball
    if (rodName === rod2Name) {
        ball.style.top = (rod1.offsetHeight) + 'px';
        ballSpeedY = 2;
    } 
    else if (rodName === rod1Name && maxScore != 0) {
        ball.style.bottom = (rod2.offsetTop) + 'px';
        ballSpeedY = -2;
    }

    score = 0;
    gameOn = false;

}



function storeWin(rod, score) {

    if (score > maxScore) {
        maxScore = score;
        rod = rod;
    }

    clearInterval(movement);
    resetBoard(rod);

    alert(rod + " wins with a score of " + (score * 100) + ". Max score is: " + (maxScore * 100));
}



window.addEventListener('keypress', function () {
    let rodSpeed = 20;

    let rodRect = rod1.getBoundingClientRect();

    if (event.code === "KeyD" && ((rodRect.x + rodRect.width) < window.innerWidth)) {
        rod1.style.left = (rodRect.x) + rodSpeed + 'px';
        rod2.style.left = rod1.style.left;
    } 
    else if (event.code === "KeyA" && (rodRect.x > 0)) {
        rod1.style.left = (rodRect.x) - rodSpeed + 'px';
        rod2.style.left = rod1.style.left;
    }
    else if (event.code === "Enter") {
        if (!gameOn) {
            gameOn = true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;

            let rod1Height = rod1.offsetHeight;
            let rod2Height = rod2.offsetHeight;
            let rod1Width = rod1.offsetWidth;
            let rod2Width = rod2.offsetWidth;


            movement = setInterval(function () {
                // Move ball
                console.log("hello");
                console.log(ballSpeedX, ballSpeedY); 
                ballX += ballSpeedX;
                ballY += ballSpeedY;
                console.log(ballX, ballY);

                rod1X = rod1.getBoundingClientRect().x;
                rod2X = rod2.getBoundingClientRect().x;

                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';


                if ((ballX + ballDia) >= windowWidth || ballX <= 0) {
                    ballSpeedX = -ballSpeedX; // Reverses the direction
                }

                // It specifies the center of the ball on the viewport
                let ballPos = ballX + ballDia / 2;

                // Check for Rod 1
                if (ballY <= rod1Height) {
                    ballSpeedY = -ballSpeedY; // Reverses the direction

                    // Check if the game ends
                    if ((ballPos < rod1X) || (ballPos > (rod1X + rod1Width))) {
                        storeWin(rod2Name, score);
                    }
                    score++;
                }

                // Check for Rod 2
                else if ((ballY + ballDia) >= (windowHeight - rod2Height)) {
                    ballSpeedY = -ballSpeedY; // Reverses the direction

                    // Check if the game ends
                    if ((ballPos < rod2X) || (ballPos > (rod2X + rod2Width))) {
                        storeWin(rod1Name, score);
                    }
                    score++;
                }
            }, 10);
        }
    }
});
