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