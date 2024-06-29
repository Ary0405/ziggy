import { deleteCategory } from "@/services/resturant.service";
import { withSessionRoute } from "@/lib/ironOptions";

export default withSessionRoute(deleteCategoryApi);

async function deleteCategoryApi(req, res) {
    const body = await req.body;

    try {
        const response = await deleteCategory(body);
        res.send({ status: 200, message: JSON.stringify(response) });
    } catch (err) {
        console.log(err)
        res.send({ status: 400, message: JSON.stringify(err) });
    }
}