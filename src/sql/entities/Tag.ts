import { Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import Ad from "./Ad";

@Entity()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  @Length(1, 100, {
    message: "Entre 1 et 100 caractères",
  })
  name: string;

  @ManyToMany(() => Ad, (ad) => ad.tags, { onDelete: "CASCADE" })
  ads: Ad[];
}

export default Tag;
