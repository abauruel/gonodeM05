const { User } = require("../models");

const Mail = require("../services/Mailservice");
class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    await Mail.send({
      from: "Alex Claude <abauruel@gmail.com>",
      to: `${user.name} <${user.email}>`,
      subject: "Novo acesso a sua conta",
      text: "Registramos um novo acesso em sua conta"
    });

    return res.json({
      token: await user.generateToken()
    });
  }
}

module.exports = new SessionController();
