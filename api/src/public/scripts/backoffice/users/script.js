$(document).ready(function () {
    $('#example').DataTable();
    $('.select2').select2({
        dropdownParent: $('#createUserModal')
    });
    const tooltips = document.querySelectorAll('.tt');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });

    setupInputField('#name');
    setupInputField('#email');
    setupInputField('#password');

    $('#updateUserModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const userId = button.data('user-id');

        fetch(`/user/${userId}`)
            .then(response => response.json())
            .then(user => {
                $('#editId').val(user.id);
                $('#editName').val(user.name);
                $('#editEmail').val(user.email);
                $('#editPassword').val('');
                $('#editPassword').attr('placeholder', 'Leave empty to keep the current password');
                $('#editRole').val(user.role);
            })
            .catch(error => console.error('Error:', error));
    });
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

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('updateUserForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role'),
        };

        const button = document.querySelector('#idButton');  // Replace with the correct selector
        const userId = button.dataset.userId;  // Replace 'userId' with the correct data attribute name

        try {
            const response = await fetch(`/user/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                window.location.reload();
            } else {
                alert('Failed to update user.');
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred.');
        }
    });
});