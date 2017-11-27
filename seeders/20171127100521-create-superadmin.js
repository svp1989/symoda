'use strict';

const dateFormat = require('dateformat');

const superadmin_id = 1;
const superadmin_password = 1111;
const superadmin_salt = '4283271e732848ca91b529dcb25478cf';
const superadmin_hash = '74e0fbcf05c61c13ed51bfd69a05726ad7343145ac9b3d16440049368a02850d1753ea3a5b9fee5c7316b65bb9bb8e0ac81cbe13670fcff176197f369cbbf33ce4c639fec3494a400172f5a8354ad24629d9198b3e8251ed9e5c9ceffd3a74708edcc6ee8d65adedcbb517170439d860823e17b57212ccad30383b7766ac47cbfcf8afe0577ff2e307d6eaaef98972ba1a7ddb9ec4983edcf47475c603f267d565212bf6f6d9e81f04ea7994ee9c0b141764d2bde1a60851c2e312cef16e54e42bd0322648496fa85a9e0d64deea90836c4586cbb0a3a9ba5f7ab0f113081b2c1a011bfbab5954a2f98a0b7186b8d54d87984ad379bcfaa91085ec42fce41bc3a160182af83fe8af662b255dc8d025cea332341777c153eae8885a683ca374ba546d1c9a2ab1fec98e2e7f70492bb04ac21fa534e949b781c2ea12aa3143854d933169712424b347ab76cba3575a0e117c9030a49b7509cff3d28e981744669f8e5723bb5fa033ccee465085104f52d304037d5174009bbd1a2931274fa3b343d0f0bdd550907220527f2d5adead5ddf6bcafcb22c4523615cef0337c32f729e84ec4c59f6d13bd901e1c8d440dfdddc3d4baa3d9cafb84e196fdc421dd5145d59ec7105b222c021e70c9e218fa31bc1f7e4ac33c362bff9babdd80ab95140a5849af75e9864d543c4f4f7a3ca160cae767a42524f65d1e1c9dc4dfec096b4e5';

const now = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('user', [{
          id: superadmin_id,
          login: 'superadmin',
          email: 'odbc@yandex.ru',
          phone: '71234567890',
          status: 1,
          first_name: 'superadmin',
          last_name: 'superadmin',
          middle_name: 'superadmin',
          birthday: now,
          salt: superadmin_salt,
          hash: superadmin_hash,
          created_at: now,
          updated_at: now,
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('user', {where: {id: superadmin_id}}, {});
  }
};
