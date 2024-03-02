module.exports = function(req, res, next) {
    const { first_name, middle_name, last_name, phone_number, email, password } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validPhone(userPhone) {
        // Simplified phone number validation, adjust regex as needed for your requirements
        return /^\+?\d{10,15}$/.test(userPhone);
    }

    if (req.path === "/signup") {
        // Check for the presence of first_name, last_name, password, and either email or phone_number
        if (![first_name, last_name, password].every(Boolean) || !(email || phone_number)) {
            return res.status(401).json("Missing Credentials");
        } else if (email && !validEmail(email)) {
            return res.status(401).json("Invalid Email");
        } else if (phone_number && !validPhone(phone_number)) {
            return res.status(401).json("Invalid Phone Number");
        }
    }
    

    next();
};
