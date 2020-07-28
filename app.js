document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.board')
    const flagsLeft = document.querySelector('#flags-left')
    const result = document.querySelector('#result')
    let width = 10
    let boomboomAmount = 20
    let flags = 0
    let squares = []
    let isGameOver = false
  
    //create Board
    function createBoard() {
      flagsLeft.innerHTML = boomboomAmount
  
      //get shuffled game array with random boombooms
      const boomboomsArray = Array(boomboomAmount).fill('boomboom')
      const emptyArray = Array(width*width - boomboomAmount).fill('correct')
      const gameArray = emptyArray.concat(boomboomsArray)
      const shuffledArray = gameArray.sort(() => Math.random() -0.5)
  
      for(let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        square.setAttribute('id', i)
        square.classList.add(shuffledArray[i])
        grid.appendChild(square)
        squares.push(square)
  
        //normal click
        square.addEventListener('click', function(e) {
          click(square)
        })
  
        //cntrl and left click
        square.oncontextmenu = function(e) {
          e.preventDefault()
          addFlag(square)
        }
      }
  
      //add numbers
      for (let i = 0; i < squares.length; i++) {
        let total = 0
        const isLeftEdge = (i % width === 0)
        const isRightEdge = (i % width === width -1)
  
        if (squares[i].classList.contains('correct')) {
          if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('boomboom')) total ++
          if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('boomboom')) total ++
          if (i > 10 && squares[i -width].classList.contains('boomboom')) total ++
          if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('boomboom')) total ++
          if (i < 98 && !isRightEdge && squares[i +1].classList.contains('boomboom')) total ++
          if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('boomboom')) total ++
          if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('boomboom')) total ++
          if (i < 89 && squares[i +width].classList.contains('boomboom')) total ++
          squares[i].setAttribute('data', total)
        }
      }
    }
    createBoard()
  
    function addFlag(square) {
      if (isGameOver) return
      if (!square.classList.contains('checked') && (flags < boomboomAmount)) {
        if (!square.classList.contains('flag')) {
          square.classList.add('flag')
          square.innerHTML = ' 🚩'
          flags ++
          flagsLeft.innerHTML = boomboomAmount- flags
          checkForWin()
        } else {
          square.classList.remove('flag')
          square.innerHTML = ''
          flags --
          flagsLeft.innerHTML = boomboomAmount- flags
        }
      }
    }
  
    function click(square) {
      let currentId = square.id
      if (isGameOver) return
      if (square.classList.contains('checked') || square.classList.contains('flag')) return
      if (square.classList.contains('boomboom')) {
        gameOver(square)
      } else {
        let total = square.getAttribute('data')
        if (total !=0) {
          square.classList.add('checked')
          if (total == 1) square.classList.add('one')
          if (total == 2) square.classList.add('two')
          if (total == 3) square.classList.add('three')
          if (total == 4) square.classList.add('four')
          square.innerHTML = total
          return
        }
        checkSquare(square, currentId)
      }
      square.classList.add('checked')
    }
  
  
    function checkSquare(square, currentId) {
      const isLeftEdge = (currentId % width === 0)
      const isRightEdge = (currentId % width === width -1)
  
      setTimeout(() => {
        if (currentId > 0 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId > 9 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1 -width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId > 10) {
          const newId = squares[parseInt(currentId -width)].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId > 11 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1 -width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 98 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 90 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1 +width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 88 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1 +width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if (currentId < 89) {
          const newId = squares[parseInt(currentId) +width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
      }, 10)
    }
  
    //game over
    function gameOver(square) {
      result.innerHTML = 'BOOM! Game Over!'
      isGameOver = true
  
      //show ALL the boombooms
      squares.forEach(square => {
        if (square.classList.contains('boomboom')) {
          square.innerHTML = '💣'
          square.classList.remove('boomboom')
          square.classList.add('checked')
        }
      })
    }
  
    function checkForWin() {
        let matches = 0
  
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('flag') && squares[i].classList.contains('boomboom')) {
                matches ++
            }
            if (matches === boomboomAmount) {
                result.innerHTML = 'YOU WIN!'
                isGameOver = true
            }
        }
    }
  });