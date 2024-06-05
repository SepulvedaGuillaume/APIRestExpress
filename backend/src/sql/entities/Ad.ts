import { Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Category from "./Category";
import Tag from "./Tag";

@Entity()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  @Length(1, 100, {
    message: "Entre 1 et 100 caractères",
  })
  title: string;

  @Column({
    length: 255,
    nullable: true,
  })
  @Length(1, 255, {
    message: "Entre 1 et 255 caractères",
  })
  description: string;

  @Column({
    length: 100,
  })
  @Length(1, 100, {
    message: "Entre 1 et 100 caractères",
  })
  owner: string;

  @Column()
  price: number;

  @Column({
    nullable: true,
  })
  picture: string;

  @Column({
    length: 100,
  })
  @Length(1, 100, {
    message: "Entre 1 et 100 caractères",
  })
  location: string;

  @Column("datetime")
  createdAt: Date;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.ads)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads, { onDelete: "CASCADE" })
  @JoinTable()
  tags: Tag[];
}

export default Ad;
