
// diable clicking on card
card_Click_Disabled = (card) =>{
    card.classList.add('disabled')
}

// enable clicking on card
card_Click_Enable = (card)=>{
    card.classList.remove('disabled')
}

// tap card effect
play_click_card = () => {
    const tap_button_sound = document.getElementById('tap_card_sound');
    tap_button_sound.currentTime = 0;
    tap_button_sound.play()
}   

// match cards effect
play_match_card = () => {
    const ding = document.getElementById('match_card_sound');
    ding.currentTime = 0;
    ding.play()
}
// unMatch cards effects
play_unmatch_card = () => {
    const error = document.getElementById('unMatch_card_sound');
    error.currentTime = 0;
    error.play()
}
// play win condition
play_win_game = () =>{
    const win = document.getElementById('win_game');
    win.currentTime = 0
    win.play();
}

// start the game
//define an array to hold current emoji
let storeEmoji = [];
startGame = (btn) => {
    // After we start the game , emojies sets in random blocks
    setEmoji()
    isGameStarted = true;
    btn.textContent = "Reset game"
    btn.style.color = "red"

    // enable click all cards after we start the game
    Enable_click_allCards()
    click_Card()
}


const removeClickEvents = () => {
    const emojiBoxes = document.querySelectorAll('.emojiBox');
    emojiBoxes.forEach((box) => {
        box.replaceWith(box.cloneNode(true));
    });
};

// reset the game
resetGame = (btn) => {
    removeClickEvents()
    //make storeEmoji empty if it has emogi
    if(storeEmoji.length>0){
        storeEmoji.pop()
    }
    isGameStarted = false;
    btn.textContent = "Start Game"
    btn.style.color = "green";

    // Disable all cards after reset
    const emojiBoxes = document.querySelectorAll('.emojiBox');
    emojiBoxes.forEach(box => {
        box.classList.remove("show")
        box.classList.remove("brightEmoji")
        card_Click_Disabled(box); 
    });
    count_Match_Cards = 0;
}

// play game after winning
play_Game_After_Winning = () =>{
    document.querySelector('.container').classList.remove("win_background")
    document.querySelector('.win_condition_game').style.display = "none"
}


// disable all cards
disable_click_allCards = () => {
    const emojiBoxes = document.querySelectorAll('.emojiBox');
    emojiBoxes.forEach((box , index) =>{
        card_Click_Disabled()
    })
}

// enable all cards
Enable_click_allCards = () => {
    const emojiBoxes = document.querySelectorAll('.emojiBox');
    emojiBoxes.forEach((box , index) =>{
        if(count_Match_Cards>0){
            if ( !(box.classList.contains('disabled'))){
                card_Click_Enable(box)
            }
        }
        else{
            card_Click_Enable(box)
        }
    })
}

// end of game
checkWinCondition= () =>{
    document.querySelector('.container').classList.add("win_background")
    document.querySelector('.win_condition_game').style.display = "flex";
    setTimeout(play_win_game(),500)
}

let count_Match_Cards =0;
isGameStarted = false;

// ----------------------------------------------------------------- //

// set emojies to each box
setEmoji = () => {

    var emojies = ['🎈','🎈','😊' ,'😊' ,'🌛' ,'🌛' , '✔', '✔', '😎','😎' , '💖', '💖','🧨' ,'🧨' ,'✌' , '✌'];
    let result = [];
    let count_Match_Cards =0;
    isGameStarted = false;

    console.log("start")
    while(emojies.length >0){
        
        // choose random emoji from rest of emojies in array
        let randomIndex = Math.floor(Math.random()*emojies.length)
        
        console.log("random index :" , randomIndex)

        // add random emoji into an result array
        result.push(emojies[randomIndex]);

        // delete random emoji from emojies
        emojies.splice(randomIndex , 1)
    }
    
    const emojiBoxes = document.querySelectorAll('.emojiBox');
    emojiBoxes.forEach((box , index) =>{
        box.innerHTML = result[index]
        
    })
}
// -----------------------------------------------------
// click on card
click_Card = () =>{

    const emojiBoxes = document.querySelectorAll('.emojiBox');

    emojiBoxes.forEach( (box , index)  =>{
        box.addEventListener('click' ,  ()=> {

            play_click_card()

            box.classList.add('show')   

            // disable the card after we clicked on it
            card_Click_Disabled(box)

            // check this click is first or second
            if(storeEmoji.length==0){
                // store box when you click on it
                storeEmoji.push(box);
            }
            else{
                firstBox = storeEmoji.pop()
                setTimeout( ()=> checkEmojies(firstBox ,box ) ,300)
                setTimeout( () => Enable_click_allCards() , 600)
            }
        })
    })
}

resultBtn = document.querySelector("#result")
playAgainBtn = document.querySelector('.start_again')
isGameStarted = false;
resultBtn.addEventListener("click" , () =>{
    // start the game
    if(!isGameStarted){
        startGame(resultBtn)
    }
    // reset the game
    else(
        resetGame(resultBtn)
    )
})

playAgainBtn.addEventListener( "click" ,() =>{
    play_Game_After_Winning()
    resetGame(resultBtn) 
})
// ---------------------------------------------------------

// check two emojies when you click on them

checkEmojies = (firstBox , secondBox) => {

    if(firstBox.textContent === secondBox.textContent){

        // disabled these 2 cards
        card_Click_Disabled(firstBox);
        card_Click_Disabled(secondBox); 

        play_match_card()

        firstBox.classList.add('brightEmoji');
        secondBox.classList.add('brightEmoji');

        count_Match_Cards++;
        if(count_Match_Cards == 8){
            setTimeout(checkWinCondition() ,4000)
        }
    }
    else{
        // enable these two cards
        card_Click_Enable(firstBox)
        card_Click_Enable(secondBox)
        
        firstBox.classList.remove('show')
        secondBox.classList.remove('show')

        play_unmatch_card()
    }
}