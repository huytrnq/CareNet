document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.getElementById('update-physical-exam');
    let isEditable = false;

    updateButton.addEventListener('click', () => {
        const statusCells = document.querySelectorAll('.physical-exam td:nth-child(2)');

        if (!isEditable) {
            statusCells.forEach(cell => {
                cell.contentEditable = 'true';
                cell.style.outline = '2px dashed #007BFF';
                cell.style.padding = '2px';
            });
            updateButton.textContent = 'Save';
            isEditable = true;
        } else {
            statusCells.forEach(cell => {
                cell.contentEditable = 'false';
                cell.style.outline = 'none';
                cell.style.padding = '0';
            });
            updateButton.textContent = 'Update';
            isEditable = false;

            // Save the updated content
            // Here you can add the logic to save the updated content, e.g., send it to a server
        }
    });
});
