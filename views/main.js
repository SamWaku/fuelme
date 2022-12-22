axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  function getProfile() {
    axios({
        method: 'get',
        url: 'http://localhost:3000/api/user/customer/',
    })
    .then(res => ShowProfile(res))
    .catch(err => console.error(err))
}

