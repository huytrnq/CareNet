document.addEventListener('DOMContentLoaded', function() {
    const showUploadFormButton = document.getElementById('show-upload-form');
    const uploadFormContainer = document.getElementById('upload-form-container');
    const form = document.getElementById('imaging-upload-form');
    const gallery = document.getElementById('imaging-details');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');
    const span = document.getElementsByClassName('close')[0];

    showUploadFormButton.addEventListener('click', () => {
        uploadFormContainer.style.display = 'block';
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const type = document.getElementById('imaging-type').value;
        const description = document.getElementById('imaging-description').value;
        const fileInput = document.getElementById('imaging-file');
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageSrc = e.target.result;
                const imageItem = document.createElement('p');
                imageItem.innerHTML = `${type}: <span class="image-description" data-image="${imageSrc}" data-type="${type}" data-description="${description}">${description}</span>`;
                gallery.appendChild(imageItem);
            };
            reader.readAsDataURL(file);
        }

        // Clear the form and hide the upload section
        form.reset();
        uploadFormContainer.style.display = 'none';
    });

    gallery.addEventListener('click', function(event) {
        if (event.target.classList.contains('image-description')) {
            const imageSrc = event.target.getAttribute('data-image');
            const type = event.target.getAttribute('data-type');
            const description = event.target.getAttribute('data-description');
            modal.style.display = 'block';
            modalImg.src = imageSrc;
            captionText.innerHTML = `<strong>Type:</strong> ${type}<br><strong>Description:</strong> ${description}`;
        }
    });

    span.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});
