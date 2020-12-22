document.addEventListener('DOMContentLoaded',()=>{

     const grid = document.querySelector('.grid');
     const car = document.createElement('div');
     const lvl = document.querySelector('.showlvl');
     let carLeftSpace = 50 ;
     let startPoint = 20;
     let carBottomSpace = startPoint;
     let isGameOver = false;
     let platformCount = 4;
     let platforms = [];
     let score = 0;
     let interval ;
     let interval1 ;
     let interval2 ;
     let interval3 ;
     let interval4 ;
     let interval5 ;
     
     

     function createCar(){
         grid.appendChild(car);
         car.classList.add('car');
         
         car.style.left = carLeftSpace + 'px';
         car.style.bottom = carBottomSpace + 'px';
         

     }
     class Platform {
        constructor(newPlatformBottom){
            this.bottom = newPlatformBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');

            const visual = this.visual
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }
     function createPlatforms(){
        for (let i = 0 ; i < platformCount; i++ ){
            let platformGap = 600 / platformCount;
            let newPlatformBottom =  300 + i * platformGap;
            let newPlatform = new Platform(newPlatformBottom);
            platforms.push(newPlatform);
            console.log(newPlatform);
        }
    }
    function movePlaforms(){
        if (carBottomSpace >= 0){
            platforms.forEach(platform =>{
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + "px";
                if (platform.bottom < 10) {
                    let firstPlatform  = platforms[0].visual;
                    firstPlatform.classList.remove('platform');
                    platforms.shift();
                    score++ 
                    //console.log(score);
                    //  console.log(platforms);
                    let newPlatform = new Platform(600);
                    platforms.push(newPlatform);
                    
                    
                }
                if((carBottomSpace >= platform.bottom) &&
                (carBottomSpace <= platform.bottom + 15) &&
                ((carLeftSpace + 50) >= platform.left) &&
                (carLeftSpace <= (platform.left + 75))){
                    gameOver();

                }
                
            })
        }
    }
    function moveleft(){
        if (carLeftSpace >= 0){
            carLeftSpace -=30;
        car.style.left = carLeftSpace + 'px';
        }
    }
    function moveRight(){
        if(carLeftSpace <= 340){
            carLeftSpace +=30;
            car.style.left = carLeftSpace + 'px';
        } 
    }
    function moveUp() {
        carBottomSpace +=30;
        car.style.bottom = carBottomSpace + 'px';
    }
    function moveDown(){
        if (carBottomSpace >= 30){
            carBottomSpace -=30;
        car.style.bottom = carBottomSpace + 'px';
        }
        
    }

    function control(e) {
        if(e.key === "ArrowLeft"){
            moveleft();
        }else if (e.key === "ArrowRight"){
            moveRight();
        }else if (e.key === "ArrowUp"){
            moveUp();
        }else if (e.key === "ArrowDown"){
            moveDown();
        }
    }
    function gameOver() {
         console.log('Game over');
         isGameOver == true;
         grid.innerHTML ="Your score is  " + score;
         
         clearInterval(interval);
         clearTimeout(interval2);
         clearTimeout(interval3);
         clearTimeout(interval4);
         clearTimeout(interval5);
         
         
         
   }
   
    
    function moveEverything(){
        
        interval1 = setTimeout(() => {
            
            interval = setInterval(movePlaforms,30);
            lvl.innerHTML = "Level 1"
            
            
            
        }, 1);
       
        interval2 = setTimeout(() => {
            
            clearInterval(interval);
            interval = setInterval(movePlaforms,20);
            lvl.innerHTML = "Level 2"
            
            
        }, 10000);
       
        interval3 = setTimeout(() => {
            clearInterval(interval);
            interval = setInterval(movePlaforms,15);
            lvl.innerHTML = "Level 3";
            
            
        }, 20000);
          interval4 = setTimeout(() => {
            clearInterval(interval);
            interval = setInterval(movePlaforms,10);
            lvl.innerHTML = "Level 4";
            
            
        }, 35000);
         interval5 = setTimeout(() => {
            clearInterval(interval);
            interval = setInterval(movePlaforms,5);
            lvl.innerHTML = "Level 5";
            
            
        }, 50000);

    }
    
     
     function start(){
          if(isGameOver == false) {
              createPlatforms();
              createCar();
              moveEverything();
             
             
             
             
              document.addEventListener('keyup',control);
              
          }
     }
     start();
})