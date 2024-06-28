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
        _sum: {
            price: true,
        },
    });
}

export async function updateCartItem(data) {
    return db.cart.update({
        where: {
            id : data.id,
        },
        data,
    });
}

export async function createOrder(data) {
    return db.order.create({
        data,
    });
}

export async function createOrderItem(data) {
    return db.orderItem.create({
        data,
    });
}

export async function fetchOrders(id) {
    return db.order.findMany({
        where: {
            userId: id,
        },
        include : {
            orderItems : true,
        }
    });
}