import React from 'react'
import {
    Button,
    Tab, Tabs,
    TabList,
    TabPanel,
    TabPanels,
    Text,
} from '@chakra-ui/react'
import Categories from '@/components/Restaurant/Categories/Categories';
import { fetchCategories, fetchItems, fetchRestaurantId, fetchRestaurantOrders } from '@/services/resturant.service';
import Items from '@/components/Restaurant/Items/Items';
import Orders from '@/components/Restaurant/Orders/Orders';

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

    if (user.role === 'CUSTOMER') {
        return {
            redirect: {
                permanent: false,
                destination: "/homepage/user",
            },
        };
    }

    const categories = await fetchCategories(user.id);

    // removing UNAVAILABLE CATEGORIES
    categories.forEach((category) => {
        if (category.status === 'UNAVAILABLE') {
            const index = categories.indexOf(category);
            categories.splice(index, 1);
        }
    })

    const items = await fetchItems(user.id);

    items.forEach((item) => {
        const category = categories.find((category) => category.id === item.categoryId);
        item.category_name = category.name;
    });

    const orders = await fetchRestaurantOrders(user.id);

    orders.forEach((order) => {
        order.orderItems.forEach((item) => {
            item.item = items.find((i) => i.id === item.itemId);
        })
    })

    return {
        props: { user: user, categories: categories, items: items, orders: JSON.parse(JSON.stringify(orders)) },
    };
}

function restaurant({ user, categories, items, orders }) {

    const handleLogOut = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        if (response.status === 200) {
            window.location.href = "/login";
        }
    }

    return (
        <div>
            <div>
                <div style={{ "paddingTop": "1rem", "display": "flex", "justifyContent": "space-between", "paddingBottom": "0rem", "paddingLeft": "2rem", "paddingRight": "2rem" }} className="flex flex-col items-center justify-center">
                    <Text fontWeight={"500"} fontSize='4xl'>Welcome {user.username}</Text>
                    <Button onClick={() => handleLogOut()} marginTop={"10px"} colorScheme='red'>Logout</Button>
                </div>
                <Text fontSize={'2xl'} paddingLeft={"2rem"}>Staff Homepage</Text>
            </div>
            <Tabs paddingLeft={"2rem"} paddingRight={"2rem"}>
                <TabList>
                    <Tab>Categories</Tab>
                    <Tab>Items</Tab>
                    <Tab>Orders</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Categories categories={categories} user={user} />
                    </TabPanel>
                    <TabPanel>
                        <Items categories={categories} user={user} items={items} />
                    </TabPanel>
                    <TabPanel>
                        <Orders orders={orders} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default restaurant