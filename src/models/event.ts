import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "events",
  timestamps: true,
})
export class Event extends Model<Event> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;
  @Column
  public name: string;
  @Column
  public status: string;
}
