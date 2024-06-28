import { withSessionRoute } from "@/lib/ironOptions";
import { createOrder } from "@/services/user.service";

export default withSessionRoute(createOrderApi);

async function createOrderApi(req, res) {
    const body = await req.body;
    try {
        const response = await createOrder(body);
        res.send({ status: 200, message: JSON.stringify(response) });
        console.log("here");
    } catch (err) {
        console.log(err)
        res.send({ status: 400, message: JSON.stringify(err) });
    }
}