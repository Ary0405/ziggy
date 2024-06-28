import { withSessionRoute } from "@/lib/ironOptions";
import { deleteCartItem } from "@/services/user.service";

export default withSessionRoute(deleteCart);

async function deleteCart(req, res) {
    const body = await req.body;
    try {
        const response = deleteCartItem(body.id);
        res.send({ status: 200, message: JSON.stringify(response) });
    } catch (err) {
        console.log(err)
        res.send({ status: 400, message: JSON.stringify(err) });
    }
}