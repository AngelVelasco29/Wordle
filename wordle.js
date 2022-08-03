const keyboard= document.querySelector("#keyboard");
const grid= document.querySelector("#grid");
const divClue= document.querySelector(".clue");
const wordleImage= document.querySelector(".wordle-img");
const keyboardLetters =[
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
];
const listElement=[];
let myAnswer=[];
let positions=[];
const secretsWord=["amigos", "camino", "dinero", "letras","musica"];
const randomWord = Math.floor(Math.random()*(secretsWord.length));

const rows=[]
let attempts=0;
for (let row = 0; row < 5; row++) {
    const list= document.createElement("ul");
    list.classList.add("grid-row");
    for (let column = 0; column < secretsWord[randomWord].length; column++) {
        const listItem= document.createElement("li");
        listItem.classList.add("row-item");
        listItem.id=`${row}-${column}`;
        list.appendChild(listItem);        
    }
    rows.push(list);
}

grid.append(...rows);

keyboardLetters.map(letters=> {
    const list= document.createElement("ul");
    letters.map(letter=>{
        const listItem= document.createElement("li");
        switch (letter) {
            case "enter":
                listItem.innerHTML=`
                    <button onclick="checkWord()" id="${letter}"><i class="fa-solid fa-check"></i>${letter}</button>
                `;
                break;
            case "delete":
                listItem.innerHTML=`
                    <button onclick="deleteLetter()" id="${letter}"><i class="fa-solid fa-delete-left"></i></button>
                `;
                break;
        
            default:
                listItem.innerHTML=`
                    <button onclick="pressLetter()" id="${letter}">${letter}</button>
                `;
                break;
        }
        list.appendChild(listItem);
    })
    listElement.push(list);
});

keyboard.append(...listElement);

const checkWord= ()=>{
    if(attempts===5){
        alert("Ya no tienes intentos");
    }
    if(myAnswer.length===secretsWord[randomWord].length){
        attempts+=1;
        for (let i = 0; i < secretsWord[randomWord].length; i++) {
            switch (true) {
                case myAnswer[i] === secretsWord[randomWord][i]:
                    positions.push("green")
                    break;
                case secretsWord[randomWord].includes(myAnswer[i]):
                    positions.push("orange")
                    break;
                default:
                    positions.push("red")
                    break;
            }
        }
        console.log(positions);
        positions.map((color, id)=>{
            const item= document.getElementById(`${attempts-1}-${id}`);
            item.classList.add(color);
        })
        if(myAnswer.join("")=== secretsWord[randomWord]){
            alert("Ganaste el Juego")
        }
        myAnswer=[];
        positions=[];
    }else{
        alert("No escribiste tu palabra completa")
    }
}

const deleteLetter= ()=>{
    if(myAnswer.length===0){
        alert("No tienes nada escrito");
    }else{
        const item=document.getElementById(`${attempts}-${myAnswer.length-1}`);
        item.textContent="";
    }
    myAnswer.pop();
}

const pressLetter= ()=>{
    const button= event.target;
    if(myAnswer.length<secretsWord[randomWord].length){
        const currentItem=document.getElementById(`${attempts}-${myAnswer.length}`);
        currentItem.textContent=button.textContent;
        myAnswer.push(button.id);
    }else{
        alert("Tu palabra ya esta completa");
    }
    
}

const reload=()=>{
    location.reload();
}

const help=()=>{

    wordleImage.src="image/"+secretsWord[randomWord]+".jpg";
    wordleImage.classList.toggle("img-display");
}