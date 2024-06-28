import { withSessionRoute } from "@/lib/ironOptions";
import { insertItems } from "@/services/resturant.service";

export default withSessionRoute(insertItem);

async function insertItem(req,res) {
    const body = await req.body;

    try {
        const response = await insertItems(body);
        res.send({ status: 200, message: JSON.stringify(response) });
    } catch (err) {
        console.log(err)
        res.send({ status: 400, message: JSON.stringify(err) });
    }
}