const size = 3;
var board = [];
var solBoard = [];
var turn = 1;
var currentIndex = 4;
var gridColor = "Aqua"
var flag = false;

function table(prefix, coloring = gridColor){

    let s = "<table border ='1' width:90% height:90%>" ;

    for(let row=0; row<size; row++){
        s+= "<tr>"//closing and ending a row

        for(let col = 0; col<size; col++){
            s+="<td id ='" + prefix + (size*row +col).toString() + 
            "' onclick='clickHandler(this.id)' style = 'width:50px; height:50px; text-align:center; font-size:20px; background-color:" + coloring + "'>"
            + "-" + "</td>";

        }
        s+= "</tr>"
    }

    s += "</table>";

    return s;
}

function clickHandler(id){
    const b = parseInt(id[1])
    const loc = parseInt(id[2])

    if ((b==currentIndex & board[b][loc] == null & !flag) || (board[b][loc] == null & flag)){

        if (turn==0){
            var move = "X"
        }
        else{
            var move ="O"
        }

        changeGridColor(currentIndex, loc, 'orange'); //highlight next board
        document.getElementById(id).innerText = move; //display move
        board[b][loc] = move; //store move

        if(!board[loc].includes(null)){
            CGC(loc, "Aquamarine")
            flag = true;
        }

        else{
            if(flag){
                flag = false;
                CGC(loc, gridColor);
            }
        }


        w = checkWin(board[b], loc)
        if (w!=null & solBoard[b]==null){
            solBoard[b] = w;
            document.getElementById("s" + b.toString()).innerText = move;
            w = checkWin(solBoard, b)
            if (w!=null){
                alert(w + " Has Won the Game!")
            }
        }

        updateTurn();//next turn
        currentIndex = loc;

    }
}

function bigTable(){
    
    createBoard();

    turn = 1;
    updateTurn();
    currentIndex =4;

    let s = "<table border = '1' width:500px height:500px>";

    for(R=0; R<size; R++){
        s+="<tr>";
        for(C=0; C<size; C++){
            s+="<td>";
            s+=table('b' + (size*R+C).toString());
            s+="</td>";
        }
        s+="</tr>";
    }

    document.getElementById("div").innerHTML = s;
    changeGridColor(null, 4, 'orange');
    sol = table("s", coloring = 'gold')
    document.getElementById("div2").innerHTML = sol
}

function createBoard(){
    board = [];
    solBoard = [];
    for(i=0; i<size*size; i++){
        board[i] = [];
        solBoard[i] = null;
        for (j=0; j<size*size; j++){
            board[i][j] = null;
        }
    }
}

function changeGridColor(prev, grid, color){
    if(prev != null){

        for(i=0; i<size*size; i++){
            document.getElementById("b" + prev.toString() + i.toString()).style.backgroundColor = gridColor
            document.getElementById("b" + grid.toString() + i.toString()).style.backgroundColor = color
        }
    }
    else{
        for(i=0; i<size*size; i++){
            document.getElementById("b" + grid.toString() + i.toString()).style.backgroundColor = color
    }
    }
}

function CGC(outcast, c){
    for(i=0; i<size*size; i++){
        if(i!=outcast){        
            for(j=0; j<size*size; j++){
            document.getElementById("b" + i.toString() + j.toString()).style.backgroundColor = c;
            }
        }
    }
}

function checkWin(state, lastInput){
    const value = state[lastInput];
    const row = Math.floor(lastInput/size);
    const col = lastInput%3;
    if(state[row*3] == state[row*3+1] && state[row*3+1] == state[row*3+2]){ //Check Row
        return value;
    }
    else if(state[col] == state[col+3] && state[col] == state[col+6]){ //Check Column
        return value;
    }
    else if (lastInput%2 == 0){ //Check Diagonals
        if (value == state[0] & state[0] == state[4]  & state[0] == state[8]){
            return value;
        }
        else if (value == state[2] & state[2] == state[4] & state[4] == state[6]){
            return value;
        }

        }
    return null
    }

    function updateTurn(){
        if(turn==0){
            turn = 1;
            document.getElementById("toMove").innerText = "O to move"
        }
        else{
            turn = 0;
            document.getElementById("toMove").innerText = "X to move"
        }
    }


