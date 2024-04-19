let currentQuestion = 0;
let correctAnswer = 0;

const showQuestion = () => {
    if(questions[currentQuestion]) {
        let question = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = question.question;
        let optionshtml = '';
        for(let i in question.options) {
            optionshtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${question.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionshtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

const optionClickEvent = (e) => {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswer ++;
    } 

    currentQuestion ++;
    showQuestion();
}

const finishQuiz = () => {
    let points = Math.floor((correctAnswer / questions.length) * 100);

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Não foi bem';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `${points}% de Acerto`;
    document.querySelector('.scoreText2').innerHTML = `${questions.length} questões respondidas e você acertou ${correctAnswer}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';   
    document.querySelector('.progress--bar').style.width = '100%';
    document.querySelector('h1').innerHTML = '';
}

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resetEvent = () => {
    correctAnswer = 0;
    currentQuestion = 0;
    showQuestion();
});