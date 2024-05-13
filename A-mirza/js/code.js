let correctAnswers = ["خام", "اخم", "ماه", "خامه"]
let acceptedAnswers = []
let selectedChoices = []
let selectedChoiceIds = []
let answerId = "1"
let answerIdx = 0
let enteredAnswer = ""
$(document).ready(function(){
    $(".choice").click(function(){
        if(selectedChoices.indexOf($(this).text()) == -1){
            let reached = false
            for(let i=correctAnswers[answerIdx].length; i>0; i--){
            let temp = answerId
            temp += i
                    
            let currentAnswerItem = $(`#${temp}`)
            if(currentAnswerItem.text() == ""){
                let selectedChoice = $(this).text()
                        
                $(this).css({"color": "red"})
                selectedChoiceIds.push($(this).attr("id"))

                let textSpan = $(`<span>${selectedChoice}</span>`)
                textSpan.css({
                    "position": "absolute",
                    "top": `${$(this).offset().top}px`,
                    "left": `${$(this).offset().left}px`,
                    "width": "50px",
                    "line-height": "50px",
                    "text-align": "center",
                    "z-index": 1,
                    "color": "white",
                    "font-size": "28px",
                    "transition": "all .5s ease"
                })

                textSpan.addClass(`${currentAnswerItem.attr("id")}`)

                $(document.body).prepend(textSpan)

                textSpan.css({
                    "top": `${currentAnswerItem.offset().top}px`,
                    "left": `${currentAnswerItem.offset().left}px`
                })

                currentAnswerItem.css({
                    "color": `${currentAnswerItem.css("background-color")}`
                })

                currentAnswerItem.text(selectedChoice)

                let myInterval = setInterval(() => {
                    if(textSpan.offset().left == currentAnswerItem.offset().left){
                        textSpan.remove()
                        currentAnswerItem.css({
                            "color": "white"
                        })
                        reached = true

                        clearInterval(myInterval)
                    }
                }, 500);
            
                enteredAnswer += selectedChoice
                selectedChoices.push(selectedChoice)
                if(i == 1){
                    if(correctAnswers.indexOf(enteredAnswer) != -1 && acceptedAnswers.indexOf(enteredAnswer) == -1){
                        acceptedAnswers.push(enteredAnswer)
                        enteredAnswer = ""
                        answerId = Number(answerId)
                        answerId++
                        answerId = String(answerId)
                        answerIdx++

                        let acceptedItems = currentAnswerItem.parent().children()
                        for(let item of acceptedItems){
                            $(item).addClass("accepted")
                        }

                        let pointerPosition = $("#pointer").css("top")

                        let pointerTopString = ""
                        for(let item of pointerPosition){
                            if(item != "p" && item != "x"){
                                pointerTopString += item
                            }
                        }
                        let pointerTop = Number(pointerTopString)

                        pointerTop += 50
                        pointerTopString = String(pointerTop) + "px"

                        let maximumHeight = $(".answers").css("height")

                        let maximumHeightString = ""
                        for(let item of maximumHeight){
                            if(item != "p" && item != "x"){
                                maximumHeightString += item
                            }
                        }
                        let maximumHeightNumber = Number(maximumHeightString)

                        if(pointerTop < maximumHeightNumber){
                            $("#pointer").css({
                                "top": `${pointerTopString}`,
                            })
                        }
                        else{
                            $("#pointer").css({"display": "none"})
                        }

                    }
                    else{
                        let newInterval = setInterval(() => {
                            if(reached == true){
                                enteredAnswer = ""
                                let deletableAnswerItems = currentAnswerItem.parent().children()
                                for(let item of deletableAnswerItems){
                                    $(item).css({
                                        "color": `${$(item).css("background-color")}`
                                    })
                                    $(item).text("")
                                }
                                clearInterval(newInterval)
                            }
                                    
                        }, 500);
                    }

                    for(let item of selectedChoiceIds){
                        $(`#${item}`).css({"color": "white"})
                    }

                    selectedChoices = []
                    selectedChoiceIds = []
                }

                break
            }

        }
        }
                 
    })

    $(".item").click(function(){
        if(!($(this).hasClass("accepted"))){
            let currentAnswerItemId = $(this).attr("id")
            let currentAnswerContainerId = currentAnswerItemId[0]
            tempEnteredAnswer = enteredAnswer
            enteredAnswer = ""
            let deletedCharsNumber = 0
            for(let i=1; i<Number(currentAnswerItemId[1])+1; i++){
                let temp = currentAnswerContainerId
                temp += i

                if($(`#${temp}`).text()){
                    deletedCharsNumber++
                    $(`#${selectedChoiceIds[selectedChoiceIds.length-1]}`).css({"color": "white"})
                    selectedChoiceIds.pop()
                    selectedChoices.pop()
                }

                $(`#${temp}`).text("")
                        
            }

            for(let i=0; i<tempEnteredAnswer.length-deletedCharsNumber; i++){
                enteredAnswer += tempEnteredAnswer[i]
            }
        }
    })
})