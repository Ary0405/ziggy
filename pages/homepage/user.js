import { fetchAllItems, fetchRestaurantId, fetchRestaurants } from '@/services/resturant.service';
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
    Tab, Tabs,
    TabList,
    TabPanel,
    TabPanels,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import Orders from '@/components/User/Orders/Orders';
import { fetchOrders, fetchUser } from '@/services/user.service';

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
    const orders = await fetchOrders(user.id);
    const items = await fetchAllItems();

    orders.forEach((order) => {
        order.orderItems.forEach((item) => {
            item.item = items.find((i) => i.id === item.itemId);
        })
    })

    // adding restaurant name
    orders.forEach((order) => {
        order.restaurant = restaurants.find((restaurant) => restaurant.id === order.restaurantId);
    })

    return {
        props: { user: user, restaurants: JSON.parse(JSON.stringify(restaurants)) , orders: JSON.parse(JSON.stringify(orders))},
    };
}

function user({ user, restaurants , orders}) {
    const router = useRouter();
    return (
        <div>
            <div>
                <div style={{ "paddingTop": "1rem", "display": "flex", "justifyContent": "space-between", "paddingBottom": "0rem", "paddingLeft": "2rem", "paddingRight": "2rem" }} className="flex flex-col items-center justify-center">
                    <Text fontWeight={"500"} fontSize='4xl'>Welcome {user.username}</Text>
                    <Button onClick={() => handleLogOut()} marginTop={"10px"} colorScheme='red'>Logout</Button>
                    <Button onClick={() => router.push(`/cart/${user.id}`)}>View Cart</Button>
                </div>
                <Text fontSize={'2xl'} paddingLeft={"2rem"}>User Homepage</Text>
            </div>
            <Tabs marginTop={"1rem"} paddingLeft={"2rem"} paddingRight={"2rem"}>
                <TabList>
                    <Tab>Restaurants</Tab>
                    <Tab>Orders</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <TableContainer>
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
                                                <Button onClick={() => { router.push(`/restaurant/${restaurant.id}`) }}>Browse</Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel>
                        <Orders orders={orders} />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </div>
    )
}

export default user