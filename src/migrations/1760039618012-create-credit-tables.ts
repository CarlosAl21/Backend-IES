import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCreditTables1760039618012 implements MigrationInterface {
    name = 'CreateCreditTables1760039618012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`idUser\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`lastname\` varchar(100) NOT NULL, \`username\` varchar(50) NOT NULL, \`email\` varchar(100) NOT NULL, \`cedula\` varchar(100) NOT NULL, \`birthdate\` date NOT NULL, \`address\` varchar(255) NOT NULL, \`phone\` varchar(10) NOT NULL, \`genere\` varchar(100) NULL, \`occupation\` varchar(255) NULL, \`monthly_income\` decimal(10,2) NULL DEFAULT '0.00', \`password\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isAdmin\` tinyint NOT NULL DEFAULT 0, \`isSuperAdmin\` tinyint NOT NULL DEFAULT 0, \`resetPasswordToken\` varchar(255) NULL, \`resetPasswordExpires\` timestamp NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_d8b21b5b28ac133973b9c611b1\` (\`cedula\`), PRIMARY KEY (\`idUser\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Tipos_Credito\` (\`id\` int NOT NULL AUTO_INCREMENT, \`institution_id\` int NOT NULL, \`nombre\` varchar(255) NOT NULL, \`tasa_interes_anual\` decimal NOT NULL, \`plazo_max_meses\` int NOT NULL, \`monto_minimo\` decimal NOT NULL, \`monto_maximo\` decimal NOT NULL, \`descripcion\` text NOT NULL, \`estado\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Simulaciones_Credito\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipo_credito_id\` int NOT NULL, \`monto_simulado\` decimal NOT NULL, \`plazo_meses\` int NOT NULL, \`tasa_interes\` decimal NOT NULL, \`fecha_simulacion\` datetime NOT NULL, \`resultado_json\` json NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`Simulaciones_Credito\``);
        await queryRunner.query(`DROP TABLE \`Tipos_Credito\``);
        await queryRunner.query(`DROP INDEX \`IDX_d8b21b5b28ac133973b9c611b1\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
