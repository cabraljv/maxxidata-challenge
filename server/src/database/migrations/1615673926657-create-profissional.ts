import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createProfissional1615673926657 implements MigrationInterface {
  private table = new Table({
    name: 'profissional',
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
        name: 'nome',
        isNullable: false,
        length: '100',
        type: 'varchar',
      },
      {
        name: 'telefone',
        isNullable: false,
        length: '15',
        type: 'varchar',
      },
      {
        name: 'email',
        isNullable: false,
        length: '50',
        type: 'varchar',
      },
      {
        name: 'situacao',
        isNullable: false,
        type: 'boolean',
        default: true,
      },
      {
        name: 'tipo_id',
        type: 'uuid',
        isNullable: false,
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

  private fk = new TableForeignKey({
    columnNames: ['tipo_id'],
    referencedTableName: 'tipo_profissional',
    onDelete: 'CASCADE',
    referencedColumnNames: ['id'],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.fk);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
