const express = require("express");
const boom = require("boom");
const userRouter = require("./user");
const bookRouter = require('./book')
const jwtAuth = require('./jwt')
const Result = require('../models/Result')

// 注册路由
const router = express.Router();

router.use(jwtAuth)
router.get("/", function (req, res) {
  res.send("欢迎学习小慕读书管理后台");
});

router.use("/user", userRouter);
router.use("/book", bookRouter)

/**
 * 集中处理404请求的中间件
 */
router.use((req, res, next) => {
  next(boom.notFound("接口不存在"));
});

/**
 * 自定义路由异常处理中间件
 */
router.use((err, req, res, next) => {
  if (err.name && err.name === 'UnauthorizedError') {
    const {status = 401, message} = err
    new Result(null, 'Token 验证失败', {
      error: status,
      errMsg: message
    }).jwtError(res.status(status))
  } else {
    const msg = (err && err.message) || "系统错误";
    const statusCode = (err.output && err.output.statusCode) || 500;
    const errorMsg =
      (err.output && err.output.payload && err.output.payload.error) ||
      err.message;
    new Result(null, msg, {
      error: statusCode,
      errorMsg,
    }).fail(res.status(statusCode))
  }

});

module.exports = router;
