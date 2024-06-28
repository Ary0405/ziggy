import { withSessionRoute } from "@/lib/ironOptions";
import { updateCartItem } from "@/services/user.service";

export default withSessionRoute(editCart);

async function editCart(req, res) {
    const body = await req.body;
    try {
        const response = await updateCartItem(body);
        res.send({ status: 200, message: JSON.stringify(response) });
    }
    catch (err) {
        console.log(err)
        res.send({ status: 400, message: JSON.stringify(err) })
    }
}