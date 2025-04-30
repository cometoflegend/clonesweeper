import React, {useState, useEffect} from "react";

const Board = () => {

    const [board,setBoard] = useState([]);
    const [comet,setComet] = useState([]);
    const [over,setOver] = useState([]);

    const row = 8;
    const col= 8;
    const comets = 8;

};

const createBoard = () => {

    /*

        Crea la board con dos for each, uno para rows y otro para cols.

        Por cada celda, se pone el valor a 0 (luego se actualiza a mina o blanco), se deja oculta, y las coordenadas. Luego se añade a la board.

    */

    let board=[];

    for (let i=0; i<row;i++) {

        let rows=[];

        for (let j=0; j<col;j++) {

            rows.push({value:0, revealed: false, x:i,y:j});

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

        let x = Math.floor(Math.random()* row);
        let y = Math.floor(Math.random()* col);

        let cell = board[x][y];

        if (!comets.some(comets => comets.x === cell.x && comets.y === cell.y)) {

            comets.push(cell);
            cell.value='C';

        }

    }

    updateCometCount(board);
    return comets;

};

const updateNumbers = (board) => {

    /*

        Coge la board y comprobamos si el valor de la celda es C.

        Si no es C, comprobamos que las celdas vecinas sean C. De ser así, se incrementa el contador de minas y se actualiza el valor.

    */


};

const getNeighbors = () => {

    /* 

        Se recogen las coordenadas de las celdas, se calculan las de las celdas vecinas y se obtienen las coordenadas de esas celdas

    */

}

const handleClick = () => {

    /*
    
        Manejador del click en una celda

    */

}

const revealComets = () => {

    /*
    
        Manejador de revelar cometas

    */

}

const revealCell = () => {

    /*
    
        Manejador de revelar celdas

    */

}

const renderBoard = () => {

    /*
    
        Manejador de renderizado de la board

    */

}