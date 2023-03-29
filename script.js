const debugButton = document.getElementById('debug')
const elements = document.querySelectorAll('.fade-in');
console.log(elements);
const breakpoint = 70;
function fadeIn() {
    const innerHeight = window.innerHeight;
    for (let i = 0; i < elements.length; i++) {
        const elementTop = elements[i].getBoundingClientRect().top;
        console.log(elementTop)
        if (elementTop < innerHeight - breakpoint) {
             elements[i].classList.add("active")
            
        } else {
            elements[i].classList.remove('active')
           
        }
    }
}


document.querySelector('.parallax').addEventListener('scroll', fadeIn);

//add style and animation to embedded svg frame
window.addEventListener('load', function () {
    const ellipse = document.querySelector('#react');
    console.log(ellipse)
    const frame = ellipse.contentWindow.document;
    const styleElement = frame.createElementNS("http://www.w3.org/2000/svg", "style");
    let rotate = 0;
    let top;
    function rotateAtom(){
        const elements = frame.querySelectorAll('#atom > path');
        const move = top;
        top = document.getElementById('react').getBoundingClientRect().top;
        for(let i = 0; i < elements.length; i++){
            elements[i].style.transform = `rotate(${rotate}deg)`;
        }
        // console.log("Top", top);
        // console.log("Move", move)
        if( top > move){
            rotate = rotate - 1;
        }else{
            rotate = rotate + 1;
        }
      
      
    }
    document.querySelector('.parallax').addEventListener('scroll', rotateAtom);
    styleElement.textContent = `
    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes pulse {
        0% { filter: drop-shadow(0px, 0px, 8px, white ); }
        50% {filter: drop-shadow(0px, 0px, 20px, white ); }
        100% { filter: drop-shadow(0px, 0px, 8px, white) ); }
    }
    
    #atom > path { 
        transform-origin: center;
       }
  `;
    frame.getElementById('atom').appendChild(styleElement)
})

function debugMode() {
    const groups = document.querySelectorAll('.parallax__group');
    const layers = document.querySelectorAll('.parallax__layer');
    for(let i = 0; i < groups.length; i++){
        groups[i].classList.toggle('parallax__debug')
    }
    for(let i = 0; i < layers.length; i++){
        layers[i].classList.toggle('parallax__shadow')
    }

    
}

;

debugButton.addEventListener('click', debugMode );