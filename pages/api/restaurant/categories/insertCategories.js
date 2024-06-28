import { withSessionRoute } from "@/lib/ironOptions";
import { insertCategories } from "@/services/resturant.service";

export default withSessionRoute(insertCategory);

async function insertCategory(req, res) {
    const body = await req.body;

    try {
        const response = await insertCategories({
            name: body.name,
            restaurantId: body.restaurantId,
            description: body.description,
        })

        res.send({ status: 200, message: JSON.stringify(response) });
    } catch (err) {
        res.send({
            status: 400, message: JSON.stringify(err)
        });
    }
}