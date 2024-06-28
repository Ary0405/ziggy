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
import { createCategory } from '@/operations/restuarant.fetch';

function Categories({ categories, user }) {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const handleClick = async () => {
        if (category === "") {
            alert("Please fill in the category name");
            return;
        }

        const data = {
            name: category,
            description: description,
            restaurantId: user.id
        }

        try {
            const res = await createCategory(data);
            if (res.status === 200) {
                alert('Category Added Successfully');
                window.location.reload();
            } else {
                alert('Error Adding Category');
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div>
            <div>
                <Text fontSize={"2xl"}>Add Category</Text>
                <FormControl className='Signup__form'>
                    <Input marginTop={"0.4rem"} placeholder='Enter Category Name' onChange={(e) => { setCategory(e.target.value) }} type='text' />
                </FormControl>
                <FormControl className='Signup__form'>
                    <Input marginTop={"0.4rem"} placeholder='Enter Description' onChange={(e) => { setDescription(e.target.value) }} type='text' />
                </FormControl>
                <Button onClick={() => handleClick()}>Add Category</Button>
            </div>
            <hr style={{ "marginTop": "1.5rem" }} />
            <div>
                <Text fontSize={"2xl"}>Categories</Text>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Category Name</Th>
                                <Th>Description</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {categories.map((category) => (
                                <Tr key={category.id}>
                                    <Td>{category.name}</Td>
                                    <td>{category.description === "" ? "Description Not Available" : category.description}</td>
                                    <Td>
                                        <Button marginRight={"1rem"}>Edit</Button>
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

export default Categories