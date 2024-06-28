import React from 'react'

export async function getServerSideProps(context) {
    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/signup",
            },
        };
    }

    const user = context.req.session.user;

    if (user.role === 'CUSTOMER') {
        return {
            redirect: {
                permanent: false,
                destination: "/homepage/user",
            },
        };
    }

    return {
        props: { user },
    };
}

function restaurant({user}) {
    return (
        <div>restaurant</div>
    )
}

export default restaurant