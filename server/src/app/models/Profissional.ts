import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import TipoProfissional from './TipoProfissional';

@Entity({ name: 'profissional' })
class Profissional {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public nome!: string;

  @Column()
  public telefone!: string;

  @Column()
  public email!: string;

  @Column()
  public situacao!: boolean;

  @ManyToOne(() => TipoProfissional, (tp) => tp.profissionais)
  @JoinColumn({ name: 'tipo_id' })
  public tipoDeProfissional!: TipoProfissional | string;

  @Column()
  public created_at!: Date;

  @Column()
  public updated_at!: Date;
}

export default Profissional;
