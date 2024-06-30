import './HeroComponent.scss'
import React from 'react'
import Link from 'next/link';
import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function HeroComponent() {
    const router = useRouter();
    return (
        <div className='HeroComponent' >
            <h1 className='HeroComponent__title'>
                Ziggy
            </h1>
            <p className='HeroComponent__subtitle'>
                Restaurant Booking Made Simple
            </p>
            <div className='HeroComponent__auth'>
                <Button onClick={() => router.push('/login')} className='HeroComponent__auth--login'>
                    Login
                </Button>
                <Button onClick={() => router.push('/signup')} className='HeroComponent__auth--signup'>
                    Register
                </Button>
            </div>
        </div>
    )
}

export default HeroComponent