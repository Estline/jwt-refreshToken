import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();


  const clickLogin = async () => {

    const ckLogin = await fetch('/api/login').then((response) => response.json())


    console.log(ckLogin)

    localStorage.setItem('JWT', ckLogin.token)

    router.push('/user');
  }


  return (
    <div className="loginbox">
      <h1>Login</h1>
      {/* <input type="text" name="username" />
      <input type="password" name="password" /> */}
      <input onClick={clickLogin} type="button" value="login" />
    </div>
  )
}


export default Home