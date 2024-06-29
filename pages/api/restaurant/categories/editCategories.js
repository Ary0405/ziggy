import { updateCategory } from "@/services/resturant.service";
import { withSessionRoute } from "@/lib/ironOptions";

export default withSessionRoute(updateCategoryApi);

async function updateCategoryApi(req, res) {
    const body = await req.body;

    try {
        const response = await updateCategory(body);
        res.send({ status: 200, message: JSON.stringify(response) });
    } catch (err) {
        console.log(err)
        res.send({ status: 400, message: JSON.stringify(err) });
    }
}