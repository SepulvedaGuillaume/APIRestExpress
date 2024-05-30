import { Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  @Length(1, 100, {
    message: "Entre 1 et 100 caractères",
  })
  name: string;
}

export default Category;