import {MigrationInterface, QueryRunner} from "typeorm";

export class initialtest1616438902109 implements MigrationInterface {
    name = 'initialtest1616438902109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying(300) NOT NULL, "description" character varying(300) NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "description" text DEFAULT null, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "email" character varying(255) NOT NULL, "cpf" character varying(11) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "roleId" integer NOT NULL, "nameFirst" character varying, "nameLast" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_permissions" ("permissionId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_4d0e283b03781d1796e62dc6195" PRIMARY KEY ("permissionId", "userId"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "name" character varying(100) NOT NULL, "description" text, CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf38f85e52ee274ba9a01901ed" ON "user_permissions" ("permissionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f05ccc7935f14874d7f89ba030" ON "user_permissions" ("userId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_permissions" ADD CONSTRAINT "FK_cf38f85e52ee274ba9a01901ed2" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_permissions" ADD CONSTRAINT "FK_f05ccc7935f14874d7f89ba030f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_permissions" DROP CONSTRAINT "FK_f05ccc7935f14874d7f89ba030f"`);
        await queryRunner.query(`ALTER TABLE "user_permissions" DROP CONSTRAINT "FK_cf38f85e52ee274ba9a01901ed2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`DROP INDEX "IDX_f05ccc7935f14874d7f89ba030"`);
        await queryRunner.query(`DROP INDEX "IDX_cf38f85e52ee274ba9a01901ed"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "user_permissions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "item"`);
    }

}
