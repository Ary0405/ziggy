import React, { useState } from 'react'
import { fetchCategories, fetchItems, fetchRestaurant } from '@/services/resturant.service';
import {
    Button,
    Text,
    Card, CardHeader, CardBody, CardFooter,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { addToCartItem } from '@/operations/user.fetch';
import { useRouter } from 'next/router';

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

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [quantity, setQuantity] = useState(0);
    const router = useRouter();

    const handleAddToCart = async () => {
        if (quantity === 0) {
            alert('Please select a quantity');
            return;
        }

        const data = {
            itemId: selectedItem.id,
            quantity: parseInt(quantity),
            userId: user.id,
            restaurantId: restaurant.id,
            price: parseInt(quantity) * selectedItem.price,
        }

        try {
            const res = await addToCartItem(data);
            if (res.status === 200) {
                alert('Item Added to Cart Successfully');
                setIsOpen(false);
            } else {
                alert('Error Adding Item to Cart');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent padding={"2rem 2rem 2rem 2rem"}>
                    <ModalHeader>Add Item to Cart</ModalHeader>
                    <Text fontSize={"2xl"}>{selectedItem.name}</Text>
                    <Text fontSize={"1xl"}>{selectedItem.description}</Text>
                    <Text>{selectedItem.price}</Text>
                    <FormControl marginTop={"1rem"}>
                        <FormLabel>Select Quantity</FormLabel>
                        <Input onChange={(e) => setQuantity(e.target.value)} type='number' placeholder='Quantity' />
                    </FormControl>
                    <Button onClick={() => handleAddToCart()} margin={"1rem 0 1rem 0"}>Add to Cart</Button>
                    <Button onClick={() => setIsOpen(false)}>Close</Button>
                </ModalContent>
            </Modal>
            <div>
                <div>
                    <div style={{ "paddingTop": "1rem", "display": "flex", "justifyContent": "space-between", "paddingBottom": "0rem", "paddingLeft": "2rem", "paddingRight": "2rem" }} className="flex flex-col items-center justify-center">
                        <Text fontWeight={"500"} fontSize='4xl'>Welcome to {restaurant.username}</Text>
                        <Button onClick={() => router.push(`/cart/${user.id}`)}>View Cart</Button>
                    </div>
                </div>
                <div style={{ "margin": "1rem 2rem 0 2rem" }}>
                    <Text fontSize={"2xl"}>Items</Text>
                    <div style={{ "display": "flex", "flexWrap": "wrap", "justifyContent": "space-between" }}>
                        {items.map((item) => (
                            <Card key={item.id} width={"30%"} margin={"1rem 0 1rem 0"}>
                                <CardHeader>
                                    <img src={item.imageUrl} width={"100%"} />
                                </CardHeader>
                                <CardBody>
                                    <Text fontSize={"2xl"}>{item.name}</Text>
                                    <Text>{item.description}</Text>
                                    <Text>{item.price}</Text>
                                </CardBody>
                                <CardFooter>
                                    <Button onClick={() => { setSelectedItem(item); setIsOpen(true); }}>Add to Cart</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantBrowse