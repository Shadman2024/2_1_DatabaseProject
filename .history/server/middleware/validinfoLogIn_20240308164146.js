module.exports = function (req, res, next) {
    const { identity, password } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validPhone(userPhone) {
        // Simplified phone number validation, adjust regex as needed for your requirements
        return /^\+?\d{10,15}$/.test(userPhone);
    }

    if (req.path === "/login") {
        // Determine if identity is a valid email or a valid phone number
        const isIdentityValid = validEmail(identity) || validPhone(identity);

        if (!isIdentityValid || !password) {
            return res.status(401).json("Missing or Invalid Credentials");
        }
    }

    next();
};
