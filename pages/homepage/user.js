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

    if (user.role === 'STAFF') {
        return {
            redirect: {
                permanent: false,
                destination: "/homepage/restaurant",
            },
        };
    }

    return {
        props: { user },
    };
}

function user() {
    return (
        <div>user</div>
    )
}

export default user