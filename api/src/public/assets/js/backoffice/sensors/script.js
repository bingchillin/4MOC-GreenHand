$(document).ready(function () {
    $('#example').DataTable();
    $("#metismenu").metisMenu();
    $('#createSensorModal .select2').select2({ dropdownParent: $('#createSensorModal') });
    $('#updateSensorModal .select2').select2({ dropdownParent: $('#updateSensorModal') });

    const tooltips = document.querySelectorAll('.tt');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });

    setupInputField('#name');

    $('#updateSensorModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const sensorId = button.data('sensor-id');

        fetch(`/sensor/${sensorId}`)
            .then(response => response.json())
            .then(sensor => {
                $('#editName').val(sensor.name);
                $('#editHumidityLevel').val(sensor.humidityLevel);
                $('#editWaterLevel').val(sensor.waterLevel);
                $('#editRole').val(sensor.role);

                setupInputField('#editName');
                setupInputField('#editHumidityLevel');
                setupInputField('#editWaterLevel');
            })
            .catch(error => console.error('Error:', error));
    });
});

// ======================       CREATE        =============================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createSensorForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            humidityLevel: formData.get('humidityLevel'),
            waterLevel: formData.get('waterLevel'),
            motor: formData.get('motor'),
        };

        try {
            const response = await fetch('/sensor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                window.location.reload();
            } else {
                alert('Failed to create sensor.');
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred.');
        }
    });
});

// ======================       UPDATE        =============================
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

        const button = document.querySelector('#idButton');
        const userId = button.dataset.userId;

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

// ======================       DELETE        =============================
document.addEventListener('DOMContentLoaded', () => {
    let sensorIdToDelete = null;

    const deleteButtons = document.querySelectorAll('#idButtonDelete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            sensorIdToDelete = event.currentTarget.dataset.sensorId;
        });
    });

    const confirmDeleteButton = document.querySelector('#deleteButton');
    confirmDeleteButton.addEventListener('click', async () => {
        if (sensorIdToDelete) {
            try {
                const response = await fetch(`/sensor/${sensorIdToDelete}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    window.location.reload();
                } else {
                    alert('Failed to delete user.');
                    console.error('Error:', response);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred.');
            }
        }
    });
});