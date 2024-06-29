import { Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
} from '@chakra-ui/react'
import { createCategory, editCategories } from '@/operations/restuarant.fetch';

function Categories({ categories, user }) {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCat, setSelectedCat] = useState(0);
    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const [selectedCatId, setSelectedCatId] = useState(0);

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

    const handleUpdate = async () => {
        const data = {
            id: selectedCatId,
            name: categoryName === '' ? selectedCat.name : categoryName,
            description: categoryDesc === '' ? selectedCat.description : categoryDesc,
        }

        try {
            const response = await editCategories(data);
            if (response.status === 200) {
                alert('Category Updated Successfully');
                setIsOpen(false);
                window.location.reload();
            } else {
                alert('Error Updating Category');
            }
        } catch (err) {
            console.log(err.message);
        }
        return;
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent padding={"2rem 2rem 2rem 2rem"}>
                    <ModalHeader>Edit Category</ModalHeader>
                    <FormControl marginTop={"1rem"}>
                        <FormLabel>Category Name</FormLabel>
                        <Input defaultValue={selectedCat.name} onChange={(e) => setCategoryName(e.target.value)} type='text' placeholder='Category Name' />
                    </FormControl>
                    <FormControl marginTop={"1rem"}>
                        <FormLabel>Category Description</FormLabel>
                        <Input defaultValue={selectedCat.description} onChange={(e) => setCategoryDesc(e.target.value)} type='text' placeholder='Category Name' />
                    </FormControl>
                    <Button marginTop={"1rem"} onClick={() => {
                        if (
                            (categoryName === '' && categoryDesc === '') ||
                            (categoryName === selectedCat.name && categoryDesc === selectedCat.description) ||
                            (categoryName === selectedCat.name && categoryDesc === '') ||
                            (categoryName === '' && categoryDesc === selectedCat.description)
                        ) {
                            alert("Please Modify Something");
                            return;
                        }
                        handleUpdate();
                    }}>Update Category</Button>
                </ModalContent>
            </Modal>
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
                                {categories.map((category) => {
                                    if (category.status === "UNAVAILABLE") {
                                        return;
                                    }
                                    return (
                                        <Tr key={category.id}>
                                            <Td>{category.name}</Td>
                                            <td>{category.description === "" ? "Description Not Available" : category.description}</td>
                                            <Td>
                                                <Button marginRight={"1rem"} onClick={() => {
                                                    setIsOpen(true);
                                                    setSelectedCat(category);
                                                    setSelectedCatId(category.id);
                                                }}>Edit</Button>
                                                <Button>Delete</Button>
                                            </Td>
                                        </Tr>
                                    )
                                }
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>

    )
}

export default Categories