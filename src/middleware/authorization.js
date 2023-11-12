import db from "../models";

const checkLogin=(req,res,next)=>{
    if(req.cookies.user_id){
        return res.redirect('/admin/cartegoryList');

    }
    next();
}

const checkPerformission = async (req, res, next) => {
    if (req.cookies.user_id==1 ) {
      next();
    } else {
      req.session.isAuthenticated=false;
      req.session.authUser=null;
      res.clearCookie("user_id");
      // Render trang thông báo
      res.render('error', { message: 'Bạn không đủ quyền' });
    }
  };
  const checkAuthentication = (req, res, next) => {
      // Xóa phiên làm việc và chuyển hướng người dùng về trang đăng nhập
      if (req.cookies.user_id) {
        next();
      } else {
        req.session.isAuthenticated=false;
        req.session.authUser=null;
        res.clearCookie("user_id");
      }
    
  
    next();
  };
module.exports={checkLogin,checkPerformission,checkAuthentication};