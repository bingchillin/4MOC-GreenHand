$(document).ready(function () {
    $('#example').DataTable();
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createUserForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role'),
        };

        try {
            const response = await fetch('/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                window.location.reload();  // Reload the page
            } else {
                alert('Failed to create user.');
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred.');
        }
    });
});