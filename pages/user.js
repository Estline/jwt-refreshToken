import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const User = () => {
    const router = useRouter();

    const [timeLast, settimeLast] = useState()
    const [UserLogin, setUserLogin] = useState()
    const [jwt, setjwt] = useState()

    const clickLogout = () => {
        router.push('/');
    }

    const clickCkLogin = async () => { //ทำหน้าที่เหมิือน provider คอยเช็กสภานะ login ค้าง
        const token = localStorage.getItem('JWT') //ดึงค่าจาก localStorage ไว้เตรียมยิง Bearer token
        setjwt(token) //ทำไว้เพิื่อแสดงหน้าบ้านเฉยๆ

        const ckLogin = await fetch('/api/ckLogin', { //ยิงไป check ทุกครั้งที่มีการเรียกใช้ หรือ refresh
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => response.json())

        if (ckLogin.message == "Invalid token") { // check หมดเวลา หรือ token ไม่ถูกต้อง
            settimeLast(-1)
            // router.push('/');
            return setUserLogin("หมดเวลา")
        }

        if (ckLogin.refreshToken) { // check ว่ามี refreshToken เข้ามาใหม่หรือไม่ ถ้ามี ให้นำค่ามาเก็บไว้ แล้วเรียกใช้ provider อีกที
            localStorage.setItem('JWT', ckLogin.refreshToken)
            return clickCkLogin() // เรียกใช้ provider เพื่อข้ามขั้นตอนนี้ในการเช็คครั้งถัดไป เพราะว่า refreshToken จะไม่เข้าเงืื่อนไขแล้ว
        }

        const { userId, end } = ckLogin

        setUserLogin(userId)
        settimeLast(end)

    }

    useEffect(() => {
        clickCkLogin()
    }, [])

    return (
        <div>
            <h1>UserID: {UserLogin}</h1>
            <h2>เวลาที่เหลือ {timeLast}</h2>
            <h2>{jwt}</h2>
            <input onClick={clickCkLogin} type="button" value="CkLogin" />
            <input onClick={clickLogout} type="button" value="Logout" />
        </div>
    )
}

export default User