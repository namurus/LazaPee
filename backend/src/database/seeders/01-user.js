'use strict';
import { hash } from 'bcrypt';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        full_name: 'Nguyễn Văn Bảo',
        email: 'VanBao113@gmail.com',
        username: 'BaoRen112',
        password: await hash('VanBaoNguyen@@@123', 10), 
        avatar: 'https://i.pinimg.com/736x/6e/af/1a/6eaf1a844ae4b6fa6eeb6ff17f468cc0.jpg',
        phone: '0977466534',
        address: '38, Bùi Thị Xuân, Quận 1, TP.HCM',
        role: 'customer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: 'Phạm Trần Tiến',
        email: 'PTTien@gmail.com',
        username: 'janesmith',
        password: await hash('janesmith@446HH',10), 
        avatar: 'https://bom.so/xQdpvk',
        phone: '0987654321',
        address: '84 Nguyễn Du, Quận 2, TP.HCM',
        role: 'customer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: 'Nguyễn Văn Lên',
        email: 'alice.brown@gmail.com',
        username: 'alicebrown',
        password: await hash('aliceNguyen###99',10), 
        avatar: 'https://bom.so/UIXkAF',
        phone: '0777466534',
        address: '227 Nguyễn Văn Cừ, Quận 5, TP.HCM',
        role: 'seller',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: 'Nguyễn Hữu Hải',
        email: 'johnsonHai@gmail.com.com',
        username: 'johnsonHai',
        password: await hash('HaiNguyenjohnson@@@123',10), 
        avatar: 'https://bom.so/9uaucQ',
        phone: '0344561184',
        address: '37 Bùi Thị Xuân, Phú Phong, Bình Dương',
        role: 'seller',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        full_name: 'Thai Dinh Ngan',
        email: 'TDNganJony@gmail.com',
        username: 'NganJony447',
        password: await hash('NganJony447@#$', 10),
        avatar: 'https://bom.so/sagDkS',
        phone: '0775664115',
        address: '114, Nguyễn Lữ, Tuy Hòa, Phú Yên',
        role: 'seller',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
