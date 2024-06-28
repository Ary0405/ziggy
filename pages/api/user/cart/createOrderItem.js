import { withSessionRoute } from "@/lib/ironOptions";
import { createOrderItem } from "@/services/user.service";

export default withSessionRoute(createOrderItemApi);

async function createOrderItemApi(req, res) {
    const body = await req.body;
    try {
        const response = await createOrderItem(body);
        res.send({ status: 200, message: JSON.stringify(response) });
    } catch (err) {
        console.log(err)
        res.send({ status: 400, message: JSON.stringify(err) });
    }
}