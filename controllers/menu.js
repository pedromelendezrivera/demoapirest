function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}


window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
    }
});
