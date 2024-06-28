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