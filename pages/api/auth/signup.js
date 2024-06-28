import { hashSync } from "bcrypt";
import { createUser, fetchUser } from "@/services/user.service";
import { withSessionRoute } from "@/lib/ironOptions";

export default withSessionRoute(SignUp);

async function SignUp(req, res) {

    const body = await req.body;

    try {

        const response = await createUser({
            username: body.name,
            email: body.email,
            password: hashSync(body.password, 10),
            role: body.role
        });
        const user = await fetchUser(body.email);
        req.session.user = user;
        await req.session.save();
        res.send({ status: 200, message: JSON.stringify(response) });

    }
    catch (err) {
        res.send({ status: 400, message: JSON.stringify(err) });
    }
}