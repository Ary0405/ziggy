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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    FormLabel,
} from '@chakra-ui/react'
import { createItem, editItems, removeItems } from '@/operations/restuarant.fetch';

function Items({ user, categories, items }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [updatedCategoryId, setUpdatedCategoryId] = useState(0);
    const [price, setPrice] = useState(0);
    const [selectedItem, setSelectedItem] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [delId, setDelId] = useState(0);

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

    const handleUpdate = async () => {
        const data = {
            id: selectedItem.id,
            name: name === '' ? selectedItem.name : name,
            description: description === '' ? selectedItem.description : description,
            price: parseFloat(price) === 0 ? selectedItem.price : parseFloat(price),
            categoryId: parseInt(categoryId) === 0 ? selectedItem.categoryId : parseInt(categoryId),
            restaurantId: user.id,
            imageUrl: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
        }

        try {
            const res = await editItems(data);
            if (res.status === 200) {
                alert('Item Updated Successfully');
                window.location.reload();
            } else {
                alert('Error Updating Item');
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const handleDelete = async (id) => {
        const data = {
            id: id,
        }
        try {
            const res = await removeItems(data);
            if (res.status === 200) {
                alert('Item Deleted Successfully');
                window.location.reload();
            } else {
                console.log(res);
                alert('Error Deleting Item');
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent padding={"2rem 2rem 2rem 2rem"}>
                    <ModalHeader>Edit Item</ModalHeader>
                    <FormControl className='Signup__form'>
                        <FormLabel>Item Name</FormLabel>
                        <Input defaultValue={selectedItem.name} onChange={(e) => setName(e.target.value)} type='text' />
                    </FormControl>
                    <FormControl className='Signup__form'>
                        <FormLabel>Description</FormLabel>
                        <Input defaultValue={selectedItem.description} onChange={(e) => setDescription(e.target.value)} type='text' />
                    </FormControl>
                    <FormControl className='Signup__form'>
                        <FormLabel>Price</FormLabel>
                        <Input defaultValue={selectedItem.price} onChange={(e) => setPrice(e.target.value)} type='text' />
                    </FormControl>
                    <select onChange={(e) => setUpdatedCategoryId(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <Button marginTop={"1rem"} onClick={() => {
                        if (
                            (name === '' && description === '' && price === 0 && updatedCategoryId === 0) ||
                            (name === selectedItem.name && description === selectedItem.description && price === selectedItem.price && updatedCategoryId === selectedItem.categoryId) ||
                            (name === selectedItem.name && description === '' && price === selectedItem.price && updatedCategoryId === selectedItem.categoryId) ||
                            (name === '' && description === selectedItem.description && price === selectedItem.price && updatedCategoryId === selectedItem.categoryId) ||
                            (name === selectedItem.name && description === selectedItem.description && price === 0 && updatedCategoryId === selectedItem.categoryId) ||
                            (name === selectedItem.name && description === selectedItem.description && price === selectedItem.price && updatedCategoryId === 0) ||
                            (name === '' && description === '' && price === selectedItem.price && updatedCategoryId === selectedItem.categoryId) ||
                            (name === '' && description === '' && price === 0 && updatedCategoryId === selectedItem.categoryId) ||
                            (name === '' && description === '' && price === selectedItem.price && updatedCategoryId === 0) ||
                            (name === selectedItem.name && description === '' && price === 0 && updatedCategoryId === selectedItem.categoryId) ||
                            (name === selectedItem.name && description === '' && price === selectedItem.price && updatedCategoryId === 0) ||
                            (name === '' && description === selectedItem.description && price === 0 && updatedCategoryId === selectedItem.categoryId) ||
                            (name === '' && description === selectedItem.description && price === selectedItem.price && updatedCategoryId === 0)
                        ) {
                            alert("Please Modify Something");
                            return;
                        }
                        handleUpdate();
                    }}>Update Item</Button>
                </ModalContent>
            </Modal>
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
                                {items.map((item) => {
                                    if (item.status === 'UNAVAILABLE') {
                                        return;
                                    }
                                    return (
                                        <Tr key={item.id}>
                                            <Td>{item.name}</Td>
                                            <Td>{item.description}</Td>
                                            <Td>{item.price}</Td>
                                            <Td>{item.category_name}</Td>
                                            <Td>
                                                <Button marginRight={"1rem"} onClick={() => {
                                                    setIsOpen(true);
                                                    setSelectedItem(item);
                                                    setUpdatedCategoryId(item.categoryId);
                                                }}>Edit</Button>
                                                <Button onClick={() => {
                                                    handleDelete(item.id);
                                                }}>Delete</Button>
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}

export default Items