const body = window.document.body;
const spans = document.querySelectorAll("span");
const bestScore = document.querySelector("#bestScore");
const result = document.querySelector("#result");
let resultMode = true;
let isPlaying = false;
let startTimer = null;
let stopTimer = null;
let timeoutRef = null;
let minScore = null;
let darkMode = () => {
    body.style.backgroundColor = "black";
    spans.forEach((node) => {
        node.style.color = "white";
    })
}
let lightMode = () => {
    body.style.backgroundColor = "white";
    spans.forEach((node) => {
        node.style.color = "black";
    })
}
let isDark = () => {
    return (body.style.backgroundColor === "black");
}
let falsePlay = () => {
    result.innerHTML = "FALSE PLAY"+"<br><br>To try again, hit the space bar or click anywhere";
}
let getResult = () => {
    let reactionTime = stopTimer - startTimer;
    result.innerHTML = `Your reaction time was ${reactionTime} ms.`.toUpperCase()+"<br><br>To try again, hit the space bar or click anywhere.";
    if(!minScore || minScore>reactionTime){
        bestScore.innerHTML = `${reactionTime}ms`;
        minScore = reactionTime;
    }
}

result.innerHTML = "Click anywhere on the screen or use the space key to test".toUpperCase();
darkMode();
function clicked(){
    if((!isPlaying)){
        result.innerHTML = "When the background color changes, hit the space bar".toUpperCase();
        isPlaying = true;
        let rand = (((parseInt((Math.random())*10000)))%6000) + 2000; 
        console.log(rand);
        timeoutRef = setTimeout(() => {
            lightMode();
            result.innerHTML = "hit the space bar".toUpperCase();
            startTimer = new Date().getTime();

        }, rand);
    }
    else if(isPlaying){
        isPlaying = false;
        if(isDark()){
            clearTimeout(timeoutRef);
            // lightMode();
            falsePlay();
        }
        else{
            getResult();
            darkMode();
        }            
    }
}


document.addEventListener("keydown", (e) => {
    stopTimer = new Date().getTime();
    e.stopPropagation();
    if(e.key === ' '){
        clicked();
    }
});
document.addEventListener("click", (e) => {
    stopTimer = new Date().getTime();
    e.stopPropagation();
    clicked();
});
