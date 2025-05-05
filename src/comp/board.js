import React, { useState, useEffect, useCallback } from "react";
import cometImg from "../res/celestial_bonk.png";
import "../comp/board.css";

const Board = () => {

    const [board, setBoard] = useState([]);
    const [cometLoc, setCometLoc] = useState([]);
    const [over, setOver] = useState(false);
    const [win, setWin] = useState(false);

    const row = 8;
    const col = 8;
    const comet = 8;

    useEffect(() => {

        initialize();

    }, []);

    const initialize = () => {

        const gameBoard = createBoard();
        setBoard(gameBoard);
        const cometLoc = placeComets(gameBoard);
        setCometLoc(cometLoc);
        setOver(false);
        setWin(false);

    }


    const createBoard = () => {

        /*
    
            Crea la board con dos for each, uno para rows y otro para cols.
    
            Por cada celda, se pone el valor a 0 (luego se actualiza a mina o blanco), se deja oculta, y las coordenadas. Luego se añade a la board.
    
        */

        let board = [];

        for (let i = 0; i < row; i++) {

            let rows = [];

            for (let j = 0; j < col; j++) {

                rows.push({ value: 0, revealed: false, x: i, y: j });

            }

            board.push(rows);

        }

        return board;

    };

    const placeComets = (board) => {

        /*
            
            Se coge la board y se inicializa el array de las minas. 
            
            Se colocan las minas de forma aleatoria y se checkea si hay dupes. 
            
            Luego se actualizan los valores de las celdas que no son minas, y se recoge el array que contiene las minas.
    
        */

        let comets = [];

        while (comets.length < comet) {

            let x = Math.floor(Math.random() * row);
            let y = Math.floor(Math.random() * col);

            let cell = board[x][y];

            if (!comets.some(comets => comets.x === cell.x && comets.y === cell.y)) {

                comets.push(cell);
                cell.value = 'C';

            }

        }

        updateNumbers(board);
        return comets;

    };

    const updateNumbers = (board) => {

        /*
    
            Coge la board y comprobamos si el valor de la celda es C.
    
            Si no es C, comprobamos que las celdas vecinas sean C. De ser así, se incrementa el contador de minas y se actualiza el valor.
    
        */

            for (let i = 0; i < row; i++) {

                for (let j = 0; j < col; j++) {

                    if (board[i][j].value === 'C') continue;
            
                    let comets = 0;
                    const neighbors = getNeighbors(i, j);

                    neighbors.forEach(neighbor => {

                        if (board[neighbor.x][neighbor.y].value === 'C') comets++;

                    });


                    board[i][j].value = comets;
                }
            }
            



    };

    const getNeighbors = (x, y) => {

        /* 
    
            Se recogen las coordenadas de las celdas, se calculan las de las celdas vecinas y se obtienen las coordenadas de esas celdas
    
        */

            const directions = [
                [-1, -1], [-1, 0], [-1, 1], 
                [0, -1],           [0, 1], 
                [1, -1], [1, 0], [1, 1]
            ];
            const neighbors = [];
        
            directions.forEach(([dx, dy]) => {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < row && ny >= 0 && ny < col) {
                    neighbors.push({ x: nx, y: ny });
                }
            });
        
            return neighbors;

    };

    const handleClick = (x, y) => {

        /*
        
            Manejador del click en una celda
    
        */

        if (over) return;

        let gameBoard = [...board]
        let cell = gameBoard[x][y];

        if (cell.value === 'C') {

            revealComets(gameBoard);
            setOver(true);

        } else {

            revealCell(gameBoard, x, y);

        }

        setBoard(gameBoard);

        if (checkWin(gameBoard)) {
            setWin(true);

        }

    };

    const handleRightClick = (x, y, event) => {

        /*
        
            Para poner banderitas

        */

        event.preventDefault(); // esto sirve para que no te salga el menú de click derecho
        
        if (over || board[x][y].revealed) return; 
      
        let newBoard = [...board];
        let cell = newBoard[x][y];
      
        cell.flagged = !cell.flagged;
      
        setBoard(newBoard); 

      };

    const revealComets = (board) => {

        /*
        
            Manejador de revelar cometas
    
        */

        board.forEach(rows => {

            rows.forEach(cell => {

                if (cell.value === 'C') {

                    cell.revealed = true;
                }

            })

        })

    };

    const revealCell = (board, x, y) => {

        /*
        
            Manejador de revelar celdas
    
        */

        let cell = board[x][y];

        if (cell.revealed) return;
        cell.revealed = true;

        if (cell.value !== 0) return;

        const neighbors = getNeighbors(x, y);
        neighbors.forEach(neighbor => {

            revealCell(board, neighbor.x, neighbor.y);

        });

    };

    const checkWin = (board) => {

        /* 
        
            Comprueba si se ha ganado 
        
        */

        for (let i = 0; i < row; i++) {

            for (let j = 0; j < col; j++) {
                
                const cell = board[i][j]

                if (cell.value!=='C' && !cell.revealed) return false;

            }

        }

        return true;

    };

    const renderBoard = () => {

        /*
        
            Manejador de renderizado de la board
    
        */

        return board.map((row, rowIndex) => (

            <div key={rowIndex} className="row">

                {row.map((cell, colIndex) => (

                    <div key={colIndex} className={`cell ${cell.revealed ? 'revealed' : ''}`} onClick={() => handleClick(cell.x, cell.y)}  onContextMenu={(e) => handleRightClick(cell.x, cell.y, e)}>

                        {cell.revealed && (cell.value === 'C' ? <img src={cometImg} alt="cometa" /> : cell.value)}
                        {cell.flagged && <span className="flag">🚩</span>}

                    </div>

                ))}

            </div>

        ));
        
    };

    return (

        <div className="boardBase">

            <div className="board">

                {renderBoard()}

            </div>

            {over && <div className="loss">¡Perdiste! 💣</div>}
            {win && <div className="win">¡Ganaste! 🎉</div>}

            <button onClick={initialize}>Volver a jugar</button>

        </div>

    );

};

export default Board;