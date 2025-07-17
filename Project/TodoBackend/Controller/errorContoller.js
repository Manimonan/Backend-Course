exports.errorPage = (req,res,next)=>{
res
    .status(404)
    .json({
        message: "Page not found. Please check the URL and try again.",
    });
}