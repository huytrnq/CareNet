
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}

window.onload = function() {
    const lastsurgElement = document.getElementById('last-surgery');
    lastsurgElement.innerText = formatDate(lastsurgElement.innerText);
};