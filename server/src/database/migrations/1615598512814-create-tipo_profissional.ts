import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTipoProfissional1615598512814 implements MigrationInterface {
  private table = new Table({
    name: 'tipo_profissional',
    columns: [
      {
        name: 'id',
        isPrimary: true,
        isNullable: false,
        isGenerated: true,
        generationStrategy: 'uuid',
        type: 'uuid',
      },
      {
        name: 'descricao',
        isNullable: false,
        length: '255',
        type: 'varchar',
      },
      {
        name: 'situacao',
        isNullable: false,
        type: 'boolean',
        default: true,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
