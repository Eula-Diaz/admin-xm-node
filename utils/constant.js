const {env} = require('./env')
const UPLOAD_PATH = env === 'dev'? 'D:/server/nginx-1.26.1/upload/xm-admin': '/root/upload/xm-admin'
const OLD_UPLOAD_URL = env === 'dev' ? 'https://book.youbaobao.xyz/xm-admin/book/res/img' : 'https://www.youbaobao.xyz/admin-upload-ebook/book/res/img'
const UPLOAD_URL = env === 'dev' ? 'https://book.youbaobao.xyz/xm-admin' : 'https://www.youbaobao.xyz/admin-upload-ebook'

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  CODE_TOKEN_EXPIRED: -2,
  debug: true,
  PWD_SALT: "admin_imooc_node",
  PRIVATE_KEY: "admin_imooc_node_test_youbaobao_xyz",
  JWT_EXPIRED: 60 * 60,
  UPLOAD_PATH,
  MIME_TYPE_EPUB: 'application/epub+zip',
  UPLOAD_URL,
  OLD_UPLOAD_URL
};
