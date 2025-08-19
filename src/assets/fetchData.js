export async function quizAPICall() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');

        const data = await response.json();
        const filteredData = data.map((quizObj) => {
            type, question, incorrect_answers, correct_answer, category;
        });
        console.log(filteredData);
        return filteredData;
    } catch (error) {
        console.error('ERROR', error);
        return null;
    }
}

//quizData

// category: 'Celebrities';
// correct_answer: 'Gordon Ramsay';
// difficulty: 'medium';
// incorrect_answers: (3)[
//     ('Jamie Oliver', 'Ainsley Harriott', 'Antony Worrall Thompson')
// ];
// question: 'Which TV chef wrote an autobiography titled &quot;Humble Pie&quot;?';
// type: 'multiple';
