import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Profissional from './Profissional';

@Entity({ name: 'tipo_profissional' })
class TipoProfissional {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public descricao!: string;

  @OneToMany(() => Profissional, (tp) => tp.tipoDeProfissional)
  public profissionais!: Profissional[];

  @Column()
  public created_at!: Date;

  @Column()
  public updated_at!: Date;
}

export default TipoProfissional;
