import { addItemToCart } from "@/services/user.service";
import { withSessionRoute } from "@/lib/ironOptions";

export default withSessionRoute(addToCart);

async function addToCart(req,res) {
    const body = await req.body;
    try {
        const response = addItemToCart(body);
        res.send({ status: 200, message: JSON.stringify(response) });
    } catch (err) {
        console.log(err)
        res.send({ status: 400, message: JSON.stringify(err) });
    }
}