document.addEventListener('DOMContentLoaded', () => {

    const board = document.querySelector('.board');
    const flagsLeft = document.querySelector('#flags-left');
    const result = document.querySelector('#result');

    let width = 10;
    let boomAmount = 20;
    let flags = 0;
    let squares = [];
    let gameOver = false;

    //init board
    function initBoard() {
        flagsLeft.innerHTML = boomAmount;

        const boomArr = Array(boomAmount).fill('boomboom');
        const validArr = Array(width*width - boomAmount).fill('correct');
        const boardArr = emptyArray.concat(boomArr);
        const shuffledBoard = boardArr.sort(() => Math.random() - 0.5);

        for(let ii=0; ii < width*width; ii++) {
            const square = document.createElement('div');

            square.setAttribute('id', ii);
            square.classList.add(shuffledBoard[ii]);

            board.appendChild(square);
            squares.push(square);

            square.addEventListener('click', function(e) {
                click(square);
            })
        }
    };

    click = (square) => {
        let currentId = square.id;

        if (gameOver) return;

        if (square.classList.contains('checked') || square.classList.contains('flag')) return;

        if (square.classList.contains('boomboom')){
            gameOver(square);
        }
        else {
            let total = square.getAttribute('data');

            if (total !=0) {
                square.classList.add('checked');
                
                switch (total) {
                    case 1:
                        square.classList.add('one');
                    case 2:
                        square.classList.add('two');
                    case 3:
                        square.classList.add('three');
                    case 4:
                        square.classList.add('four');
                    default:
                        break;
                }

                square.innerHTML = total;
                return;
            }
            //some checking function
        }
        square.classList.add('checked');
    }

    gameOver = (square) => {
        result.innerHTML = 'GAME OVER!';
        gameOver = true;

        //show all boom booms
        squares.forEach(square => {
            if (square.classList.contains('boomboom')) {
                square.innerHTML = '💣';
                square.classList.add('checked')
                square.classList.remote('boomboom');
            }
        })
    };
})