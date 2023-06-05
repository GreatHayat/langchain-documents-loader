const { Router } = require("express");
const DocumentsController = require("./documents/document.controller");

const router = Router();

router.use("/documents", DocumentsController.getRouter());

module.exports = router;
