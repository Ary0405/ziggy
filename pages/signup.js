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
import { signupUser } from '@/operations/user.fetch';

function signup() {
    const [isRestaurant, setIsRestaurant] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignUp = async () => {
        if (name == "" || email == "" || password == "") {
            alert("Please fill in all the fields");
            return;
        }

        const data = {
            name: name,
            email: email,
            password: password,
            role: isRestaurant ? "STAFF" : "CUSTOMER"
        }

        try {
            const response = await signupUser(data);
            if (response.status === 200) {
                alert('Signed Up successfully');
                if (isRestaurant) {
                    router.push('/homepage/restaurant')
                } else {
                    router.push('/homepage/user');
                }
            } else {
                console.log(response);
                alert('Error signing up, Make sure you are connected to the internet or the mail is already in use, try logging in');
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className='Signup'>
            <h1 className='Signup__title'>Signup</h1>
            <Checkbox className='Signup__check' spacing={"0.5rem"} onChange={(e) => { setIsRestaurant(e.target.checked) }}>Are you a Restaurant ?</Checkbox>
            <FormControl className='Signup__form'>
                <FormLabel>Name</FormLabel>
                <Input onChange={(e) => { setName(e.target.value) }} type='text' />
            </FormControl>
            <FormControl className='Signup__form'>
                <FormLabel>Email address</FormLabel>
                <Input onChange={(e) => setEmail(e.target.value)} type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl className='Signup__form'>
                <FormLabel>Password</FormLabel>
                <Input onChange={(e) => { setPassword(e.target.value) }} type='password' />
            </FormControl>
            <Button onClick={() => handleSignUp()}>
                Signup
            </Button>
            <Text marginTop={"1rem"}>Have an account? <a style={{ "cursor": "pointer" }} href='/login'> Login </a></Text>
        </div>
    )
}

export default signup