import React, { useState } from 'react'
import { Button, Checkbox } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { loginUser } from '@/operations/user.fetch';

function login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        if (email == "" || password == "") {
            alert("Please fill in all the fields");
            return;
        }

        const data = {
            email: email,
            password: password,
        }

        try {
            const response = await loginUser(data);
            if (response.status === 200) {
                alert('Logged in successfully');
                // pushing it to user cause it would redirect even if it is restaurant
                router.push('/homepage/user')

            } else {
                console.log(response);
                alert('Error logging in, Make sure you are connected to the internet or the credentials are wrong');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='Signup'>
            <h1 className='Signup__title'>Login</h1>
            <FormControl className='Signup__form'>
                <FormLabel>Email address</FormLabel>
                <Input onChange={(e) => setEmail(e.target.value)} type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl className='Signup__form'>
                <FormLabel>Password</FormLabel>
                <Input onChange={(e) => { setPassword(e.target.value) }} type='password' />
            </FormControl>
            <Button onClick={() => handleLogin()}>
                Login
            </Button>
            <Text marginTop={"1rem"}>Dont have an account? <a style={{ "cursor": "pointer" }} href='/signup'> Signup </a></Text>
        </div>
    )
}

export default login