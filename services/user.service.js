import db from '@/lib/prisma'

export async function fetchUser(email) {
    return (db).user.findUnique({
        where: {
            email,
        },
    });
}

export async function createUser(data) {
    return db.user.create({
        data,
    });
}

export async function addItemToCart(data) {
    return db.cart.create({
        data,
    });
}

export async function fetchCartItems(id) {
    return db.cart.findMany({
        where: {
            userId: id,
        },
    });
}

export async function deleteCartItem(id) {
    return db.cart.delete({
        where: {
            id,
        },
    });
}

export async function fetchCartTotal(id) {
    return db.cart.aggregate({
        where: {
            userId: id,
        },
        sum: {
            price: true,
        },
    });
}

export async function updateCartItem(id,data) {
    return db.cart.update({
        where: {
            id,
        },
        data,
    });
}