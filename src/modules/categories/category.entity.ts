import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    type: string;

    @ManyToOne(() => User, user => user.categories, { nullable: false })
    user: User;

    @Column()
    userId?: string;
}
