// 背景
function createBg(bg, col, row) {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            var div = document.createElement('div');
            div.className = 'bg';
            div.style.width = '48px';
            div.style.height = '48px';
            div.style.border = '1px solid #f0f0f0';
            div.style.float = 'left';
            bg.appendChild(div);
        }
    }
}

// 画节点
function paintNodes(bodyList){
    // 在绘制新图前清空之前的
    a = document.getElementsByClassName("snake");

    v = a.length;
    for(let j=v-1;j >= 0;j--){
        // 每次节点删除后，DOM会立即更新
        bg.removeChild(a[j]); 
    }

    // 在绘制新图
    for(let i=0; i<bodyList.length; i++){
        let node = document.createElement('div');
        node.className = 'snake';
        node.style.width = '50px';
        node.style.height = '50px';
        node.style.zIndex = 999;
        node.style.position = 'absolute';
        node.innerHTML = i;
        
        node.style.left = bodyList[i].offsetLeft + 'px';
        node.style.top = bodyList[i].offsetTop + 'px';
        
        colors = ['#FF0000','#FF7400','#FF9200', '#FFB000', '#FFD100','#FFEF00','#CCF600', '#C1DB00']
        node.style.background = colors[i]
        bg.appendChild(node);
    }
}

// 画食物
function paintFood(col, row, headObj) {
    var foodX,foodY;
    gen_food();
    function gen_food() {
        foodX = parseInt(Math.random() * col) * 50;
        foodY = parseInt(Math.random() * row) * 50;
        var state = checkFood(headObj, foodX, foodY);
        if (state) {
            gen_food();
        }
    }
    var food = document.createElement('div');
    food.style.position = "absolute"
    food.style.width = '50px';
    food.style.height = '50px';
    food.style.zIndex = 999;
    food.style.background = "yellow";
    food.style.left = foodX + 'px';
    food.style.top = foodY + 'px';
    bg.appendChild(food);
    return food;
}

// 检测食物是否与头部坐标same
function checkFood(headObj, food_left, food_top){
    s1 = headObj.offsetLeft == food_left && headObj.offsetTop == food_top;
    s2 = headObj.offsetLeft+'px' == food_left && headObj.offsetTop+'px' == food_top;
    if(s1 || s2){
        return true;
    }else{
        return false;
    }
}

//头与边框碰撞检测
function checkBorder(headObj){
    if(headObj.offsetLeft<0 || headObj.offsetLeft>500 || headObj.offsetTop<0 || headObj.offsetTop>500){
        return false
    }else{
        return true
    }
}

// 事件监听
function createKeyEvent(){
    document.onkeyup = function(e){
        var event = e || window.e;
        var key = event.key;
        var direction;

        if(key == 'ArrowUp'){
            direction = 'up';
        }else if(key == 'ArrowRight'){
            direction = 'right';
        }else if(key == 'ArrowDown'){
            direction = 'down';
        }else if(key == 'ArrowLeft'){
            direction = 'left';
        }else{
            direction = 'right'; //默认右方向
        }
        bodyList[0].direction = direction;
    }
}

// 游戏自动运行时候，蛇运动
function moveBody(bodyList){
    var headObj = bodyList[0];
    newheadObj = moveHead(headObj);
    bodyList.pop();
    bodyList.unshift(newheadObj)
    return bodyList;
}

// 头部移动
function moveHead(headObj){
    var newheadObj = {};
    if(headObj.direction == 'up'){
        newheadObj.offsetTop = headObj.offsetTop - 50;
        newheadObj.offsetLeft = headObj.offsetLeft;
    }else if(headObj.direction == 'down'){
        newheadObj.offsetTop = headObj.offsetTop + 50;
        newheadObj.offsetLeft = headObj.offsetLeft;
    }else if(headObj.direction == 'left'){
        newheadObj.offsetTop = headObj.offsetTop;
        newheadObj.offsetLeft = headObj.offsetLeft - 50;
    }else if(headObj.direction == 'right'){
        newheadObj.offsetTop = headObj.offsetTop;
        newheadObj.offsetLeft = headObj.offsetLeft + 50;
    }
    newheadObj.direction = headObj.direction;
    return newheadObj;
}


function createLastNode(bodyList){
    prev = bodyList[bodyList.length - 1];
    var node = {}
    
    if(prev.direction == 'up'){
        node.offsetLeft = prev.offsetLeft;
        node.offsetTop = prev.offsetTop + 50;
        
    }else if(prev.direction == 'down'){
        node.offsetLeft = prev.offsetLeft;
        node.offsetTop = prev.offsetTop - 50;
        
    }else if(prev.direction == 'left'){
        node.offsetLeft = prev.offsetLeft + 50;
        node.offsetTop = prev.offsetTop;
        
    }else if(prev.direction == 'right'){
        node.offsetLeft = prev.offsetLeft - 50;
        node.offsetTop = prev.offsetTop;
        
    }
    node.direction = prev.direction;
    bodyList.push(node);
    return bodyList;
}




