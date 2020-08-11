export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjJlZTU1YjEwZjI4OTE4NmM3MzlmNTIiLCJpYXQiOjE1OTcwODAxNjAsImV4cCI6MTU5NzA4Mzc2MH0.J2fDWfx0I1zNq9d7RgCmUmq2J8qma92tWRhY6mNGwYg' };
    }
}