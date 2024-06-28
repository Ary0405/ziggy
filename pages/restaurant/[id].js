import React from 'react'
import { fetchCategories, fetchItems, fetchRestaurant } from '@/services/resturant.service';
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
export async function getServerSideProps(context) {
    const user = context.req.session.user;
    const restaurantId = context.params.id;

    if (user === null) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };
    }

    const categories = await fetchCategories(parseInt(restaurantId));

    const items = await fetchItems(parseInt(restaurantId));

    items.forEach((item) => {
        const category = categories.find((category) => category.id === item.categoryId);
        item.category_name = category.name;
    });

    const restaurant = await fetchRestaurant(parseInt(restaurantId));

    return {
        props: { user: user, items: items, restaurant: JSON.parse(JSON.stringify(restaurant)) },
    };
}

function RestaurantBrowse({ user, items, restaurant }) {
    return (
        <div>
            <div>
                <div style={{ "paddingTop": "1rem", "display": "flex", "justifyContent": "space-between", "paddingBottom": "0rem", "paddingLeft": "2rem", "paddingRight": "2rem" }} className="flex flex-col items-center justify-center">
                    <Text fontWeight={"500"} fontSize='4xl'>Welcome to {restaurant.username}</Text>
                    <Button>View Cart</Button>
                </div>
            </div>
            <div style={{"margin": "1rem 2rem 0 2rem"}}>
                <Text fontSize={"2xl"}>Items</Text>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Item Name</Th>
                                <Th>Description</Th>
                                <Th>Price</Th>
                                <Th>Category</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {items.map((item) => (
                                <Tr key={item.id}>
                                    <Td>{item.name}</Td>
                                    <Td>{item.description}</Td>
                                    <Td>{item.price}</Td>
                                    <Td>{item.category_name}</Td>
                                    <Td>
                                        <Button>Add to Cart</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default RestaurantBrowse