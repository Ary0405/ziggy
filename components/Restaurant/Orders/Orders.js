import React, { useState } from 'react'
import {
    Button,
    Tab, Tabs,
    TabList,
    TabPanel,
    TabPanels,
    Text,
    Card, CardHeader, CardBody, CardFooter,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Select,
} from '@chakra-ui/react'
import { updateStatusOrder } from '@/operations/restuarant.fetch';

function Orders({ orders }) {

    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState("PENDING");
    const [selectedOrderId, setSelectedOrderId] = useState(0);

    const handleUpdate = async (id) => {
        if (status === "PENDING") {
            alert('Please update status');
            return;
        }
        const data = {
            status: status,
            id: id,
        }

        try {
            const response = await updateStatusOrder(data);
            if (response.status === 200) {
                alert('Order status updated');
                setIsOpen(false);
                window.location.reload();
            }
            else {
                alert('Error updating order status');
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
                    <ModalHeader>Update Order Status</ModalHeader>
                    <Select onChange={(e) => setStatus(e.target.value)} placeholder='Select option'>
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="DECLINED">Declined</option>
                    </Select>
                    <Button marginTop={"2rem"} onClick={() => handleUpdate(selectedOrderId)}>Update</Button>
                </ModalContent>
            </Modal>
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Ongoing Orders</Tab>
                        <Tab>Completed Orders</Tab>
                        <Tab>Declined Orders</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {
                                orders.map((order) => {
                                    if (order.status === "COMPLETED" || order.status === "DECLINED") {
                                        return null;
                                    }
                                    return (
                                        <Card key={order.id}>
                                            <CardHeader>
                                                <Text>Order ID: {order.id}</Text>
                                            </CardHeader>
                                            <CardBody>
                                                {
                                                    order.orderItems.map((orderItem) => {
                                                        return (
                                                            <TableContainer key={orderItem.id}>
                                                                <Table variant="simple">
                                                                    <Thead>
                                                                        <Tr>
                                                                            <Th>Item Name</Th>
                                                                            <Th>Price</Th>
                                                                            <Th>Quantity</Th>
                                                                        </Tr>
                                                                    </Thead>
                                                                    <Tbody>
                                                                        <Tr>
                                                                            <Td>{orderItem.item.name}</Td>
                                                                            <Td>{orderItem.item.price}</Td>
                                                                            <Td>{orderItem.quantity}</Td>
                                                                        </Tr>
                                                                    </Tbody>
                                                                </Table>
                                                            </TableContainer>
                                                        )
                                                    })
                                                }
                                            </CardBody>
                                            <CardFooter display={"flex"} alignItems={"center"} >
                                                <Text marginRight={"1rem"}>Order Status : {order.status}</Text>
                                                <Text marginRight={"1rem"}>Total: {order.orderTotal}</Text>
                                                <Text>Table Number: {order.tableNumber}</Text>
                                                <Button onClick={() => {
                                                    setIsOpen(true);
                                                    setSelectedOrderId(order.id);
                                                }} marginLeft={"1rem"}>Update Status</Button>
                                            </CardFooter>
                                        </Card>

                                    )
                                })
                            }
                        </TabPanel>
                        <TabPanel>
                            {
                                orders.map((order) => {
                                    if (order.status === "DECLINED" || order.status === "PENDING") {
                                        return null;
                                    }
                                    return (
                                        <Card key={order.id}>
                                            <CardHeader>
                                                <Text>Order ID: {order.id}</Text>
                                            </CardHeader>
                                            <CardBody>
                                                {
                                                    order.orderItems.map((orderItem) => {
                                                        return (
                                                            <TableContainer key={orderItem.id}>
                                                                <Table variant="simple">
                                                                    <Thead>
                                                                        <Tr>
                                                                            <Th>Item Name</Th>
                                                                            <Th>Price</Th>
                                                                            <Th>Quantity</Th>
                                                                        </Tr>
                                                                    </Thead>
                                                                    <Tbody>
                                                                        <Tr>
                                                                            <Td>{orderItem.item.name}</Td>
                                                                            <Td>{orderItem.item.price}</Td>
                                                                            <Td>{orderItem.quantity}</Td>
                                                                        </Tr>
                                                                    </Tbody>
                                                                </Table>
                                                            </TableContainer>
                                                        )
                                                    })
                                                }
                                            </CardBody>
                                            <CardFooter display={"flex"} alignItems={"center"} >
                                                <Text marginRight={"1rem"}>Order Status : {order.status}</Text>
                                                <Text marginRight={"1rem"}>Total: {order.orderTotal}</Text>
                                                <Text>Table Number: {order.tableNumber}</Text>
                                            </CardFooter>
                                        </Card>

                                    )
                                })
                            }
                        </TabPanel>
                        <TabPanel>
                            {
                                orders.map((order) => {
                                    if (order.status === "COMPLETED" || order.status === "PENDING") {
                                        return null;
                                    }
                                    return (
                                        <Card key={order.id}>
                                            <CardHeader>
                                                <Text>Order ID: {order.id}</Text>
                                            </CardHeader>
                                            <CardBody>
                                                {
                                                    order.orderItems.map((orderItem) => {
                                                        return (
                                                            <TableContainer key={orderItem.id}>
                                                                <Table variant="simple">
                                                                    <Thead>
                                                                        <Tr>
                                                                            <Th>Item Name</Th>
                                                                            <Th>Price</Th>
                                                                            <Th>Quantity</Th>
                                                                        </Tr>
                                                                    </Thead>
                                                                    <Tbody>
                                                                        <Tr>
                                                                            <Td>{orderItem.item.name}</Td>
                                                                            <Td>{orderItem.item.price}</Td>
                                                                            <Td>{orderItem.quantity}</Td>
                                                                        </Tr>
                                                                    </Tbody>
                                                                </Table>
                                                            </TableContainer>
                                                        )
                                                    })
                                                }
                                            </CardBody>
                                            <CardFooter display={"flex"} alignItems={"center"} >
                                                <Text marginRight={"1rem"}>Order Status : {order.status}</Text>
                                                <Text marginRight={"1rem"}>Total: {order.orderTotal}</Text>
                                                <Text>Table Number: {order.tableNumber}</Text>
                                            </CardFooter>
                                        </Card>

                                    )
                                })
                            }
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </>
    )
}

export default Orders