export class UserController {
    static createUser = async (req, res) => {
        const { name } = req.body;
        res.send(name);
    }

}
