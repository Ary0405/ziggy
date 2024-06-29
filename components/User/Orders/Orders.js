import React from 'react'
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
} from '@chakra-ui/react'

function Orders({ orders }) {
    return (
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
                                        <CardFooter>
                                            <Text marginRight={"1rem"}>Restaurant : {order.restaurant.username}</Text>
                                            <Text marginRight={"1rem"}>Order Status : {order.status}</Text>
                                            <Text>Total: {order.orderTotal}</Text>
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
                                        <CardFooter>
                                            <Text marginRight={"1rem"}>Restaurant : {order.restaurant.username}</Text>
                                            <Text marginRight={"1rem"}>Order Status : {order.status}</Text>
                                            <Text>Total: {order.orderTotal}</Text>
                                        </CardFooter>
                                    </Card>

                                )
                            })
                        }
                    </TabPanel>
                    <TabPanel>
                    {
                            orders.map((order) => {
                                if(order.status === "COMPLETED" || order.status === "DECLINED") {
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
                                        <CardFooter>
                                        <Text marginRight={"1rem"}>Restaurant : {order.restaurant.username}</Text>
                                            <Text marginRight={"1rem"}>Order Status : {order.status}</Text>
                                            <Text>Total: {order.orderTotal}</Text>
                                        </CardFooter>
                                    </Card>
                                    
                                )
                            })
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default Orders