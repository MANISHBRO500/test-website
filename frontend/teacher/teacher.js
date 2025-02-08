// Function to publish a new question
async function publishQuestion() {
    const questionText = document.getElementById('questionInput').value.trim();
    const questionType = document.querySelector('input[name="questionType"]:checked')?.value;
    const options = document.querySelector('#options').value.split(','); // Only for MCQ

    if (!questionText || !questionType) {
        alert("Please fill in the question and select a type!");
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first');
        window.location.href = '/login'; // Redirect to login page
        return;
    }

    const response = await fetch('http://localhost:5000/questions/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ questionText, type: questionType, options })
    });

    if (response.ok) {
        alert('Question published');
        loadQuestions(); // Reload questions after publishing
    } else {
        alert('Error publishing question');
    }

    document.getElementById('questionInput').value = ''; // Clear input
}

// Function to load all published questions
async function loadQuestions() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first');
        window.location.href = '/login'; // Redirect to login page
        return;
    }

    const response = await fetch('http://localhost:5000/questions', {
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

        div.appendChild(span);
        questionList.appendChild(div);
    });
}

// Call loadQuestions when the page loads
document.addEventListener('DOMContentLoaded', loadQuestions);

// Publish button listener
document.querySelector('button').addEventListener('click', publishQuestion);
