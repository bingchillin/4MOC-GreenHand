function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

function setupInputField(id) {
    $(id).on('input', function () {
        var input = $(this);
        var is_filled = input.val();
        if (is_filled) {
            input.removeClass("border-danger").addClass("border-success");
        }
        else {
            input.removeClass("border-success").addClass("border-danger");
        }
    });
}