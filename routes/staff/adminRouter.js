const express = require("express");
const adminRouter = express.Router();
const { 
	registerAdminCtrl, 
	loginAdminCtrl,
	adminCtrl,
	getAdminProfileCtrl,
	updateAdminCtrl,
	deleteAdminCtrl,
	suspendAdminCtrl,
	unsuspendAdminCtrl,
	withdrawAdminCtrl,
	unwithdrawAdminCtrl,
	publishAdminCtrl,
	unpublishAdminCtrl
} = require("../../controller/staff/adminCtrl");

const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

adminRouter.post('/register', registerAdminCtrl);

adminRouter.post('/login', loginAdminCtrl);

adminRouter.get("/",isLogin, adminCtrl 
)

adminRouter.get("/:id",isLogin, isAdmin, getAdminProfileCtrl);


adminRouter.put("/",isLogin, isAdmin, updateAdminCtrl
)

adminRouter.delete("/:id", deleteAdminCtrl 
)

adminRouter.put("/suspend/teacher/:id", suspendAdminCtrl
)


adminRouter.put("/unsuspend/teacher/:id", unsuspendAdminCtrl
)

adminRouter.put("/withdraw/teacher/:id", withdrawAdminCtrl 

)

adminRouter.put("/unwithdraw/teacher/:id", unwithdrawAdminCtrl 

)


adminRouter.put("/publish/exam/:id", publishAdminCtrl

)

adminRouter.put("/unpublish/exam/:id", unpublishAdminCtrl

)

module.exports = adminRouter;
