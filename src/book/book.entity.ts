import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Books {
  @PrimaryGeneratedColumn("uuid")
  book_id: string;

  @Column({ unique: true })
  title: string;

  @Column({ unique: true })
  author: string;

  @Column({ type: "int", nullable: true, width: 4 })
  yearread: number;

  @Column({ unique: true })
  isbn10: string;

  @Column({ unique: true })
  isbn13: string;

  @Column({ unique: false })
  reread: boolean;

  @Column({ unique: false })
  femaleauthor: boolean;

  @Column({ unique: false, nullable: true })
  img: string;
}
