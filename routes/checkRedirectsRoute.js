const express = require("express");
const router = express.Router();
const checkRedirects = require("../js/checkRedirects");
router.get("/", (req, res) => {
    checkRedirects.checkRedirects(req.query.url, 'https').then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;