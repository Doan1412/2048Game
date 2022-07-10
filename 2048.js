var board;
let score = 0;
let best = [];
var n;
window.onload = function(){
    setUp();
}
function update(block,num){
    block.innerText="";
    block.classList.value="";
    block.classList.add("block");
    if(num>0){
        block.innerText=num;
        block.classList.add("x"+num.toString());
    }
}
function setUp() {
    board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    ranPos();
    ranPos();
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let block = document.createElement("div");
            block.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            update(block, num);
            document.getElementById("board").append(block);
        }
    }
    let i = 0;
    while (localStorage.getItem(i.toString())!==null) {
        best[i] = Number(localStorage.getItem(i.toString()));
        ++i;
    }
    n=i;
    let bst=best[0];
    for(j=0;j<n;j++){
        if(bst<best[j]){
            bst = best[j];
        }
    }
    document.getElementById("BEST").innerText = bst.toString();
}
function ranPos(){
    r= Math.floor((Math.random() * 4));
    c= Math.floor((Math.random() * 4));
    while(board[r][c]!=0){
        r= Math.floor((Math.random() * 4));
        c= Math.floor((Math.random() * 4));
    }
    board[r][c]=2;
    return [r,c];
}
function moveUp(){
    var t=0;
    for(let i= 0; i < 4; i++){
        for(let j= 0; j < 4; j++){
            if(board[j][i]==0){
                for(let k=j; k < 4; k++){
                    if (board[k][i] != 0){
                        t=1;
                        board[j][i]=board[k][i];
                        board[k][i]=0;
                        j=j+1;
                    }
                }
            }
        }
    }
    for(let i= 0; i < 4; i++){
        for(let j= 0; j < 3; j++){
            if(board[j][i]!=0){
                if(board[j][i] == board[j+1][i]){
                    t=1;
                    board[j][i]*=2;
                    score+=board[j][i];
                    for(let k=j+1; k < 3; k++){
                        board[k][i]=board[k+1][i];
                    }
                    board[3][i]=0;
                }
                while(board[0][i]==0){
                    for(let k=0; k < 3; k++){
                        board[k][i]=board[k+1][i];
                    }
                    board[3][i]=0;
                }
            }
        }  
    }
    for(let i=0; i < 4; i++){
        for(let j= 0; j < 4; j++){
            let block = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            update(block, num);
        }
    }
    if(t==1){
        var [r,c]=ranPos();
        b=document.getElementById(r.toString() + "-" + c.toString());
        setTimeout(function (){
            update(b, 2);
        }, 200);
    }
    if(check()==true){
        lose();
        return 0;
    }
}
function moveDown(){
    var t=0;
    for (let i=3; i > -1; i--){
        for (let j=3; j > -1; j--){
            if (board[j][i] == 0){
                for (let k=j;k>-1;k--){
                    if (board[k][i] != 0){
                        t=1;
                        board[j][i]=board[k][i];
                        board[k][i]=0 ;
                        j=j-1;
                    }
                        
                }
            }
        } 
    }       
    for (let i=3; i > -1; i--){
        for (let j=3; j > 0; j--){
            if (board[j][i]!=0){
                if(board[j][i] == board[j-1][i]){
                    t=1;
                    board[j][i]*=2;
                    score +=board[j][i];
                    for (let k=j-1;k>0;k--){
                        board[k][i]=board[k-1][i]  ;
                    }     
                    board[0][i]=0;
                }
                    
                while(board[3][i]==0){
                    for (let k=3;k>-1;k--){
                        board[k][i]=board[k-1][i];
                    }
                    board[0][i]=0;
                }
            }
        }
    }
    for(let i=0; i < 4; i++){
        for(let j= 0; j < 4; j++){
            let block = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            update(block, num);
        }
    }
    if(t==1){
        var [r,c]=ranPos();
        b=document.getElementById(r.toString() + "-" + c.toString());
        setTimeout(function (){
            update(b, 2);
        }, 200);
    }
    if(check()==true){
        lose();
        return 0;
    }
}
function moveLeft(){
    var t=0;
    for(let j= 0; j < 4; j++){
        for(let i= 0; i < 4; i++){
            if(board[j][i]==0){
                for(let k=i; k < 4; k++){
                    if (board[j][k] != 0){
                        t=1;
                        board[j][i]=board[j][k];
                        board[j][k]=0;
                        i=i+1;
                    }
                }
            }
        }
    }
    for(let j= 0; j < 4; j++){
        for(let i= 0; i < 3; i++){
            if(board[j][i]!=0){
                if(board[j][i] == board[j][i+1]){
                    t=1;
                    board[j][i]*=2;
                    score+=board[j][i];
                    for(let k=i+1; k < 3; k++){
                        board[j][k]=board[j][k+1];
                    }
                    board[j][3]=0;
                }
                while(board[j][0]==0){
                    for(let k=0; k < 3; k++){
                        board[j][k]=board[j][k+1];
                    }
                    board[j][3]=0;
                }
            }
            
        }  
    }
    for(let i=0; i < 4; i++){
        for(let j= 0; j < 4; j++){
            let block = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            update(block, num);
        }
    }
    if(t==1){
        var [r,c]=ranPos();
        b=document.getElementById(r.toString() + "-" + c.toString());
        setTimeout(function (){
            update(b, 2);
        }, 200);
    }
    if(check()==true){
        lose();
        return 0;
    }
}
function moveRight(){
    var t=0;
    for (let j=3; j > -1; j--){
        for (let i=3; i > -1; i--){
            if (board[j][i] == 0){
                for (let k=i;k>-1;k--){
                    if (board[j][k] != 0){
                        t=1;
                        board[j][i]=board[j][k];
                        board[j][k]=0 ;
                        i=i-1;
                    }
                        
                }
            }
        } 
    }       
    for (let j=3; j > -1; j--){
        for (let i=3; i > 0; i--){
            if (board[j][i]!=0){
                if(board[j][i] == board[j][i-1]){
                    t=1;
                    board[j][i]*=2;
                    score+=board[j][i];
                    for (let k=i-1;k>0;k--){
                        board[j][k]=board[j][k-1]
                    }     
                    board[j][0]=0;
                }
                while(board[j][3]==0){
                    for (let k=3;k>-1;k--){
                        board[j][k]=board[j][k-1];
                    }
                    board[j][0]=0;
                }
            }
        }
    }
    for(let i=0; i < 4; i++){
        for(let j= 0; j < 4; j++){
            let block = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            update(block, num);
        }
    }
    if(t==1){
        var [r,c]=ranPos();
        b=document.getElementById(r.toString() + "-" + c.toString());
        setTimeout(function (){
            update(b, 2);
        }, 200);
    }
    if(check()==true){
        lose();
        return 0;
    }
}
document.addEventListener('keyup', (e) => {
    if(e.code=="ArrowUp"){
        moveUp();
    }
    if(e.code=="ArrowDown"){
        moveDown();
    }
    if(e.code=="ArrowRight"){
        moveRight();
    }
    if(e.code=="ArrowLeft"){
        moveLeft();
    }
    document.getElementById("scoreNow").innerText = score;
})
function check(){
    for(let i=0; i < 4; i++){
        for(let j=0; j < 4; j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    for(let i=0; i < 3; i++){
        if(board[0][i]==board[0][i+1]||board[i][0]==board[i+1][0]||board[3][i]==board[3][i+1]||board[i][3]==board[i+1][3]){
            return false;
        }
    } 
    for(let i=1; i < 3; i++){
        for(let j=1; j < 3; j++){
            if(board[i][j]==board[i-1][j]||board[i][j]==board[i+1][j]||board[i][j]==board[i][j+1]||board[i][j]==board[i][j-1]){
                return false;
            }
        }
    }
    return true;
}
function lose(){
    p=document.createElement("span");
    p.innerText="Game over !";
    p.classList="loser";
    document.getElementById("board").append(p);
    // document.getElementById("los");
    bu=document.createElement("button");
    bu.innerText="Try again";
    bu.classList="retry";
    bu.addEventListener("click",function(){
        location.reload();
    });
    document.getElementById("board").append(bu);
    for(var i=0; i<4; i++) {
        for(var j=0; j<4;j++) {
            let block = document.getElementById(i.toString() + "-" + j.toString());
            block.classList.add("blur");
        }
    }
    localStorage.setItem(n.toString(),score);
}