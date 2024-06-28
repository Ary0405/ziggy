import './HeroComponent.scss'
import React from 'react'
import Link from 'next/link';
import { Button, Text } from '@chakra-ui/react';

function HeroComponent() {
    return (
        <div className='HeroComponent' >
            <h1 className='HeroComponent__title'>
                Ziggy
            </h1>
            <p className='HeroComponent__subtitle'>
                Restaurant Booking Made Simple
            </p>
            <div className='HeroComponent__auth'>
                <Button className='HeroComponent__auth--login'>
                    Login
                </Button>
                <Button className='HeroComponent__auth--signup'>
                    Register
                </Button>
            </div>
        </div>
    )
}

export default HeroComponent