import React, { useState } from 'react'
import {
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    FormControl,
    FormLabel,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Tfoot,
} from '@chakra-ui/react'
import { fetchCartItems } from '@/services/user.service';
import { fetchAllCategories, fetchAllItems } from '@/services/resturant.service';
import { createOrder, createOrderItem, deleteCartItem, updateCartItem } from '@/operations/user.fetch';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const user = context.req.session.user;
    const userId = context.params.id;

    if (user === null) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };
    }

    if (user.role === 'STAFF') {
        return {
            redirect: {
                permanent: false,
                destination: "/homepage/restaurant",
            },
        };
    }

    const categories = await fetchAllCategories();

    const items = await fetchAllItems()

    items.forEach((item) => {
        const category = categories.find((category) => category.id === item.categoryId);
        item.category_name = category.name;
    });

    const cartItems = await fetchCartItems(parseInt(userId));
    cartItems.forEach((item) => {
        const it = items.find((i) => i.id === item.itemId);
        item.item = it;
    })


    let cartTotal = 0;
    cartItems.forEach((item) => {
        cartTotal += item.item.price * item.quantity;
    })

    return {
        props: { user: user, cartItems: cartItems, cartTotal: cartTotal },
    };
}

function Cart({ user, cartItems, cartTotal }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
    const [tableNumber, setTableNumber] = useState(0);

    const [selectedItem, setSelectedItem] = useState({
        item: {},
        quantity: 0,
        price: 0,
    });
    const [quantity, setQuantity] = useState(selectedItem.quantity);

    const handleModify = async () => {
        const data = {
            id: selectedItem.id,
            itemId: selectedItem.item.id,
            quantity: parseInt(quantity),
            userId: user.id,
            restaurantId: selectedItem.item.restaurantId,
            price: parseInt(quantity) * selectedItem.item.price,
        }

        try {
            const response = await updateCartItem(data);
            if (response.status === 200) {
                alert('Item Updated Successfully');
                setIsOpen(false);
                window.location.reload();
            } else {
                alert('Error Updating Item');
            }
        } catch (err) {
            console.log(err.message);
        }

    }

    const handleDelete = async (id) => {
        const data = {
            id: id,
        }

        try {
            const response = await deleteCartItem(data);
            if (response.status === 200) {
                alert('Item Deleted Successfully');
                window.location.reload();
            } else {
                alert('Error Deleting Item');
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleCheckout = async () => {

        const restaurantId = cartItems[0].item.restaurantId;
        const orderData = {
            userId: user.id,
            restaurantId: restaurantId,
            tableNumber: parseInt(tableNumber),
            orderTotal: cartTotal,
        }

        try {
            const orderResponse = await createOrder(orderData);
            const ord = JSON.parse(orderResponse.message);
            const orderId = ord.id;
            cartItems.map(async (item) => {
                const data = {
                    orderId: orderId,
                    itemId: item.item.id,
                    quantity: item.quantity,
                    price: item.price,
                }
                console.log(data);
                try {
                    await createOrderItem(data);
                } catch (error) {
                    console.log(error);
                    return;
                }
            })
            cartItems.map(async (item) => {
                const data = {
                    id: item.id,
                }
                try {
                    await deleteCartItem(data);
                } catch (error) {
                    console.log(error);
                    return;
                }
            })
            alert('Order Placed Successfully');
            setIsCheckOutOpen(false);
            window.location.reload();
        } catch (err) {
            console.log(err.message);
            return;
        }
    }

    return (
        <>
            <Modal isOpen={isCheckOutOpen} onClose={() => setIsCheckOutOpen(false)}>
                <ModalOverlay />
                <ModalContent padding={"2rem 2rem 2rem 2rem"}>
                    <ModalHeader>Are you sure you want to checkout ?</ModalHeader>
                    <FormControl marginTop={"1rem"}>
                        <FormLabel>Add Table Number</FormLabel>
                        <Input onChange={(e) => setTableNumber(e.target.value)} type='number' placeholder='Table Number' />
                    </FormControl>
                    <Text margin={"1rem 0 1rem 0"}>
                        Total: {cartTotal}
                    </Text>
                    <Button onClick={() => handleCheckout()}>Checkout</Button>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent padding={"2rem 2rem 2rem 2rem"}>
                    <ModalHeader>Modify Quantity</ModalHeader>
                    <Text fontSize={"2xl"}>{selectedItem.item.name}</Text>
                    <Text fontSize={"1xl"}>{selectedItem.item.description}</Text>
                    <Text>{selectedItem.price}</Text>
                    <FormControl marginTop={"1rem"}>
                        <FormLabel>Select Quantity</FormLabel>
                        <Input defaultValue={selectedItem.quantity} onChange={(e) => setQuantity(e.target.value)} type='number' placeholder='Quantity' />
                    </FormControl>
                    <Button onClick={() => {
                        if (quantity === selectedItem.quantity) {
                            alert("Please Modify Something");
                        } else {
                            setSelectedItem({
                                ...selectedItem,
                                quantity: quantity,
                            });
                            handleModify();
                        }
                    }} margin={"1rem 0 1rem 0"}>Modify</Button>
                    <Button onClick={() => setIsOpen(false)}>Close</Button>
                </ModalContent>
            </Modal>
            <div>
                <div>
                    <div style={{ "paddingTop": "1rem", "display": "flex", "justifyContent": "space-between", "paddingBottom": "0rem", "paddingLeft": "2rem", "paddingRight": "2rem" }} className="flex flex-col items-center justify-center">
                        <Text fontWeight={"500"} fontSize='4xl'>Cart</Text>
                        <Button onClick={() => {
                            router.push('/homepage/user/')
                        }} marginTop={"10px"} colorScheme='red'>Homepage</Button>
                    </div>
                </div>
                <TableContainer padding={"0 2rem 0 2rem"} marginTop={"1rem"}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Item Name</Th>
                                <Th>Quantity</Th>
                                <Th>Price</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cartItems.map((item) => (
                                <Tr key={item.id}>
                                    <Td>{item.item.name}</Td>
                                    <Td>{item.quantity}</Td>
                                    <Td>{item.item.price}</Td>
                                    <Td>
                                        <Button onClick={() => {
                                            setSelectedItem(item);
                                            setIsOpen(true);
                                            setQuantity(item.quantity);
                                        }} marginRight={"1rem"}>Edit</Button>
                                        <Button onClick={() => {
                                            console.log(item);
                                            handleDelete(item.id);
                                        }}>Delete</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Total</Th>
                                <Th></Th>
                                <Th>{cartTotal}</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                    <Button onClick={() => {
                        setIsCheckOutOpen(true);
                    }} marginTop={"1rem"}>Proceed to Checkout</Button>
                </TableContainer>
            </div>
        </>
    )
}

export default Cart