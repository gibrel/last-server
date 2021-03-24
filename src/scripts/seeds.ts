import { ConnectionOptions, createConnection } from 'typeorm';

import { Name, User } from '../users/user.entity';
import { Permission } from '../permissions/permission.entity';
import { Role } from '../roles/role.entity';
import { UserPermission } from '../permissions/user-permissions.entity';
import { configService } from '../config/config.service';

async function run() {

    console.log('[Seed] Creating constants');

    const options = {
        ...configService.getTypeOrmConfig(),
        debug: true
    };

    console.log('[Seed] Creating connection');

    const connection = await createConnection(options as ConnectionOptions);

    // console.log(
    //     '[Seed] connection \n' +
    //     '\tname: ' + connection.name + '\n' +
    //     '\toptions.type: ' + connection.options.type + '\n' +
    //     '\toptions.database: ' + connection.options.database + '\n'
    // );

    console.log('[Seed] Getting repositories');

    const rolesRepo = connection.getRepository(Role);
    const permissionsRepo = connection.getRepository(Permission);
    const usersRepo = connection.getRepository(User);
    const userPermissionsRepo = connection.getRepository(UserPermission);

    console.log('[Seed] Inserting values in db...');

    // roles
    await rolesRepo.save([
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Convidado' },
    ]);

    console.log('[Seed] roles... ok!');

    // permissions
    await permissionsRepo.save([
        { id: 1, name: 'Cadastrar', description: 'Cadastrar novos usuários' },
        { id: 2, name: 'Editar', description: 'Editar usuários cadastrados' },
        { id: 3, name: 'Visualizar', description: 'Visualizar um usuário' },
        { id: 4, name: 'Listar', description: 'Listar todos usuários' },
    ]);

    console.log('[Seed] permissions... ok!');

    // users

    let masterUser = await usersRepo.findOne({ email: 'master.default@email.com' });
    if (!masterUser) {
        const nameMaster: Name = { first: 'Master', last: 'Default' };
        await usersRepo.save([{
            email: 'master.default@email.com', isActive: true, roleId: 1,
            name: nameMaster, cpf: '00000000000', password: 'default', password_hash: 'default'
        },])
        masterUser = await usersRepo.findOne({ email: 'master.default@email.com' });
    }

    console.log('[Seed] master user... ok!');

    // user-permissions
    await userPermissionsRepo.save([
        { user: masterUser, permissionId: 1 },
        { user: masterUser, permissionId: 2 },
        { user: masterUser, permissionId: 3 },
        { user: masterUser, permissionId: 4 },
    ]);

    console.log('[Seed] user-permission relations... ok!');

    console.log('[Seed] All done!');

}

console.log('Seed script starting...')

run()
    .then(_ => console.log('...wait for script to exit'))
    .catch(error => console.error('seed error', error));
