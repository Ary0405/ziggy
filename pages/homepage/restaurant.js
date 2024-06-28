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
import { fetchCategories, fetchItems } from '@/services/resturant.service';
import Items from '@/components/Restaurant/Items/Items';

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

    const items = await fetchItems(user.id);

    items.forEach((item) => {
        const category = categories.find((category) => category.id === item.categoryId);
        item.category_name = category.name;
    });

    return {
        props: { user: user, categories: categories, items: items },
    };
}

function restaurant({ user, categories, items }) {

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
                        <p>Orders</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default restaurant