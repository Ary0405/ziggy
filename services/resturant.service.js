import db from '@/lib/prisma'

export async function fetchCategories(id) {
    return (db).menuCategory.findMany({
        where: {
            restaurantId: id
        }
    });
}

export async function insertCategories(data) {
    return db.menuCategory.create({
        data
    });
}

export async function fetchItems(id) {
    return (db).menuItem.findMany({
        where: {
            restaurantId: id
        }
    });
}

export async function insertItems(data) {
    return db.menuItem.create({
        data
    });
}

export async function fetchRestaurants() {
    return (db).user.findMany({
        where: {
            role: 'STAFF'
        }
    })
}

export async function fetchRestaurant(id) {
    return (db).user.findUnique({
        where: {
            id
        }
    })
}

export async function fetchAllItems() {
    return (db).menuItem.findMany()
}

export async function fetchAllCategories() {
    return (db).menuCategory.findMany()
}

export async function fetchRestaurantId(id) {
    return (db).user.findUnique({
        where: {
            id
        }
    });
}

export async function fetchRestaurantOrders(id) {
    return (db).order.findMany({
        where: {
            restaurantId: id
        },
        include: {
            orderItems: true
        }
    });
}

export async function updateOrderStatus(data) {
    return db.order.update({
        where: {
            id: data.id,
        },
        data: {
            status: data.status
        }
    });
}

export async function updateCategory(data) {
    return db.menuCategory.update({
        where: {
            id: data.id,
        },
        data,
    });
}

export async function deleteCategory(data) {
    return db.menuCategory.update({
        where: {
            id: data.id,
        },
        data: {
            status: 'UNAVAILABLE'
        }
    });
}

export async function updateItem(data) {
    return db.menuItem.update({
        where: {
            id: data.id,
        },
        data,
    });
}

export async function deleteItem(data) {
    return db.menuItem.update({
        where: {
            id: data.id,
        },
        data: {
            status: 'UNAVAILABLE'
        }
    });
}

export async function fetchCategoryItem(data) {
    return db.menuItem.findMany({
        where: {
            categoryId: data.id
        }
    });
}