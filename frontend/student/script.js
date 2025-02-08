// Function to fetch questions from the backend
async function loadQuestions() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first');
        window.location.href = '/login'; // Redirect to login page
        return;
    }

    const response = await fetch('https://test-website-whz6.onrender.com/questions', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const questions = await response.json();
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = '';

    questions.forEach((question) => {
        let div = document.createElement('div');
        div.classList.add('question-item');
        let span = document.createElement('span');
        span.textContent = question.questionText;

        let answerInput = document.createElement('input');
        answerInput.type = 'text';
        answerInput.classList.add('answer');
        answerInput.setAttribute('data-question-id', question._id);
        
        div.appendChild(span);
        div.appendChild(answerInput);
        questionList.appendChild(div);
    });
}

// Function to submit answers
async function submitAnswers() {
    const answers = [];
    const questionInputs = document.querySelectorAll('.answer');
    
    questionInputs.forEach(input => {
        const answer = {
            questionId: input.getAttribute('data-question-id'),
            answerText: input.value,
        };
        answers.push(answer);
    });

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first');
        window.location.href = '/login';
        return;
    }

    const response = await fetch('https://test-website-whz6.onrender.com/answers/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ answers })
    });

    if (response.ok) {
        alert('Your answers have been submitted');
    } else {
        alert('Error submitting answers');
    }
}

// Call loadQuestions when the page loads
document.addEventListener('DOMContentLoaded', loadQuestions);

// Submit button listener
document.querySelector('.submit-btn').addEventListener('click', submitAnswers);
