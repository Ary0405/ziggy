import { Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
    FormControl,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { createItem } from '@/operations/restuarant.fetch';

function Items({ user, categories, items }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [price, setPrice] = useState(0);

    const handleClick = async () => {
        if (name === "" || description === "" || categoryId === 0 || price === 0) {
            alert("Please fill in all the fields");
            return;
        }

        const data = {
            name: name,
            description: description,
            price: parseFloat(price),
            categoryId: parseInt(categoryId),
            restaurantId: user.id,
            imageUrl: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
        }

        try {
            const res = await createItem(data);
            if (res.status === 200) {
                alert('Item Added Successfully');
                window.location.reload();
            } else {
                alert('Error Adding Item');
            }
        } 
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <div>
                <Text fontSize={"2xl"}>Add Item</Text>
                <FormControl className='Signup__form'>
                    <Input marginTop={"0.4rem"} placeholder='Enter Item Name' onChange={(e) => { setName(e.target.value) }} type='text' />
                </FormControl>
                <FormControl className='Signup__form'>
                    <Input marginTop={"0.4rem"} placeholder='Enter Description' onChange={(e) => { setDescription(e.target.value) }} type='text' />
                </FormControl>
                <FormControl className='Signup__form'>
                    <Input marginTop={"0.4rem"} placeholder='Enter Price' onChange={(e) => { setPrice(e.target.value) }} type='text' />
                </FormControl>
                <select onChange={(e) => { setCategoryId(e.target.value) }}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <Button onClick={() => handleClick()}>Add Item</Button>
            </div>
            <hr style={{ "marginTop": "1.5rem" }} />
            <div>
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
                                        <Button>Edit</Button>
                                        <Button>Delete</Button>
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

export default Items