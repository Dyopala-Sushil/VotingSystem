var express = require('express');
var router = express.Router();
var UserController = require("../controllers/users.controller");
const upload = require("../middlewares/uploader");


const userController = new UserController();

/* GET users listing. */

router.route('/voter')
.get(userController.getVoter)
.post(userController.registerVoter)

router.route('/voter/:voter_id')
.get(userController.getVoterById)
.put(userController.updateVoterById)
.delete(userController.deleteVoterById)

router.route('/organizer')
.get(userController.getOrganizer)
.post(upload.single('companyLogo'),userController.registerOrganizer)

router.route('/organizer/:organizer_id')
.get(userController.getOrganizerById)
.put(userController.updateOrganizerById)
.delete(userController.deleteOrganizerById)


module.exports = router;
