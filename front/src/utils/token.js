const getToken = () => {

    try {
      const value = JSON.parse(localStorage.getItem('persist:root'))
      const auth = JSON.parse(value.auth)
      
      return auth.user.token
    }
    catch(err) {
      return null
    }
  }
  
export default getToken