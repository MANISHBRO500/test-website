document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get user ID and password entered in the form
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    // Send the login credentials to the backend
    const response = await fetch('https://your-backend-url.onrender.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password })
    });

    const data = await response.json();

    if (response.ok) {
        // If login is successful, store the JWT token in localStorage
        localStorage.setItem('token', data.token);

        // Decode the JWT token to get the user role (teacher or student)
        const decodedToken = jwt_decode(data.token);
        const userRole = decodedToken.role;  // 'teacher' or 'student'

        // Based on the role, display different content or redirect
        if (userRole === 'teacher') {
            alert('Teacher Logged in!');
            // Redirect to teacher-specific page or show teacher content
            window.location.href = '/teacher-dashboard.html';  // Example redirect
        } else if (userRole === 'student') {
            alert('Student Logged in!');
            // Redirect to student-specific page or show student content
            window.location.href = '/student-dashboard.html';  // Example redirect
        }
    } else {
        // If login fails, show error message in the 'errorMessage' div
        document.getElementById('errorMessage').innerText = "Invalid user ID or password.";
    }
});
