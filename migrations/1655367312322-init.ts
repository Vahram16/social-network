import { MigrationInterface, QueryRunner } from "typeorm";

export class init1655367312322 implements MigrationInterface {
    name = 'init1655367312322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "USER_PROP_COMB" ON "user" ("firstName", "lastName", "age") `);
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "receiverId" uuid NOT NULL, "requesterId" uuid NOT NULL, "status" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_f7fdb78834051228525f0697303" UNIQUE ("receiverId", "requesterId"), CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_9347bde29efe00b67d39f29d9e7" FOREIGN KEY ("requesterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_9347bde29efe00b67d39f29d9e7"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
        await queryRunner.query(`DROP INDEX "public"."USER_PROP_COMB"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
