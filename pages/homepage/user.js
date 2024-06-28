import { fetchRestaurants } from '@/services/resturant.service';
import React from 'react'
import {
    Button,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
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

    const restaurants = await fetchRestaurants();

    return {
        props: { user: user, restaurants: JSON.parse(JSON.stringify(restaurants)) },
    };
}

function user({ user, restaurants }) {
    const router = useRouter();
    return (
        <div>
            <div>
                <div style={{ "paddingTop": "1rem", "display": "flex", "justifyContent": "space-between", "paddingBottom": "0rem", "paddingLeft": "2rem", "paddingRight": "2rem" }} className="flex flex-col items-center justify-center">
                    <Text fontWeight={"500"} fontSize='4xl'>Welcome {user.username}</Text>
                    <Button onClick={() => handleLogOut()} marginTop={"10px"} colorScheme='red'>Logout</Button>
                    <Button>View Cart</Button>
                </div>
                <Text fontSize={'2xl'} paddingLeft={"2rem"}>User Homepage</Text>
            </div>
            <TableContainer padding={"0 2rem 0 2rem"} marginTop={"1rem"}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Restaurant Name</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {restaurants.map((restaurant) => (
                            <Tr key={restaurant.id}>
                                <Td>{restaurant.username}</Td>
                                <Td>
                                    <Button onClick={() => {router.push(`/restaurant/${restaurant.id}`)}}>Browse</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default user